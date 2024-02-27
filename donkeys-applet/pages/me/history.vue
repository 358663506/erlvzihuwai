<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">足迹</block>
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
		</view>
		<view class="station-list">
			<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${scrollHeight}px)` }"
				class="flex flex-column padding-bottom" :scroll-anchoring="true" :enable-fle="true"
				@scrolltolower="onBottom()" :scroll-top="scrollTop">
				<view class="cu-card article no-card activity-list padding-bottom-sm flex-sub">
					<view class="cu-item shadow borderBottom" v-for="(item, index) in list" :key="item.__id" 
						@click="goDetail(item)">
						<view class="weekend text-df date  flex justify-between align-center">
							<text class="text-gray text-sm margin-left-sm">最近一次浏览：{{item.updateTime}}</text>
							<text class="text-gray text-sm margin-left-sm cu-tag bg-blue light sm round" v-if="item.type === 'post'">活动</text>
							<text class="text-gray text-sm margin-left-sm cu-tag bg-green light sm round" v-if="item.type === 'photoWallType'">照片墙</text>
						</view>
						<view class="content">
							<image :src="item.articleCover + '?imageView2/2/w/300'" mode="aspectFill" class="content-image"></image>
							<view class="desc cus-desc">
								<view class="flex-wrap flex-column">
									<view class="text-bold text-cut text-df" style="width: 100%;">{{item.title}}
									</view>
									<view class="text-gray text-sm">
										活动时间：{{item.departureTime | dateMonth}}
									</view>
									<view class="text-gray text-sm" v-show="item.destinationPos">
										{{item.destinationPos}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: auto;" class="padding-top-sm">
					<u-loadmore bg-color="rgba(240, 240, 240, 0)" :status="loadStatus" @loadmore="onLoadMore"></u-loadmore>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		pageHistory
	} from "@/apis/index.js"
	import dayjs from "dayjs"

	export default {
		computed: {
			customBar() {
				return this.CustomBar
			},
			scrollHeight() {
				return this.customBar + uni.upx2px(80)
			},
			searchDataSort() {
				return this.searchData.sort
			}
		},
		filters: {
			dateMonth(value) {
				if (!value) {
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			}
		},
		watch: {
			searchDataSort() {
				this.search()
			}
		},
		data() {
			return {
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
					page: 1,
					size: 10,
					type: null,
					sort: "DESC", // DESC 倒序  ASC 正序
				}
			}
		},
		onLoad() {
			this.$store.state.loading = true
			this.pageHistory()
		},

		methods: {
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
			tabClick(value) {
				this.searchData.type = value
				this.search()
			},
			search() {
				this.$store.state.loading = true
				this.scrollTop = this.scrollTop == 0 ? -1 : 0
				this.list = []
				this.searchData.page = 1
				this.searchData.size = 10,
					this.pageHistory()
			},
			onLoadMore() {
				this.pageHistory({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			pageHistory(searchData = this.searchData) {
				this.loadStatus = 'loading'
				console.log(searchData)
				pageHistory(searchData).then(res => {
						this.isLoadErr = false
						let list = this.coverData(res.data.list)
						console.log(list)
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
			coverData(list) {
				if (!list || !list.length) {
					return []
				}
				return list.map(it => {
					if (it.post) {
						return {
							photoWallTypeId: null,
							__id: this.$u.guid(),
							postId: it.post.id,
							...it.post,
							...it,
							departureTime: it.post.departureTime,
							type: 'post'
						}
					} else if (it.photoWallType) {
						return {
							photoWallTypeId: it.id,
							__id: this.$u.guid(),
							postId: null,
							title: it.photoWallType.name,
							articleCover: it.photoWallType.img,
							...it.photoWallTyp,
							...it,
							departureTime: it.photoWallType.departureTime,
							type: "photoWallType"
						}
					} else {
						return null
					}
				}).filter(Boolean)
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
			navTo(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			seeImg() {

			}
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
		height: 80upx;
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
		margin-top: 80upx;
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
	.content{
		height: 120upx !important;
	}
	.content-image{
		width: 190upx !important;
		height: 140upx !important;
		flex-shrink: 0;
	}

	.borderBottom {
		border-bottom: 1px solid #f2f2f2;
	}
</style>
