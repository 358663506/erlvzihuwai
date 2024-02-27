<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">照片墙列表</block>
		</cu-custom>
		<view class="nav-header bg-white" :style="{top: customBar + 'px'}">
			<view class="nav-box">
				<view :key="key" class="" v-for="(value, key) in navMap" :class="{active:searchData.status == value}"
					@click="tabClick(value)">
					{{key}}
				</view>
				<view>
					<u-icon name="arrow-down" v-if="searchData.sort == 'DESC'" @tap="searchData.sort = 'ASC'"></u-icon>
					<u-icon name="arrow-up" v-else @tap="searchData.sort = 'DESC'"></u-icon>
				</view>
			</view>
			<view class="search-box" style="padding:0 30rpx;">
				<u-search bg-color="#f2f5f9" border-color="#eaeaea" height="70" placeholder="输入文章标题" action-text="搜索"
					v-model="searchData.title" shape="round" :show-action="actionShow" @custom="search()"
					@search="search()">
				</u-search>
			</view>
		</view>
		<view class="station-list">
			<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${scrollHeight}px)` }"
				class="flex flex-column padding-bottom" :scroll-anchoring="true" :enable-fle="true"
				@scrolltolower="onBottom()" :scroll-top="scrollTop">
				<view class="cu-card article no-card activity-list padding-bottom-sm flex-sub">
					<view class="cu-item shadow borderBottom " v-for="(item, index) in list" :key="item.id"
						@click="goDetail(item.id)">
						<view class="weekend text-df date  flex justify-between align-center" @click.stop>
							<view>
								<view class="cu-tag radius sm bg-blue" @tap.stop="editStatus(item, index)">
									设置状态
								</view>
								<view class="cu-tag radius sm bg-cyan" @tap.stop='editPost(item)'>
									编辑
								</view>
								<view class="cu-tag radius sm bg-red" @tap.stop='deletePost(item)'>
									删除
								</view>
							</view>
							<text class="text-gray text-sm margin-left-sm">{{item.createTime}}</text>
						</view>
						<view class="content">
							<image :src="item.articleCover + '?imageView2/2/w/300'" mode="aspectFill"></image>
							<view class="desc cus-desc">
								<view class="flex-wrap flex-column">
									<view class="text-bold text-cut text-df" style="width: 100%;">{{item.title}}
									</view>
									<view class="text-gray text-sm">
										活动时间：{{item.departureTime | dateMonth}}
									</view>
									<view class="text-gray text-sm">
										{{item.destinationPos}}
									</view>
								</view>
								<view class="margin-top-xs text-gray text-sm flex justify-between align-center">
									<view class="cu-tag bg-red light sm round"
										:class="postStatusClass[item.status] || ''">
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
				<view style="margin-top: auto;" class="padding-top-sm">
					<u-loadmore bg-color="rgba(240, 240, 240, 0)" :status="loadStatus" @loadmore="onLoadMore">
					</u-loadmore>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getPostPage,
		deletePost,
		updatePostStatus,
		updatePostTop
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
			searchDataSort() {
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
			searchDataSort() {
				this.search()
			}
		},
		data() {
			return {
				postStatusText: ['隐藏', '报名中', '结束报名', '活动开始', '活动取消', '活动结束'],
				postStatusClass: ['bg-black', 'bg-green' /*报名中*/ , 'bg-purple' /*结束报名*/ , 'bg-blue' /*活动开始*/ ,
					'bg-red' /*活动取消*/ ,
					'bg-gray' /*活动结束*/
				],
				scrollTop: 0,
				triggered: false,
				actionShow: true,
				navMap: {
					'全部': "-1",
					'展示': null,
					'已隐藏': '0'
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
					status: '-1',
					sort: "DESC", // DESC 倒序  ASC 正序
				}
			}
		},
		onLoad() {
			this.$store.state.loading = true
			this.getPostPage()
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
				this.searchData.status = value
				this.search()
			},
			search() {
				this.$store.state.loading = true
				this.scrollTop = 0
				this.list = []
				this.searchData.page = 1
				this.searchData.size = 10,
					this.getPostPage()
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
			deletePost(item) {
				uni.showModal({
					title: '提示',
					content: `此操作将删除【${item.title}】下的评论、收藏、足迹数据, 是否继续?`,
					success: ({
						confirm = false
					}) => confirm && this.__deleteData(item)
				});
			},
			__deleteData(item) {
				deletePost({
					id: item.id,
				}).then(res => {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					});
					this.search()
				})
			},
			// 修改文章状态
			editStatus(item, index) {
				let that = this
				uni.showActionSheet({
					itemList: this.postStatusText,
					success: (res) => {
						let status = res.tapIndex
						that.$store.state.loading = true
						updatePostStatus({
							id: item.id,
							status,
						}).then(res => {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							});
							that.$set(that.list[index], 'status', status)
						}).finally(() => {
							that.$store.state.loading = false
						})
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			editTop(item, index) {
				let top = +!item.top
				let that = this
				that.$store.state.loading = true
				updatePostTop({
					id: item.id,
					top,
				}).then(res => {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					});
					that.$set(that.list[index], 'top', top)
				}).finally(() => {
					that.$store.state.loading = false
				})
			},
			editPost(item) {
				this.$store.commit("setPostInfo", item)
				uni.navigateTo({
					url: './post?id=' + item.id
				})
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

	.borderBottom {
		border-bottom: 8px solid #f2f2f2;
	}
</style>
