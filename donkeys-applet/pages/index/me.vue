<!-- 个人中心 -->
<template>
	<view class="full-x flex flex-column components-theme">
		<!-- 顶部背景 -->
		<view class="UCenter-bg-pre">
			<view class='UCenter-bg' :style="'margin-top:' + CustomBar + 'px;'">
				<image src='../../static/back.png' class='UCenter-bg-png' mode='aspectFill'></image>
				<block>
					<view class='text-center'>
						<view class="cu-avatar2 round xl margin-right-sm shadow-blur-lg bg-img open-data"
							style="overflow: hidden;">
							<open-data type="userAvatarUrl"></open-data>
						</view>
						<view class="padding text-white text-xl text-bold" style="position: relative;z-index: 10;">
							你好，{{ userInfo.username }}
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="user-block">
			<view
				class="padding flex text-center text-grey bg-white cu-list card-menu margin-top-lg margin-bottom-sm shadow-shop bg-white text-black my-radius sm-border">
				<!-- <view class='padding flex text-center text-grey bg-white shadow-warp-my'> -->
				<view class='flex flex-sub flex-direction solid-right' @tap="goHistory()">
					<view class="text-xxl text-orange">{{userInfo.historyCount || 0}}</view>
					<view class="margin-top-sm">
						<text class='cuIcon-hot'></text> 足迹
					</view>
				</view>
				<view class='flex flex-sub flex-direction' @tap="goCollect()">
					<view class="text-xxl text-red">{{ userInfo.collectCount || 0 }}</view>
					<view class="margin-top-sm">
						<text class='cuIcon-like'></text> 收藏
					</view>
				</view>
			</view>

			<view
				class="cu-list menu card-menu margin-top-lg margin-bottom-sm shadow-shop bg-white text-black my-radius sm-border">
				<view class="cu-item" v-if="isAdmin">
					<button class='content cu-btn' @click="goAddPost">
						<image src='../../static/me/release.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>发布活动</text>
					</button>
				</view>
				<view class="cu-item" v-if="isAdmin">
					<button class='content cu-btn' @tap="goPostList" data-target="ModalGitee">
						<image src='../../static/me/post.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>活动管理</text>
					</button>
				</view>
				<view class="cu-item" v-if="false">
					<button class='content cu-btn' @tap="goPostList" data-target="ModalGitee">
						<image src='../../static/tabBar/medias_cur.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>照片墙管理</text>
					</button>
				</view>
				<view class="cu-item">
					<button class='content cu-btn' open-type="contact" session-grom=''>
						<image src='../../static/me/service.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>客服</text>
					</button>
				</view>
				<view class="cu-item">
					<button class='content cu-btn' open-type="share">
						<image src='../../static/me/share.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>分享小程序</text>
					</button>
				</view>
				<view class="cu-item">
					<button class='content cu-btn' open-type="feedback">
						<image src='../../static/post/chucuo.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>问题反馈</text>
					</button>
				</view>
				<view class="cu-item">
					<button class='content cu-btn' @click="goAboutMe">
						<image src='../../static/me/about.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>关于</text>
					</button>
				</view>
			</view>
		</view>
		<view style="margin-top: auto; padding-bottom: 30upx;" class="padding-lr">
			<u-button shape="circle" size="small" :custom-style="customStyle" @click="logOut">退出登录</u-button>
			<view class="cu-bar tabbar" style="width: 1rpx;"></view>
		</view>
	</view>
</template>

