<!-- TabBar 文章资讯 -->
<template>
	<view class="full-x flex flex-column content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="left">
				<view class="flex align-center" :style="{width: upx2px(100), height: upx2px(52)}" @click="goSearch()">
					<u-icon name="search"></u-icon>
					<text class="text-sm" style="margin-left: 6upx">搜索</text>
				</view>
			</block>
			<block slot="content">照片墙</block>
		</cu-custom>
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="item.__id" @click="seeImg(item)">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.img">
						<view class="full-x imageInfo">
							<view class="text-white text-sm flex justify-between margin-top-xs">
								<text class="text-white">{{item.photoWallCount}}个影像</text>
								<view class="text-white text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visitCount}}
								</view>
							</view>
						</view>
					</u-lazy-load>
					<view class="demo-title">
						{{item.name}}
					</view>
					<!--<view class="demo-address">
						<text class="lg text-blue cuIcon-locationfill margin-right-xs"></text>
						{{item.address}}
					</view> -->
					<view class="text-gray text-sm flex justify-between margin-top-xs">
						<text class="text-bold text-gray">{{item.departureTime}}</text>
					</view>
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="item.__id" @click="seeImg(item)">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.img">
						<view class="full-x imageInfo">
							<view class="text-white text-sm flex justify-between margin-top-xs">
								<text class="text-white">{{item.photoWallCount}}个影像</text>
								<view class="text-white text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visitCount}}
								</view>
							</view>
						</view>
					</u-lazy-load>
					<view class="demo-title">
						{{item.name}}
					</view>
					<!-- 		<view class="demo-address">
						<text class="lg text-blue cuIcon-locationfill margin-right-xs"></text>
						{{item.address}}` 
					</view> -->
					<view class="text-gray text-sm flex justify-between margin-top-xs">
						<text class="text-bold text-gray">{{item.departureTime}}</text>
					</view>
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
		</u-waterfall>
		<view class="full-x" style="margin-top: auto;">
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			<view class="cu-bar tabbar" style="width: 1rpx;"></view>
		</view>
	</view>
</template>

<script>
	// import imgData from "@/common/uiImg.js";
	import dayjs from "dayjs"
	import {
		getPhotoWallType
	} from "@/apis/index.js"
	export default {
		filters: {
			dateMonth(value) {
				if (!value) {
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			}
		},
		data() {
			return {
				list: [],
				total: 0,
				isLoad: false,
				isLoadErr: true,
				loadStatus: 'loading', // loadmore/ loading / nomore
				searchData: {
					page: 1,
					size: 8,
				}
				// ]
			}
		},
		mounted() {
			this.getPhotoWallType();
		},
		methods: {
			onBottomOut() {
				if (this.loadStatus === 'loadmore') {
					this.onLoadMore()
				}
			},
			addRandomData(list) {
				for (let i = 0; i < list.length; i++) {
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(list[i]))
					item.__id = this.$u.guid();
					item.departureTime = item.departureTime ? dayjs(item.departureTime).format("YYYY年MM月DD日") : ''
					this.list.push(item);
				}
			},
			onLoadMore() {
				this.getPhotoWallType({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			getPhotoWallType(searchData = this.searchData) {
				this.loadStatus = 'loading'
				getPhotoWallType(searchData).then(res => {
						this.isLoadErr = false
						let list = res.data.list
						this.addRandomData(res.data.list)
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
						this.$store.state.loading = false
					})
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			seeImg(item) {
				// 查看图片列表
				uni.navigateTo({
					url: '/pages/medias/detail?classifyId=' + item.id
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			upx2px(value) {
				return uni.upx2px(value)
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

	.imageInfo {
		position: absolute;
		bottom: 0;
		left: 0;
		white-space: nowrap;
		line-height: 32rpx;
		padding: 10rpx 20rpx;
		color: #fff;
		background: linear-gradient(to top, #0081ff, rgba(28, 187, 180, 0.01));
	}
</style>
