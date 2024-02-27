<template>
	<view class="widget-video" :style="{height:videoHeight}">
		<!-- 下拉刷新 -->
		<view v-if="marginTop>0" class="refresh-box">
			松开刷新
		</view>
		<!-- 视频容器 -->
		<view class="scroll-video-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
			:style="{'marginTop':marginTop+'px','transition':transition}">
			<view ref="videoItemBox" class="video-item-box" v-for="(item, index) in videoList" :key="index"
				:style="{height:videoHeight}">
				<video @click="$event => {pauseVideo($event, item)}" :id="item.id" class="fullscreen-video"
					:src="item.videoUrl" @error="videoError(item,index)" :poster="item.posterUrl" :controls="false"
					:show-progress="false" :show-fullscreen-btn="false" :show-play-btn="false" :loop="true"
					:autoplay="index == 0" :show-center-play-btn="false">
				</video>
				<template v-for="(fabulous, fabulousIndx) in fabulousArr">
					<i v-if="fabulous != null" @click="fabulousDbClick" class="iconfont iconxihuan fabulous-item"
						:style="{'top':fabulous.top,'left':fabulous.left,'opacity':fabulous.opacity,'transform':fabulous.transform}"></i>
				</template>

				<i :class="['iconfont iconbofang btn-play',currentStatus == 'pause' && currentIndex == index ? 'show' : '']"
					@click="pauseVideo"></i>
				<view class="video-info">
					<view class="atavar-box">
						<image class="atavar-img" :src="item.userHead" mode="widthFix"></image>
						<view class="add-follow-btn" @click="followFunc(index,item)">
							<i
								:class="['iconfont inline-block icon-follow', item.isFollow == 1 ? 'iconduihao' : 'iconjia1']"></i>
						</view>
					</view>
					<view class="icon-box" @click="toggleFabulous(item, index)">
						<i :class="['iconfont iconxihuan icon-btn', item.isFabulous ? 'color-red' : '']"></i>
						<view class="count-text">{{item.fabulousCount}}</view>
					</view>
					<view class="icon-box" @click="commontAdd">
						<i class="iconfont iconIMliaotian-shixin icon-btn"></i>
						<view class="count-text">{{item.commentCount}}</view>
					</view>
					<view class="icon-box">
						<i class="iconfont iconfenxiang icon-btn" @click="shareFunc(item)"></i>
						<view class="count-text">{{item.shareCount}}</view>
					</view>
				</view>
				<view class="video-title">
					<view class="user-name">@{{item.userNick}}</view>
					<view class="video-content">{{item.videoContent}}</view>
				</view>
			</view>
			<view v-if="videoList.length == 0" class="empty-txt">当前没有可播放视频哦～</view>
		</view>

		<!-- 上拉加载 -->
		<view v-if="videoList.length > 0" class="load-more-box">
			加载更多
		</view>
		<!-- 评论弹窗 -->
		<view :class="['commont-box',commontShow ? 'active' : '']">
			<view class="commont-title">{{currentComment.count}}条评论</view>
			<view class="commont-list">
				<view v-for="(item, index) in currentComment.list" :key="index">
					<view class="comment-panel">
						<image class="first-user" :src="item.userHead" mode="widthFix"></image>
						<view class="first-comment">
							<view class="comment-name">{{item.userNick}}</view>
							<view class="comment-content">{{item.content}}</view>
							<view class="time-box">
								<text class="inline-block">{{item.time}}</text>
								<view class="inline-block reply-btn" @click="reply('first',item,index)">回复</view>
							</view>
						</view>
						<view class="fabulous-box">
							<i :class="['iconfont iconxihuan fabulous-btn', item.isFabulous == '1' ? 'color-red' : '']"
								@click="commentFabulous('first',item,index)"></i>
							<view class="fabulous-text">{{item.fabulousCount}}</view>
						</view>
					</view>
					<view style="padding-left: 70rpx;">
						<view class="comment-panel" v-for="(child, childIndex) in item.children">
							<image class="first-user" :src="child.userHead" mode="widthFix"></image>
							<view class="first-comment">
								<view class="comment-name" v-if="child.replyTo == item.userNick">{{child.userNick}}
								</view>
								<view class="comment-name" v-else>
									<span class="inline-block">{{child.userNick}}</span>
									<span class="inline-block">
										<i class="iconfont iconxiangyou1" style="font-size: 8px;"></i>
									</span>
									<span class="inline-block">{{child.replyTo}}</span>
								</view>
								<view class="comment-content">{{child.content}}</view>
								<view class="time-box">
									<text class="inline-block">{{child.time}}</text>
									<view class="inline-block reply-btn"
										@click="reply('second',child,index,childIndex)">回复</view>
								</view>
							</view>
							<view class="fabulous-box">
								<i :class="['iconfont iconxihuan fabulous-btn', child.isFabulous == '1' ? 'color-red' : '']"
									@click="commentFabulous('second',child,index,childIndex)"></i>
								<view class="fabulous-text">{{child.fabulousCount}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论输入框 -->
			<input class="comment-input" @confirm="commentCommit" @blur="commentBlur" v-model="replyContent"
				:focus="showInput" :placeholder="commentPlaceholder" type="text" />
		</view>

	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	export default {
		props: {
			// 视频容器高度
			videoHeight: {
				type: String,
				default: '100vh'
			},
			// 列表数据
			data: {
				type: Array,
				default () {
					return []
				}
			},
			// 当前视频下标
			videoIndex:{
				type:[Number,String],
				default:'0'
			}
		},
		data() {
			return {
				// 视频列表数据
				videoList: this.data,
				// 视频实际高度，用于滚动计算
				videoRealHeight: 0,
				// 双击点赞记录
				fabulousArr: [],
				// 记录点击时间判断单击还是双击，单击暂停，双击点赞
				clickTimer: null,
				// 记录点击时间
				clickTime: 0,
				// 屏幕高度
				windowHeight: uni.getSystemInfoSync().windowHeight || window.innerHeight,
				// 动画效果
				transition: 'none',
				// 触摸开始值
				startY: 0,
				// 触摸移动值
				moveY: 0,
				// 滑动开始时间
				startTime: 0,
				// 向上滑动距离
				marginTop: 0,
				// 每次向上滑动的距离
				fixMarginTop: 0,
				// 滑动方向
				moveDirection: '',
				// 当前轮播的index
				currentIndex: 0,
				// 当前页的视频对象
				currentVideo: null,
				// 当前视频的评论
				currentComment: [],
				// 视频状态：播放/暂停
				currentStatus: 'play',
				// 是否显示评论
				commontShow: false,
				// 爱心动画双击
				fabulousTime: 0,
				fabulousTimer: null,
				// 显示评论输入框
				showInput: false,

				// 评论提示
				commentPlaceholder: '说点好听的～',
				// 回复对象
				replyType: 'video',
				replyObj: {},
				replyIndex: 0,
				replyParentIndex: 0,
				// 评论内容
				replyContent: '',

			};
		},
		watch: {
			data: {
				handler(n) {
					this.videoList = n;
				},
				deep: true
			}
		},
		// #ifdef APP-NVUE
		onReady() {
			dom.getComponentRect(this.$refs.videoItemBox, option => {
				this.videoRealHeight = option.size.height;
			});
		},
		// #endif
		mounted() {
			// 初始化视频容器计算高度
			//#ifdef H5
			this.videoRealHeight = this.$refs['videoItemBox'][0].$el.getBoundingClientRect().height;
			//#endif
			//#ifdef MP-WEIXIN
			const query = uni.createSelectorQuery().in(this);
			query.select('.video-item-box').boundingClientRect(data => {
				this.videoRealHeight = data.height;
			}).exec();
			//#endif
			// 初始化第一个视频播放器
			this.currentVideo = uni.createVideoContext(this.videoList[0].id, this);
			// 初始化评论
			this.currentComment = this.videoList[0].commentObj;
			// 定时清除动画元素
			this.clearFabulousArr();
		},
		methods: {
			// 视频出错
			videoError(item, index) {
				uni.showToast({
					title: '视频出错了!',
					icon: 'none'
				})
			},
			// 触摸开始
			touchStart(e) {
				this.transition = 'none';
				this.startY = e.touches[0].pageY;
				this.startTime = new Date().getTime();
			},
			// 触摸滑动
			touchMove(e) {
				// 如果评论面板打开，禁止滑动
				if (this.commontShow) {
					return;
				}
				this.moveY = e.touches[0].pageY;
				if (this.moveY > this.startY) {
					// 返回上一个视频
					let range = this.fixMarginTop + this.moveY - this.startY;
					if (this.currentIndex == 0) {
						this.marginTop = range > 50 ? 50 : range;
					} else {
						this.marginTop = range;
					}
					this.moveDirection = 'up';
				} else {
					if (this.videoList.length == 0) {
						return;
					}
					// 查看下一个视频
					let range = this.fixMarginTop - this.startY + this.moveY;
					if (this.currentIndex == this.videoList.length - 1) {
						// 最后一个视频的位置
						let lastVideo = -this.currentIndex * this.videoRealHeight + -50;
						this.marginTop = range < lastVideo ? lastVideo : range;
					} else {
						this.marginTop = range;
					}
					this.moveDirection = 'down';
				}
			},
			// 触摸结束
			touchEnd(e) {
				this.transition = 'all .2s';
				if (this.currentIndex == 0 && this.marginTop >= 45) {
					// 下拉刷新
					this.$emit('refresh');
					this.marginTop = 0;
					return;
				}
				if (this.currentIndex == this.videoList.length - 1 && this.marginTop < (this.fixMarginTop - 45)) {
					this.marginTop = this.fixMarginTop;
					// 加载更多
					this.$emit('loadMore');
					return;
				}
				let millisecond = new Date().getTime() - this.startTime;
				let condition1 = this.moveY > 0 && Math.abs(this.moveY - this.startY) > 50 && millisecond < 500;
				let condition2 = this.moveY > 0 && Math.abs(this.moveY - this.startY) > this.videoRealHeight / 3;
				if (condition1 || condition2) {
					if (this.moveDirection == 'up') {
						// 返回上一个
						if (this.currentIndex == 0) {
							this.marginTop = 0;
						} else {
							this.marginTop = this.fixMarginTop + this.videoRealHeight;
							this.currentIndex = this.currentIndex - 1;
							this.$emit('update:videoIndex',this.currentIndex);
							this.currentComment = this.videoList[this.currentIndex].commentObj;
							this.videoPlayChange();
						}
					} else {
						// 查看下一个
						if (this.currentIndex == this.videoList.length - 1) {
							this.marginTop = this.fixMarginTop;
						} else {
							this.marginTop = this.fixMarginTop - this.videoRealHeight;
							this.currentIndex = this.currentIndex + 1;
							this.$emit('update:videoIndex',this.currentIndex);
							this.currentComment = this.videoList[this.currentIndex].commentObj;
							this.videoPlayChange();
						}
					}
				} else {
					this.marginTop = this.fixMarginTop;
				}
				this.fixMarginTop = this.marginTop;
				this.startY = 0;
				this.moveY = 0;
			},
			// 滑动切换
			videoPlayChange() {
				this.stopOtherVideo();
				let video = uni.createVideoContext(this.videoList[this.currentIndex].id, this);
				this.currentVideo = video;
				this.currentVideo.play();
				this.currentStatus = 'play';
			},
			// 暂停其他视频
			stopOtherVideo() {
				this.videoList.map(v => {
					let video = uni.createVideoContext(v.id, this);
					video.seek(1);
					video.pause();
				})
			},
			// 暂停/播放视频/双击点赞事件
			pauseVideo(e, item) {
				// 视频对象为空,返回
				if (!this.currentVideo) return;
				if (this.commontShow) {
					this.commontShow = false;
					return;
				}
				clearTimeout(this.clickTimer);
				let currentTime = new Date().getTime();
				let timeRange = currentTime - this.clickTime;
				if (timeRange < 300) {
					// 双击事件
					if (!item.isFabulous) {
						this.$emit('fabulous', item, true);
					}
					this.dbClickAnimation(e);
				} else {
					// 单击事件
					this.clickTimer = setTimeout(() => {
						e.preventDefault();
						e.stopPropagation();
						if (this.currentStatus == 'play') {
							this.currentVideo.pause();
							this.currentStatus = 'pause';
						} else {
							this.currentVideo.play();
							this.currentStatus = 'play';
						}
					}, 300);
				}
				this.clickTime = new Date().getTime();
			},
			// 已有爱心叠加双击事件
			fabulousDbClick(e) {
				clearTimeout(this.fabulousTimer);
				let currentTime = new Date().getTime();
				let timeRange = currentTime - this.fabulousTime;
				if (timeRange < 300) {
					// 双击事件
					this.dbClickAnimation(e);
				} else {

				}
				this.fabulousTime = new Date().getTime();
			},
			// 双击点赞动画
			dbClickAnimation(e) {
				let deg = Math.round(Math.random() * 40 + 5);
				this.fabulousArr.push({
					left: e.detail.x - 25 + 'px',
					top: e.detail.y - 25 + 'px',
					transform: 'rotate(' + (deg % 2 == 0 ? deg : -deg) + 'deg)',
					createTime: new Date().getTime()
				})

				let index = this.fabulousArr.length > 0 ? this.fabulousArr.length - 1 : 0;
				setTimeout(() => {
					this.$set(this.fabulousArr, index, Object.assign(this.fabulousArr[index], {
						opacity: 0,
						transform: 'scale(3) ' + this.fabulousArr[index].transform
					}))
					setTimeout(() => {
						this.fabulousArr.splice(index, 1, null);
					}, 1000);
				}, 500);

				if (!this.videoList[this.currentIndex].isFabulous) {
					this.$set(this.videoList, this.currentIndex, Object.assign(this.videoList[this.currentIndex], {
						isFabulous: 1,
						fabulousCount: this.videoList[this.currentIndex].isFabulous + 1
					}))
				}
			},
			// 定时清除点赞动画元素
			clearFabulousArr() {
				const indexArr = this.fabulousArr.map((v, i) => {
					if (v.opacity == '0') {
						return i;
					}
				});
				indexArr.forEach(v => {
					this.fabulousArr.splice(v, 1);
				});
			},
			// 点赞切换
			toggleFabulous(item, index) {
				this.$emit('fabulous', item, item.isFabulous ? false : true);
				this.$set(this.videoList, index, Object.assign(item, {
					isFabulous: item.isFabulous ? 0 : 1,
					fabulousCount: item.isFabulous ? item.fabulousCount - 1 : item.fabulousCount + 1,
				}));
			},
			// 评论
			commontAdd() {
				this.commontShow = true;
				this.replyType = 'video';
				this.replyObj = this.currentVideo;
			},
			// 分享
			shareFunc(item) {
				this.$emit('share', item);
			},
			// 关注
			followFunc(index, item) {
				let flag = item.isFollow == 1 ? false : true;
				if (flag) {
					uni.showToast({
						title: '关注成功',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '取消关注',
						icon: 'none'
					})
				}
				this.$emit('follow', item, flag);
				this.$set(this.videoList, index, Object.assign(item, {
					isFollow: item.isFollow == 1 ? 0 : 1
				}));
			},
			// 评论点赞
			commentFabulous(level, item, index, childIndex) {
				const result = item.isFabulous == '1' ? '0' : '1';
				item.isFabulous = result;
				if (result == '1') {
					item.fabulousCount = item.fabulousCount + 1;
				} else {
					item.fabulousCount = item.fabulousCount - 1;
				}
				if (level === 'first') {
					this.currentComment.list[index] = item;
				} else {
					this.currentComment.list[index].children[childIndex] = item;
				}
				this.$emit('commentFabulous', item);
			},
			// 回复评论
			reply(level, item, index, childIndex) {
				this.showInput = true;
				this.commentPlaceholder = `回复@${item.userNick}`;
				this.replyIndex = childIndex;
				this.replyType = level;
				this.replyParentIndex = index;
				this.replyObj = item;
			},
			// 提交评论
			commentCommit() {
				this.showInput = false;
				if (this.replyType == 'video') {
					this.currentComment.list.push({
						userHead: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick: 'yjyyyyy',
						content: this.replyContent,
						fabulousCount: 0,
					})
				} else if (this.replyType == 'first') {
					this.currentComment.list[this.replyParentIndex].children.push({
						userHead: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick: 'yjyyyyy',
						content: this.replyContent,
						fabulousCount: 0,
						replyTo: this.replyObj.userNick
					});
				} else {
					this.currentComment.list[this.replyParentIndex].children.push({
						userHead: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick: 'yjyyyyy',
						content: this.replyContent,
						fabulousCount: 0,
						replyTo: this.replyObj.userNick
					});
				}
				this.replyContent = '';
			},
			// 收起键盘
			commentBlur() {
				this.commentPlaceholder = `说点好听的～`;
				this.showInput = false;
				this.replyType = 'video';
				this.replyObj = this.currentVideo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/font.css';

	.color-red {
		color: #f73b3b;
	}

	.inline-block {
		display: inline-block;
		vertical-align: middle;
	}

	// 喜欢按钮动画
	.iconxihuan,
	.icon-follow {
		transition: all .3s;
	}

	.iconxihuan:active,
	.icon-follow:active {
		transform: scale(1.5);
	}

	@keyframes double-fabulous {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			opacity: 0;
			transform: scale(3);
		}
	}

	// 双击点赞样式
	.fabulous-item {
		position: absolute;
		z-index: 99999;
		width: 100rpx;
		height: 100rpx;
		color: #f73b3b;
		font-size: 100rpx;
		// animation: double-fabulous 5s;
		transform-origin: 50% 100%;
		transition: opacity .8s, transform .8s;
		opacity: 0.8;
	}

	// 评论框
	.commont-box {
		position: fixed;
		z-index: -1;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60%;
		overflow-y: auto;
		background-color: #222;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		transition: all .3s;
		transform: translateY(100%);
		display: flex;
		flex-direction: column;

		&.active {
			z-index: 9;
			transform: translateY(0);
		}

		.commont-title {
			text-align: center;
			color: white;
			font-size: 24rpx;
			margin: 20rpx 0;
			font-weight: bold;
		}

		.commont-list {
			flex: 1;
			overflow-y: auto;

			.comment-panel {
				margin: 30rpx 40rpx;
				display: flex;

				.first-user {
					width: 50rpx;
					height: 50rpx;
					border-radius: 100%;
				}

				.first-comment {
					flex: 1;
					margin: 0rpx 20rpx;

					.comment-name {
						font-size: 24rpx;
						font-weight: bold;
						color: #999;
					}

					.comment-content {
						color: white;
						font-size: 26rpx;
						margin-top: 10rpx;
					}

					.time-box {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #999;

						.reply-btn {
							margin-left: 20rpx;
						}
					}
				}

				.fabulous-box {
					text-align: center;
					color: #666;

					.fabulous-btn {
						font-size: 36rpx;
						transition: color .3s;
					}

					.fabulous-text {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}

		.comment-input {
			display: block;
			margin: 10px auto;
			box-sizing: border-box;
			width: 90%;
			height: 70rpx;
			padding: 0 20px;
			border-radius: 60rpx;
			background-color: #4a4a4a;
			color: white;
		}
	}

	// 全局容器
	.widget-video {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;

		.scroll-video-box {
			min-height: 100%;
			position: relative;

			.empty-txt {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}


		.refresh-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.load-more-box {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		// 视频容器
		.video-item-box {
			position: relative;

			.btn-play {
				font-size: 80rpx;
				color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				transition: all .3s;
				transform: translateX(-50%) translateY(-50%) scale(1.5);
				z-index: 8;
				opacity: 0;

				&.show {
					opacity: 0.5;
					transform: translateX(-50%) translateY(-50%) scale(1);

				}
			}

			.fullscreen-video {
				width: 100%;
				height: 100%;
				position: relative;
			}

			.video-info {
				width: 100rpx;
				position: absolute;
				right: 20rpx;
				bottom: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.atavar-box {
					background-color: white;
					padding: 6rpx;
					border-radius: 100%;
					width: 100rpx;
					height: 100rpx;
					margin-bottom: 60rpx;
					position: relative;

					.atavar-img {
						width: 100%;
						display: block;
						border-radius: 100%;
					}

					.add-follow-btn {
						width: 40rpx;
						height: 40rpx;
						padding: 4rpx;
						border-radius: 100%;
						color: white;
						background-color: #f73b3b;
						position: absolute;
						bottom: -24rpx;
						left: 50%;
						transform: translateX(-50%);
						font-weight: bold;
						text-align: center;
						line-height: 32rpx;

						.iconjia1 {
							font-size: 26rpx;
						}
					}
				}

				.icon-box {
					width: 100rpx;
					height: 100rpx;
					margin-top: 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					flex-direction: column;
					color: white;

					.icon-btn {
						font-size: 60rpx;
					}

					.count-text {
						font-size: 24rpx;
					}
				}

			}

			.video-title {
				position: absolute;
				left: 20rpx;
				bottom: 20rpx;
				width: calc(100% - 160rpx);
				color: white;
				z-index: 1;

				.user-name {
					font-weight: bold;
				}

				.video-content {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
