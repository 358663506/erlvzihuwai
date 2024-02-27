<!-- 首页 -->
<template>
	<view class="full-x flex flex-column content-box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="left">
				<view class="flex align-center" :style="{width: upx2px(100), height: upx2px(52)}" @click="goSearch()">
					<u-icon name="search"></u-icon>
					<text class="text-sm" style="margin-left: 6upx">搜索</text>
				</view>
			</block>
			<block slot="content">首页</block>
		</cu-custom>
		<add-tip :tip="tip" :duration="duration" />
		<view>
			<swiper class="card-swiper square-dot " circular="true" autoplay="false" interval="5000" duration="500"
				@change="bannerSwiper" indicator-color="#1b6cff" indicator-active-color="#1b6cff">
				<swiper-item v-for="(item, index) in bannerimg" :key="item.id"
					:class="[ bannerCur==index ? 'cur' : '' ]" @click="navTo(item)">
					<view class='swiper-item bg-img shadow-blur'
						:style="'background-image:url(' + item.img + '?imageView2/0/w/750'">
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-card article no-card activity-list padding-bottom-sm">
			<view class="cu-item shadow borderBottom" v-for="(item, index) in list" :key="item.id"
				@click="goDetail(item.id)">
				<!-- 	<view class="text-gray light sm round fl weekend">
					<view> {{ item.departureTime | getWeek }}</view>
				</view> -->
				<view class="weekend text-bold text-df date">
					<view> {{ item.departureTime | getWeek }}</view>
					<!-- <view>{{item.createTime}}</view> -->
				</view>
				<view class="content">
					<image :src="item.articleCover + '?imageView2/2/w/300'" mode="aspectFill"></image>
					<view class="desc cus-desc">
						<view class="flex-wrap flex-column">
							<view class="text-bold text-cut text-df" style="width: 100%;">{{item.title}}</view>
							<view class="text-gray text-sm">
								活动时间：{{item.departureTime | dateMonth}}
							</view>
							<view class="text-gray text-sm">
								{{item.destinationPos}}
							</view>
						</view>
						<view class="margin-top-xs text-gray text-sm flex justify-between align-center">
							<view class="cu-tag bg-red light sm round" :class="postStatusClass[item.status] || ''">
								{{ postStatusText[item.status] || '' }}
							</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visitCount}}
								<text class="cuIcon-favorfill margin-lr-xs"></text> {{item.collectCount}}
								<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.replyCount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: auto;">
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="onLoadMore"></u-loadmore>
			<view class="cu-bar tabbar" style="width: 1rpx;"></view>
		</view>
	</view>
</template>
<script>
	import {
		getSliderImages,
		getPostPage
	} from "@/apis/index.js"
	import dayjs from "dayjs"
	export default {
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
		data() {
			return {
				postStatusText: ['隐藏', '报名中', '结束报名', '活动开始', '活动取消', '活动结束'],
				postStatusClass: ['bg-black', 'bg-green' /*报名中*/ , 'bg-purple' /*结束报名*/ , 'bg-blue' /*活动开始*/ ,
					'bg-red' /*活动取消*/ ,
					'bg-gray' /*活动结束*/
				],
				bannerCur: 0, //当前banner的位置
				bannerimg: [],
				list: [],
				total: 0,
				isLoad: false,
				isLoadErr: true,
				loadStatus: 'loading', // loadmore/ loading / nomore
				searchData: {
					page: 1,
					size: 10,
				}
			}
		},
		mounted() {
			this.getSliderImages()
			this.getPostPage()
		},
		methods: {
			upx2px(value) {
				return uni.upx2px(value) + 'px'
			},
			onBottomOut() {
				if (this.loadStatus === 'loadmore') {
					this.onLoadMore()
				}
			},
			onShow() {
				if (this.$store.state.refreshPost) {
					this.$store.state.refreshPost = false
					this.getPostPage()
				}
			},
			bannerSwiper(e) {
				this.bannerCur = e.detail.current
			},
			getSliderImages() {
				getSliderImages().then(res => {
					this.bannerimg = res.data
				})
			},
			onLoadMore() {
				this.getPostPage({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			getPostPage(searchData = this.searchData) {
				this.loadStatus = 'loading'
				getPostPage(searchData).then(res => {
						this.isLoadErr = false
						let list = res.data.list
						if (this.list.length) {
							list = [...this.list, ...list]
						}
						this.list = list
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
			goDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/post/detail?id=' + id,
				})
			},
			navTo(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.content-box {
		min-height: 95vh;
	}

	.carousel {
		width: 100%;
		height: 350upx;
	}

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

	.borderBottom {
		border-bottom: 1px solid #f2f2f2;
	}
</style>
