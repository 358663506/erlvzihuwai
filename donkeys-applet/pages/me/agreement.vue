<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">协议列表</block>
		</cu-custom>
		<view class="nav-header bg-white" :style="{top: customBar + 'px'}">
			<view class="nav-box">
				<view :key="key" class="" v-for="(value, key) in navMap" :class="{active:searchData.type == value}"
					@click="tabClick(value)">
					{{key}}
				</view>
				<view>
					<u-icon name="arrow-down" v-if="searchData.sort == 'DESC'" @tap="searchData.sort = 'ASC'"></u-icon>
					<u-icon name="arrow-up" v-else @tap="searchData.sort = 'DESC'"></u-icon>
				</view>
			</view>
			<view class="search-box" style="padding:0 30rpx;">
				<u-search bg-color="#f2f5f9" border-color="#eaeaea" height="70" placeholder="输入文章标题或照片墙名称" action-text="搜索"
					v-model="searchData.title" shape="round" :show-action="actionShow" @custom="search()" @search="search()">
				</u-search>
			</view>
		</view>
		<view class="station-list">
			<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${scrollHeight}px)` }"
				class="flex flex-column padding-bottom" :scroll-anchoring="true" :enable-fle="true" @scrolltolower="onBottom()" :scroll-top="scrollTop">
				<u-waterfall v-model="list" ref="uWaterfall">
					<template v-slot:left="{leftList}">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="item.__id" @click="goDetail(item)">
							<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
							<u-lazy-load threshold="-450" border-radius="10" :image="item.articleCover">
								<view class="full-x imageInfo" :class="{postInfo: item.type == 'post'}">
									<view class="text-white text-sm flex justify-between margin-top-xs">
										<text class="text-white">
											<text v-if="item.type == 'post'">{{ item.replyCount }} 评论 </text>
											<text v-else-if="item.type == 'photoWallType'"> {{item.photoWallCount}}个影像</text>
										</text>
										<view class="text-white text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visitCount}}
										</view>
									</view>
								</view>
							</u-lazy-load>
							<view class="demo-title">
								{{item.title}}
							</view>
							<view class="demo-address" v-show="item.type == 'post'">
								<text class="lg text-blue cuIcon-locationfill margin-right-xs"></text>
								{{item.destinationPos || ''}}
							</view>
							<view class="text-gray text-sm flex justify-between margin-top-xs">
								<text class="text-bold text-gray">{{item.departureTime}}</text>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="item.__id" @click="goDetail(item)">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.articleCover">
								<view class="full-x imageInfo" :class="{postInfo: item.type == 'post'}">
									<view class="text-white text-sm flex justify-between margin-top-xs">
										<text v-if="item.type == 'post'">{{ item.replyCount }} 评论 </text>
										<text v-else-if="item.type == 'photoWallType'"> {{item.photoWallCount}}个影像</text>
										<view class="text-white text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visitCount}}
										</view>
									</view>
								</view>
							</u-lazy-load>
							<view class="demo-title">
								{{item.title}}
							</view>
							<view class="demo-address" v-show="item.type == 'post'">
								<text class="lg text-blue cuIcon-locationfill margin-right-xs"></text>
								{{item.destinationPos || ''}}
							</view>
							<view class="text-gray text-sm flex justify-between margin-top-xs">
								<text class="text-bold text-gray">{{item.departureTime}}</text>
							</view>
						</view>
					</template>
				</u-waterfall>
				<view style="margin-top: auto;" class="padding-top-sm">
					<u-loadmore bg-color="rgba(240, 240, 240, 0)" :status="loadStatus" @loadmore="onLoadMore"></u-loadmore>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		searchApi
	} from "@/apis/index.js"
	import dayjs from "dayjs"

	export default {
		computed: {
			customBar() {
				return this.CustomBar
			},
			scrollHeight() {
				return this.customBar + uni.upx2px(180)
			},
			searchDataSort(){
				return this.searchData.sort
			}
		},
		filters: {
			getWeek(value) {
				if (value) {
					return '星期' + ['天', '一', '二', '三', '四', '五', '六'][dayjs(value).day()]
				}
				return ''
			},
			dateMonth(value) {
				if (!value) {
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			}
		},
		watch: {
			searchDataSort(){
				this.search()
			}
		},
		data() {
			return {
				postStatusText: ['隐藏', '报名中', '结束报名', '活动开始', '活动取消', '活动结束'],
				postStatusClass: ['bg-black', 'bg-green' /*报名中*/ , 'bg-purple' /*结束报名*/ , 'bg-blue' /*活动开始*/ , 'bg-red' /*活动取消*/ ,
					'bg-gray' /*活动结束*/
				],
				scrollTop: 0,
				triggered: false,
				actionShow: true,
				navMap: {
					'全部': null,
					'活动文章': 'post',
					'照片墙': 'photoWallType'
				},
				list: [],
				total: 0,
				isLoad: false,
				isLoadErr: false,
				loadStatus: 'loading', // loadmore/ loading / nomore
				searchData: {
					title: '',
					page: 1,
					size: 10,
					type: null,
					sort: "DESC", // DESC 倒序  ASC 正序
				}
			}
		},
		onLoad() {
			this.$store.state.loading = true
			this.searchApi()
		},

		methods: {
			addRandomData(list) {
				for (let i = 0; i < list.length; i++) {
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(list[i]))
					item.__id = this.$u.guid();
					item.departureTime = item.departureTime ? dayjs(item.departureTime).format("YYYY年MM月DD日") : ''
					this.list.push(item);
				}
			},
			onBottom() {
				if (this.loadStatus === 'loadmore') {
					this.onLoadMore()
				}
			},
			refresherrefresh() {
				setTimeout(() => {
					this.triggered = false
				}, 1000)
			},
			tabClick(value){
				this.searchData.type = value
				this.search()
			},
			search() {
				this.$refs.uWaterfall.clear()
				this.$store.state.loading = true
				this.scrollTop = this.scrollTop == 0 ?  -1 : 0
				this.list = []
				this.searchData.page = 1
				this.searchData.size = 10,
				this.searchApi()
			},
			onLoadMore() {
				this.searchApi({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			searchApi(searchData = this.searchData) {
				this.loadStatus = 'loading'
				console.log(searchData)
				searchApi(searchData).then(res => {
						this.isLoadErr = false
						let list = res.data.list
						this.addRandomData(list)
						this.searchData = {
							...searchData
						}
						this.total = res.data.pagination.total || 0
						console.log(this.total)
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
						this.$store.state.loading = false
					})
			},
			goDetail(item) {
				if(item.type == 'post') {
					uni.navigateTo({
						url: '/pages/post/detail?id=' + item.postId,
					})
				} else if(item.type== 'photoWallType'){
					uni.navigateTo({
						url: '/pages/medias/detail?classifyId=' + item.photoWallTypeId
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.contaier {
		height: 100vh;
	}

	.nav-header {
		border-bottom: 1px solid #gray;
		box-shadow: -1rpx 4rpx 10rpx rgba(2, 90, 221, 0.1);
		padding-bottom: 20upx;
		position: fixed;
		left: 0;
		width: 100%;
		height: 180upx;
		z-index: 99;

		.nav-box {
			display: flex;
			text-align: center;
			height: 80rpx;
			align-items: center;

			view {
				flex: 1;
				font-size: 28rpx;

				&:last-child {
					display: block;
					flex-grow: 0;
					flex-shrink: 0;
					min-width: 80upx;
					width: 80upx;
				}
			}

			.active {
				color: #0081ff;
				font-weight: bold;
			}
		}
	}

	.station-list {
		margin-top: 180upx;
		flex: 1;
		box-sizing: border-box;
		overflow: auto;

		.activity-list {

			width: 710upx;
			margin: 0 auto;

			.weekend {
				padding: 20upx 30upx 0;
				box-sizing: border-box;
				width: 100%;
			}

			.date {
				line-height: 50upx !important;
				margin-bottom: 20upx;
			}

			.cus-desc {
				.title {
					line-height: 1 !important;
				}
			}

		}
	}

	.demo-warter {
		border-radius: 8px;
		margin: 10px 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
	
	.demo-address {
		font-size: 22rpx;
		color: $u-tips-color;
		margin: 5upx 0;
	}
	
	.imageInfo{
		position: absolute;
		bottom: 0;
		left: 0;
		white-space: nowrap;
		line-height: 32rpx;
		padding: 10rpx 20rpx;
		color: #fff;
		background: linear-gradient(to top, #0081ff, rgba(28, 187,180, 0.01));
		&.postInfo{
			background: linear-gradient(to top, rgba(28, 187,180, 1), rgba(0,129,255, 0.01));
		}
	}
</style>
