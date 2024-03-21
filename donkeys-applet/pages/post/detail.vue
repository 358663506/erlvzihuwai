<template>
	<view style="full">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">活动详情</block>
		</cu-custom>
		<view class="full flex flex-column not-show" :class="{show: isLoad}" id="postdetailpage">
			<view class="detail">
				<view class="title">{{ postInfo.title }}</view>
				<view class="info">
					<view class="source-date">
						<text class="date hidden">{{ postInfo.createTime }}</text>
					</view>
					<view class="read">阅读 {{ postInfo.visitCount }}</view>
				</view>
				
			</view>
			<mp-html container-style="padding:20rpx 32rpx" :content="html"
				domain="" lazy-load scroll-table selectable
				use-anchor :tag-style="tagStyle" @load="load" @ready="ready" @imgtap="imgtap" @linktap="linktap" />
				
			<view class="full-x margin-lr padding-lr-sm padding-bottom-sm margin-bottom bg-grey light radius" style="width: 690upx; background: #f2f2f2">
				<view class="text-gray margin-top-sm">
					<span>活动时间：</span>{{ postInfo.departureTime | dateMonth }}
				</view>
				<view class="text-gray margin-top-sm">
					<span>出行地点：</span>{{ postInfo.destinationPos }}
				</view>
				<view class="text-gray margin-top-sm flex align-center">
					<span>风景级别：</span>
					<u-icon :name="postInfo.lanscapeLevel < uicon ? 'star' : 'star-fill'" v-for="uicon in [1,2,3,4,5]"
						:key="uicon" :size="uIconSize"
						:color="postInfo.lanscapeLevel < uicon ? '#aaa' : 'rgba(0, 67, 255, 0.5)'"></u-icon>
				</view>
				<view class="text-gray margin-top-sm flex align-center">
					<span>活动难度：</span>
					<u-icon :name="postInfo.difficulty < uicon ? 'star' : 'star-fill'" v-for="uicon in [1,2,3,4,5]"
						:size="uIconSize" :key="uicon"
						:color="postInfo.difficulty < uicon ? '#aaa' : 'rgba(0, 67, 255, 0.5)'"></u-icon>
				</view>
				<view class="text-gray margin-top-sm flex align-center">
					<span>活动状态：</span>
					<view class="cu-tag bg-red light sm round" :class="postStatusClass[postInfo.status] || ''">{{ postStatusText[postInfo.status] || '' }}</view>
				</view>
				<view class="text-gray margin-top-sm flex align-center">
				<view class="inline-block text-blue line-b" v-if="isAdmin" @tap="editStatus()">活动状态</view>
				<view class="inline-block text-blue margin-left-sm line-b" v-if="isAdmin" @tap="editTop(postInfo)">置顶状态</view>
				<view class="inline-block text-blue margin-left-sm line-b" v-if="isAdmin" @tap="editPost(postInfo)">编辑文章</view>
			</view>
			</view>
			<view class="comment" id='reply'>
				<view class="title">
					<text>全部评论</text>
					<text class="count" v-if="replyTotal > 0">({{ replyTotalAll }})</text>
				</view>
				<view class="item" v-for="(item, index) in replyList" :key="item.id">
					<view class="avatar">
						<image :src="item.user && item.user.avatarUrl"></image>
					</view>
					<view class="comment-info">
						<view class="nickname-like">
							<view class="nickname">{{ (item.user && item.user.nickName) || '' }}</view>
						</view>
						<view class="comment-desc" hover-class="none">
							{{ item.content }}
						</view>
						<view class="date-reply">
							<view class="date" hover-class="none">
								{{ item.createTime }}
							</view>
							<view v-if="isAdmin" class="inline-block text-blue line-b reply" @tap="initAddComment(true, item)">回复TA</view>
						</view>
						<view class="radius reply-count" v-if="item.replys.length > 0">
							<view class="item" v-for="replyItem in item.replys" :key="replyItem.id">
								<view class="avatar">
									<image :src="replyItem.user && replyItem.user.avatarUrl"></image>
								</view>
								<view class="comment-info">
									<view class="nickname-like">
										<view class="nickname">{{ (replyItem.user && replyItem.user.nickName) || '' }}
										</view>
									</view>
									<view class="comment-desc" hover-class="none">
										{{ replyItem.content }}
									</view>
									<view class="date-reply">
										<view class="date" hover-class="none">
											{{ replyItem.createTime }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="no-comment">
					<text v-if="replyTotal == 0">暂无评论，快来抢占沙发吧~</text>
					<u-loadmore v-else :status="loadStatus" @loadmore="onLoadMore"></u-loadmore>
				</view>
				<view class="cu-bar tabbar" style="width: 1rpx;"></view>
			</view>

			<view class="comment-bar" v-show="!showAddComment && showCommenBar" :class="{disabled: !postInfo.id}">
				<view class="input" @tap="initAddComment(true)"><text>发表评论</text></view>
				<view class="operate">
					<view class="info" @tap="navToReply()">
						<u-icon name="chat" color="#3c9cff"></u-icon>
						<text class="count" v-if="replyTotalAll > 0">{{ replyTotalAll }}</text>
					</view>
					<view class="like">
						<u-icon name="star-fill" color="#3c9cff" v-if="lickInfo && lickInfo.id" @tap="delLike()">
						</u-icon>
						<u-icon name="star" color="#9acafc" v-else @tap="like()"></u-icon>
					</view>
					<button open-type="share" class="share" @tap="share">
						<image src="/static/me/share.png"></image>
					</button>
				</view>
			</view>

			<view class="bg-masker" v-if="showAddComment" @tap="initAddComment(false)"></view>
			<view class="add-comment" v-if="showAddComment">
				<view class="info">
					<view class="input">
						<textarea :show-confirm-bar="false" :cursor-spacing="20" ref="commentContent" :maxlength="200"
							:auto-height="true" :fixed="true" :focus="showAddComment" v-model.trim="commentContent"
							placeholder-class="input-bg"
							:placeholder="replyCommentId > 0 ? '回复 ' + replyNickname + '：' : '发表评论'" />
					</view>
					<view class="add">
						<u-button :loading="false" icon="add" class="mini-btn" type="primary" size="mini"
							@click="addCommentOrReply()">{{ replyCommentId > 0 ? '回复' : '发表' }}</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-masker-loading" v-show="showLoading" @touchmove.stop.prevent @touchmove.stop.prevent>
			<view class="bg-masker-loading-fixed loading flex align-center justify-center" @touchmove.stop.prevent
				@touchmove.stop.prevent>
				<u-loading color="#fff" mode="flower" :show="true" :size="loadingSize"></u-loading>
			</view>
		</view>
		<view class="sign-up" v-if="postInfo.status === 1&&postInfo.id">
			<view class="btn" @click="goSignUp">我要报名</view>
		</view>
	</view>
</template>

<script>
	import {
		getPostInfo,
		addCollect,
		infoCollect,
		deleteCollect,
		addReply,
		getReplyPage,
		updatePostStatus,
		updatePostTop
	} from "@/apis/index.js"
	
	import { httpLogin } from "@/common/request.js"

	import dayjs from "dayjs"
	export default {
		filters: {
			dateMonth(value) {
				if (!value) {
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			},
		},
		computed: {
			loadingSize() {
				return uni.upx2px(120)
			},
			showLoading() {
				return this.$store.state.loading
			},
			uIconSize() {
				return uni.upx2px(60)
			},
			html() {
				let postInfo = this.postInfo || {}
				return postInfo.content || ''
			},
			isAdmin() {
				return this.$store.state.userInfo.role === 0
			},
			replyTotalAll() {
				let replyTotal = this.replyTotal
				this.replyList.forEach((it) => {
					replyTotal += it.replys.length
				})
				return replyTotal
			},
			token() {
				return this.$store.state.token
			},
			showCommenBar() {
				let postInfo = this.postInfo || {}
				return postInfo.isReply === 1
			}
		},
		watch: {
			token() {
				this.init()
			}
		},
		data() {
			return {
				postStatusText: ['隐藏', '报名中', '结束报名', '活动开始', '活动取消', '活动结束'],
				postStatusClass: ['bg-black', 'bg-green' /*报名中*/ , 'bg-purple' /*结束报名*/ , 'bg-blue' /*活动开始*/ , 'bg-red' /*活动取消*/ ,
					'bg-gray' /*活动结束*/
				],
				isLoad: false,
				loadStatus: 'loading', // loadmore/ loading / nomore
				postId: null, // 文章 id
				postInfo: {},
				tagStyle: {
					table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
					th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					li: 'margin: 5px 0;'
				},
				lickInfo: null, // null or object 点赞集合
				replySearchForm: {
					page: 1,
					size: 15
				},
				replyList: [], // 评论列表
				replyTotal: 0, // 评论数
				showAddComment: false,
				// showCommenBar: true,
				addCommentFocus: false,
				commentContent: '',
				replyCommentId: 0,
				replyNickname: '',
				page_index: 1,
				page_size: 10,
				hasMoreData: false,
				showShareTip: false,
				showH5Share: false,
				showBrowserShareTip: false
			};
		},
		onShareAppMessage() {
			return {
				title: this.postInfo.title,
				path: '/pages/post/detail?id=' + this.postId
			}
		},
		onLoad(options) {
			this.$store.state.refreshPost = false
			if (!options.id) {
				uni.showToast({
					title: '未知错误！',
					icon: 'none'
				});
				return
			}
			this.postId = options.id
			this.getPostInfo(options.id)
			this.getReplyPage({
				...this.replySearchForm,
				postId: options.id,
			})
			this.init()
		},
		onShow(){
			if(this.$store.state.refreshPostDetail){
				this.$store.state.refreshPostDetail = false
				this.getPostInfo(this.postId)
			}
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
			getPostInfo(id) {
				this.$store.state.refreshPost = true
				getPostInfo({
					id: id
				}).then(res => {
					this.postInfo = res.data
				}).finally(() => {
					this.isLoad = true
				})
			},
			onLoadMore() {
				this.getPostPage({
					...this.searchData,
					page: this.searchData.page + 1
				})
			},
			/*初始化添加评论*/
			initAddComment(status, item = null) {
				if (status && !this.token) {
					httpLogin()
					return
				}
				this.showAddComment = status;
				this.commentContent = '';
				this.replyCommentId = '';
				this.replyNickname = '';
				if (item) {
					this.replyCommentId = item.id;
					this.replyNickname = item.user && item.user.nickName;
				}
				setTimeout(() => {
					this.addCommentFocus = status;
				}, 200);
			},
			/*点赞*/
			like() {
				if (!this.token) {
					httpLogin()
					return
				}
				this.$store.state.loading = true
				addCollect({
					postId: this.postInfo.id
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
					postId: this.postInfo.id || this.postId
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
					postId: this.lickInfo.id
					
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

			/*添加评论或回复*/
			addCommentOrReply() {
				if (this.commentContent == '') {
					uni.showToast({
						title: '评论内容不能为空',
						icon: 'none'
					});
					return;
				}
				this.$store.state.loading = true
				addReply({
					postId: this.postInfo.id,
					content: this.commentContent,
					replyId: this.replyCommentId, // 默认空，有值为回复
				}).then(res => {
					// 只限管理员才能回复评论
					this.showAddComment = false;
					this.commentContent = '';
					let title = "评论成功"
					if (this.replyCommentId) {
						this.replyCommentId = '';
						this.replyNickname = '';
						title = "回复成功"
					}
					uni.showToast({
						title: title,
						icon: 'none'
					});
					this.getReplyPage({
						...this.replySearchForm,
						page: 1
					})
					this.$store.state.refreshPost = true
				}).finally(() => {
					this.$store.state.loading = false
				})

			},
			getReplyPage(replySearchForm = this.replySearchForm) {
				// R.uniq 去重
				getReplyPage({
					postId: this.postInfo.id,
					...replySearchForm
				}).then(res => {
					this.replySearchForm = replySearchForm
					let replyList = res.data.list
					if (replySearchForm.page != 1) {
						let list = []
						replyList = [...this.replyList].concat(replyList)
					}
					this.replyTotal = res.data.pagination.total
					this.replyList = replyList
					if (this.replyTotal <= this.replyList.length) {
						this.loadStatus = 'nomore'
					} else {
						this.loadStatus = 'loadmore'
					}
				})
			},
			// 跳到评论
			async navToReply() {
				let offsetTop = 0
				let pageHeight = await this.getDomHeight('postdetailpage')
				let replyHeight = await this.getDomHeight('reply')
				offsetTop = (pageHeight - replyHeight) - this.CustomBar
				if (offsetTop < 400) {
					return
				}
				uni.pageScrollTo({
					scrollTop: offsetTop,
					duration: 180,
				})
			},
			getDomHeight(domId) {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this).select("#" + domId).boundingClientRect(data => {
						resolve((data && data.height) || 0)
					}).exec();
				})
			},
			// 修改文章状态
			editStatus(){
				let that = this
				uni.showActionSheet({
				    itemList: this.postStatusText,
				    success :(res) => {
						let status = res.tapIndex
						that.$store.state.loading = true
						updatePostStatus({
							id: that.postId,
							status,
						}).then(res => {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							});
							that.$set(that.postInfo, 'status', status)
							that.$store.state.refreshPost = true
						}).finally(() => {
							that.$store.state.loading = false
						})
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			editTop(item){
				let top = item.top
				let that = this
				uni.showActionSheet({
					itemList: [top === 1 ? '取消置顶' : '置顶'],
				    success :(res) => {
						that.$store.state.loading = true
						updatePostTop({
							id: this.postId,
							top: +!top,
						}).then(res => {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							});
							that.$set(that.postInfo, 'top', +!top)
							that.$store.state.refreshPost = true
						}).finally(() => {
							that.$store.state.loading = false
						})
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			editPost(item){
				this.$store.commit("setPostInfo", item)
				uni.navigateTo({
					url: './post?id=' + item.id
				})
			},
			/*分享*/
			share() {
				// #ifdef H5
				if (util.isWechatOrQQ()) {
					this.showShareTip = true;
				} else {
					this.showH5Share = true;
				}
				// #endif

				// #ifdef MP
				uni.showShareMenu();
				// #endif
			},
			load() {
				console.log('dom 树加载完毕')
			},
			ready(e) {
				console.log('ready 事件触发：', e)
			},
			imgtap(e) {
				console.log('imgtap 事件触发：', e)
			},
			linktap(e) {
				console.log('linktap 事件触发：', e)
			},
			// 去报名
			goSignUp () {
				const list = this.postInfo.addressList ? JSON.stringify(this.postInfo.addressList) : '[]'
				uni.navigateTo({
					url: '/pages/signUp/index?id=' + this.postInfo.id + '&addressList=' + list
				})
			}
		}
	}
</script>

<style lang="scss">
	.full {
	}
	page {
		background-color: #fff;
	}

	.detail {
		padding: 20rpx 30rpx;

		.title {
			font-size: 40rpx;
			color: #262626;
			line-height: 70rpx;
			font-weight: bold;
		}

		.info {
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.source-date {
				.source {
					color: #666;
				}

				.date {
					color: #999;
					margin-left: 0rpx;
				}
			}

			.read {
				color: #999;
			}
		}

		.desc {
			margin-top: 56rpx;
			overflow: hidden;
			color: #262626;

			.wxParse {
				color: #262626;
			}
		}
	}

	.comment {
		padding: 20rpx 32rpx 0;
		background: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #262626;
			font-weight: bold;
			border-bottom: 1rpx solid #eee;

			text {
				padding-bottom: 20rpx;
				line-height: normal;
			}

			.count {
				padding-bottom: 20rpx;
				font-size: 30rpx;
				color: #999;
				margin-left: 10rpx;
				line-height: normal;
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0 20rpx;
			border-bottom: 1rpx solid #eee;

			&:last-child {
				border-bottom: 0;
			}

			.avatar {
				flex-grow: 0;
				flex-shrink: 0;
				margin-right: 20rpx;

				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 10upx;
				}
			}

			.comment-info {
				flex-grow: 1;
				flex-shrink: 1;

				.nickname-like {
					display: flex;
					justify-content: space-between;

					.nickname {
						font-size: 28rpx;
						color: #666;
					}
				}

				.comment-desc {
					color: #333;
					font-size: 28rpx;
					line-height: 1.4;
					margin-top: 10rpx;
				}

				.reply-count {
					background: #f2f2f2;
					padding: 0rpx 12rpx;
					font-size: 28rpx;
					color: #999;
					margin: 14rpx 0 14rpx;
					.item {
						display: flex;
						justify-content: space-between;
						padding: 14rpx 0 14rpx;
						border-bottom: 0;

						.comment-desc {
							margin-top: 5rpx;
						}
					}
				}

				.date-reply {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.date {
						display: flex;
						align-items: center;
						color: #b4b4b4;
						font-size: 28rpx;
						margin-right: 20rpx;
						margin-top: 4rpx;
					}

					.reply {
						flex-grow: 0;
						flex-shrink: 0;
						font-size: 28rpx;
						// color: #999;
					}
				}
			}
		}

		.no-comment {
			padding: 40rpx 0;
			color: #999;
			font-size: 28rpx;
		}
	}

	.comment-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: row;
		z-index: 10;

		.input {
			flex-grow: 0;
			flex-shrink: 0;
			margin: 20rpx 10rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			background: #f2f2f2;
			width: 440rpx;
			border-radius: 40rpx 40rpx 0 40rpx;

			text {
				font-size: 28rpx;
				color: #aaa;
				margin-left: 38rpx;
			}
		}

		.operate {
			width: 100%;
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-right: 10rpx;
			font-size: 45rpx;
			padding: 0 30rpx;

			view,
			navigator {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 25%;

				image {
					width: 45rpx;
					height: 45rpx;
				}
			}

			.info,
			.like {
				position: relative;

				.count {
					position: absolute;
					top: -15rpx;
					right: -4rpx;
					background-image: linear-gradient(140deg, #ff5500 9%, #8cc7b5 75%);
					display: flex;
					align-items: center;
					border-radius: 50rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: #fff;
					height: 30rpx;
					line-height: 30rpx;
				}
			}

			.share {
				display: flex;
				justify-content: space-around;
				padding: 0;
				background: transparent;

				image {
					width: 45rpx;
					height: 45rpx;
					border: 0;
				}

				&:after {
					display: none;
				}
			}
		}
	}


	.add-comment {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		z-index: 9999;

		.info {
			display: flex;
			flex-direction: row;
			padding: 10rpx 20rpx 20rpx 10rpx;

			.input {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				align-items: center;
				background: #f2f2f2;
				border-radius: 20rpx 20rpx 0 20rpx;
				padding: 20rpx 32rpx 20rpx;
				line-height: normal;

				textarea {
					//padding: 10rpx 0;
					width: 100%;
					font-size: 28rpx;
					line-height: 32rpx;
					background: #f2f2f2;
				}
			}

			.add {
				flex-grow: 0;
				flex-shrink: 0;
				width: 150rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.cancel {
				position: absolute;
				right: 10rpx;
				top: 2rpx;

				/deep/.icon {
					font-size: 40rpx;
					color: #ccc;
				}
			}
		}
	}
	.sign-up {
		height: 88upx;
		border-top: 1px solid #ccc;
		padding: 5px 12px;
		box-sizing: border-box;
		position: sticky;
		bottom: 0;
		background-color: #fff;
		.btn {
			width: 100%;
			height: 100%;
			border-radius: 6px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #025CEA;
			color: #fff;
		}
	}
</style>
