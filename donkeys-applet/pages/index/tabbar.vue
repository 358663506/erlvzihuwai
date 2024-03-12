<template>
	<view class="full flex flex-column">
		<index @ShowNews="ShowNews" v-if="PageCur=='index'" ref="page"></index>
		<medias v-if="PageCur=='medias'" ref="page"></medias>
		<!-- <me v-else-if="PageCur=='me'" ref="page"></me> -->
		<login v-if="PageCur=='me' && !token" ref="page"></login>
		<me v-else-if="PageCur=='me' && token" ref="page"></me>
		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="index">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='index'" src="../../static/tabBar/index_cur.png"></image>
						<image v-if="PageCur != 'index'" src="../../static/tabBar/index.png"></image>
					</view>
					<view :class="PageCur=='index'?'color_main':'text-gray'">首页</view>
				</view>

				<view class="action text-gray add-action" @click="NavChange" data-cur="medias">
					<view class='cuIcon-cu-image'>
						<image src="../../static/tabBar/medias_cur.png"></image>
					</view>
					<view :class="PageCur=='medias'?'color_main':'text-gray'">照片墙</view>
				</view>

				<view class="action" @click="NavChange" data-cur="me">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='me'" src="../../static/tabBar/me_cur.png"></image>
						<image v-if="PageCur != 'me'" src="../../static/tabBar/me.png"></image>
					</view>
					<view :class="PageCur=='me'?'color_main':'text-gray'">个人中心</view>
				</view>
			</view>
		</view>
		<view class="bg-masker-loading" v-show="showLoading" @touchmove.stop.prevent @touchmove.stop.prevent>
			<view class="bg-masker-loading-fixed loading flex align-center justify-center" @touchmove.stop.prevent
				@touchmove.stop.prevent>
				<u-loading color="#fff" mode="flower" :show="true" :size="loadingSize"></u-loading>
			</view>
		</view>
	</view>
</template>

<script>
	import index from "./inedx.vue"; //首页
	import medias from "./medias.vue"; //照片墙
	import me from "./me.vue"; //个人中心
	import login from "./login.vue" // 登录
	export default {
		components: {
			index,
			medias,
			me,
			login
		},
		computed: {
			token() {
				return this.$store.state.token
			},
			loadingSize() {
				return uni.upx2px(120)
			},
			showLoading() {
				return this.$store.state.loading
			},
			PageCur: {
				set: function(value) {
					this.$store.commit("setPageCur", value)
				},
				get: function() {
					return this.$store.state.PageCur
				}
			}
		},
		data() {
			return {
				openId: '',
				access_token: '',
				tip: "我是提示",
				duration: 1

			};
		},
		// 分享小程序
		onShareAppMessage(res) {
			return {
				title: '徒步·爬山，快来「二驴子户外」吧！',
			};
		},
		onLoad() {
			this.$store.state.loading = true
			this.$store.state.refreshPost = false
			this.$store.state.refreshPostDetail = false
			let that = this
			wx.showShareMenu({
				withShareTicket: true
			})
		},
		mounted() {
			this.$nextTick(() => {
				uni.$store.state.loading = false
			})
		},
		onShareTimeline() {
			return {
				title: '徒步·爬山，快来「二驴子户外」吧！',
			}
		},
		onShow() {
			if (this.$refs.page && this.$refs.page.onShow) {
				this.$refs.page.onShow()
			}
		},
		onReachBottom() {
			if (this.$refs.page && this.$refs.page.onBottomOut) {
				this.$refs.page.onBottomOut()
			}
		},
		methods: {
			ShowNews(e) {
				console.log(e)
				this.PageCur = e;
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;

				if (this.PageCur == 'index') {
					// document.title = '首页'
				} else if (this.PageCur == 'medias') {
					// document.title = '照片墙'
				} else if (this.PageCur == 'me') {
					// document.title = '个人中心'
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.color_main {
		color: #0081ff;
		font-weight: 900;
	}

	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.logo_btn {
		width: 38*2rpx;
		height: 38*2rpx;
		position: absolute;
		z-index: 2;
		border-radius: 50%;
		top: -40rpx;
		left: 0rpx;
		right: 0;
		margin: auto;
		padding: 0;
	}

	.cu-bar.tabbar .action.add-action {
		padding-top: 56rpx !important;
	}
</style>