<script>
	var videoAd = null
	import {
		infoUser
	} from "@/apis/index.js"
	export default {
		computed: {
			token() {
				return this.$store.state.token
			},
			userInfo() {
				return this.$store.state.userInfo
			},
			isAdmin() {
				return this.userInfo.role === 0
			}
		},
		data() {
			return {
				modalName: null,
				customStyle: {
					height: uni.upx2px(72) + 'px',
					fontSize: uni.upx2px(28) + 'px',
					color: '#fff',
					background: 'linear-gradient(to right,#0081ff, #1cbbb4)'
				},
			}
		},
		// 分享小程序
		onShareAppMessage(res) {
			return {
				title: '徒步·爬山，快来「二驴子户外」吧！',
			};
		},
		watch: {
			topBackGroupImageIndex(val) {
				console.log(val)
				if (val == 4 || val == 5) {
					this.spaceShow = true;
				} else {
					this.spaceShow = false;
				}
			}
		},
		async mounted() {
			await this.getUserInfo()
			this.$store.state.loading = false
		},
		methods: {
			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "13544136193",
				});

			},
			// 发布活动
			goAddPost() {
				uni.navigateTo({
					url: '/pages/post/post'
				})
			},
			// 活动列表
			goPostList() {
				uni.navigateTo({
					url: '/pages/me/post'
				})
			},
			// 足迹
			goHistory() {
				uni.navigateTo({
					url: '/pages/me/history'
				})
			},
			// 收藏
			goCollect() {
				uni.navigateTo({
					url: '/pages/me/collect'
				})
			},
			// 协议
			goAgreement() {
				uni.navigateTo({
					url: '/pages/me/agreement'
				})
			},
			// 关于作者
			goAboutMe() {
				uni.navigateTo({
					url: '/pages/me/aboutMe'
				})
			},
			async getUserInfo() {
				await infoUser().then(res => {
					uni.$store.commit('setUserInfo', res.data)
				})
			},
			logOut() {
				uni.showModal({
					title: '确定要退出登录吗？',
					success: () => {
						this.$store.commit('setUserInfo', {})
						this.$store.commit('setTokenMap', {})
						this.$store.commit('setToken', '')
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.components-theme {
		min-height: 95vh;
	}

	.UCenter-bg-pre {
		height: 400rpx;
		width: 100%;
	}

	.UCenter-bg {
		background: transparent;
		background-size: 100% 100%;
		/* background-size: cover; */
		height: 550rpx;
		min-height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

		&-png {
			width: 100% !important;
			height: 100% !important;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 0
		}
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}


	// 头像
	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: #ccc;
		color: #fff;
		white-space: nowrap;
		position: relative;
		width: 150rpx;
		height: 150rpx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		z-index: 99;
	}

	.user-block {
		position: relative;
		z-index: 10;
	}

	.my-radius {
		border-radius: 12rpx;
		overflow: hidden
	}

	.shadow-shop {
		box-shadow: 0rpx 0rpx 90rpx 0rpx rgba(0, 0, 0, 0.1);
	}

	/* 数字背景 */
	.shadow-warp-my {
		position: relative;
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.shadow-warp-my:before,
	.shadow-warp-my:after {
		position: absolute;
		content: "";
		top: 20rpx;
		bottom: 30rpx;
		left: 20rpx;
		width: 50%;
		box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.16);
		transform: rotate(-6deg);
		z-index: -1;
	}

	.shadow-warp-my:after {
		right: 20rpx;
		left: auto;
		transform: rotate(6deg);
	}

	// 顶部流星
	.star {
		display: block;
		width: 5rpx;
		height: 5rpx;
		border-radius: 50%;
		background: #FFF;
		top: 100rpx;
		left: 400rpx;
		position: relative;
		transform-origin: 100% 0;
		animation: star-ani 6s infinite ease-out;
		box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}

	.star:after {
		content: '';
		display: block;
		top: 0rpx;
		left: 4rpx;
		border: 0rpx solid #fff;
		border-width: 0rpx 90rpx 2rpx 90rpx;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
		box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 3s infinite ease-out;
	}

	.pink {
		top: 30rpx;
		left: 395rpx;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.blue {
		top: 35rpx;
		left: 432rpx;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}

	.blue:after {
		/* border-color: transpareanimation-delay: 12s; */
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}
</style>
