<!-- TabBar 文章资讯 -->
<template>
	<view class="full-x flex flex-column content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{typeInfo.name}}</block>
		</cu-custom>
		<view class="cu-bar" style="background: #d3defb; min-height: 60upx;">
			<view class="action text-balck text-sm not-show" style="opacity: 0.9; margin-left: 10upx; font-size: 28upx;" :class="{show: typeInfo.departureTime}">
				活动时间 {{typeInfo.departureTime | dateMonth}}
			</view>
			<view class="action text-balck text-sm not-show" style="opacity: 0.7; margin-right: 10upx" :class="{show: typeInfo.departureTime}">
				更新时间 {{typeInfo.updateTime}}
			</view>
		</view>
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="seeImg(item)">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.url" :type="item.type"></u-lazy-load>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="seeImg(item)">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.url" :index="index" :type="item.type">
					</u-lazy-load>
				</view>
			</template>
		</u-waterfall>
		<view class="full-x text-center" style="margin-top: auto;">
			<text v-if="isLoad && total == 0" style="color: #999;">暂无影像 ~</text>
			<u-loadmore v-else :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			<view class="cu-bar tabbar" style="width: 1rpx;"></view>
		</view>
		<view class="like not-show" :class="{show: isLoad}">
			<image @tap="delLike()" v-if="lickInfo && lickInfo.id"  src="/static/post/star-fill.png" class="like-star" mode="aspectFit"></image>
			<image @tap="like()" v-else="info.is_like" src="/static/post/star.png" class="like-star" mode="aspectFit"></image>
			<text class="text-sm like-text">{{(lickInfo && lickInfo.id) ? '已' : ''}}收藏</text>
		</view>
	</view>
</template>

<script>
	// import imgData from "@/common/uiImg.js";
	import {
		getPhotoWall,
		addCollect,
		infoCollect,
		deleteCollect,
	} from "@/apis/index.js"
	import { httpLogin } from "@/common/request.js"
	import dayjs from "dayjs"
	export default {
		filters: {
			dateMonth(value){
				if(!value){
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			}
		},
		computed: {
			loadingSize() {
				return uni.upx2px(120)
			},
			showLoading() {
				return this.$store.state.loading
			},
			isAdmin() {
				return this.$store.state.userInfo.role === 0
			},
			token() {
				return this.$store.state.token
			},
		},
		data() {
			return {
				list: [],
				typeInfo: {},
				total: 0,
				isLoad: false,
				isLoadErr: true,
				loadStatus: 'loading', // loadmore/ loading / nomore
				classifyId: null,
				lickInfo: null, // null or object 点赞集合
				searchData: {
					page: 1,
					size: 20,
				},
			}
		},
		onShareAppMessage(){
			return {
				title: this.typeInfo.name,
				path: `/pages/medias/detail?classifyId=${this.classifyId}`
			}
		},
		onLoad(option) {
			this.classifyId = option.classifyId
			this.getPhotoWall({
				...this.searchData,
				isVisitCount: true
			});
			this.init()
		},
		onReachBottom() {
			if (this.loadStatus === 'loadmore') {
				this.onLoadMore()
			}
		},
		methods: {
			init() {
				if(this.token){
					this.infoLike()
				}
			},
			addRandomData(list) {
				for (let i = 0; i < list.length; i++) {
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(list[i]))
					item.id = this.$u.guid();
					this.list.push(item);
				}
			},
			onLoadMore() {
				this.getPhotoWall({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			getPhotoWall(searchData = this.searchData) {
				this.loadStatus = 'loading'
				getPhotoWall({
						...searchData,
						classifyId: this.classifyId
					}).then(res => {
						this.isLoadErr = false
						let list = res.data.list
						this.addRandomData(res.data.list)
						this.typeInfo = res.data.typeInfo
						this.searchData = {
							...searchData
						}
						this.total = res.data.pagination.total || 0
						if (this.total <= this.list.length) {
							this.loadStatus = 'nomore'
						} else {
							this.loadStatus = 'loadmore'
						}
					})
					.catch(() => {
						this.isLoadErr = true
						this.loadStatus = 'loadmore'
					})
					.finally(() => {
						this.isLoad = true
					})
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			seeImg(item) {
				if (item.type && item.type.indexOf('video') > -1) {
					return
				}
				let imgUrl = item.url
				// console.log(imgUrl)
				// 预览图片
				uni.previewImage({
					urls: [imgUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('okokok');
						},
						fail: function(err) {
							// console.log('err');
						}
					}
				});
			},
			/*点赞*/
			like() {
				if (!this.token) {
					httpLogin()
					return
				}
				this.$store.state.loading = true
				addCollect({
					photoWallTypeId: this.classifyId
				}).then(res => {
					uni.showToast({
						title: '收藏成功',
						icon: 'none'
					});
					this.lickInfo = res.data;
					this.$store.state.refreshPost = true
				}).finally(() => {
					this.$store.state.loading = false
				})
			},
			/* 查询点赞状态 */
			infoLike() {
				console.log(this)
				infoCollect({
					photoWallTypeId: this.classifyId
				}).then(res => {
					this.lickInfo = res.data || {}
				})
			},
			/*取消点赞*/
			delLike() {
				if (!this.token) {
					httpLogin()
					return
				}
				this.$store.state.loading = true
				deleteCollect({
					id: this.lickInfo.id
					
				}).then(res => {
					uni.showToast({
						title: '已取消收藏',
						icon: 'none'
					});
					this.lickInfo = null;
					this.$store.state.refreshPost = true
				}).finally(() => {
					this.$store.state.loading = false
				})
			},
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	.content {
		min-height: 95vh;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 10px 5px;
		background-color: #ffffff;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	.like {
		&-star {
			width: 80upx;
			height: 80upx;
		}
		&-text{
			// position: absolute;
			color: #333;
			opacity: 0.9;
			margin-top: 8upx;
		}
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: $uni-text-color-inverse;
		width: 80upx;
		border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 99;
		right: 30upx;
		bottom: 30vh;
		&.transition {
			transition: left 0.3s ease, top 0.3s ease;
		}
	}
</style>
