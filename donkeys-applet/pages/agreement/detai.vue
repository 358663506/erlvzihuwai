<template>
	<view class="full">
		<view class="contents not-show" :class="{show: isLoad}">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">协议</block>
			</cu-custom>
			<view style="width: 100%; min-height: 600rpx; margin: 0 auto; background-color: #fff;">
				<view style="
				width: 100%;
				text-align: center;
				font-size: 30rpx;
				font-weight: bold;
				height: 100rpx;
				line-height: 100rpx;
        ">{{ agreementInfo.title }}</view>
				<mp-html container-style="padding:20rpx 32rpx" :content="agreementInfo.content" domain="" lazy-load
					scroll-table selectable use-anchor :tag-style="tagStyle" />
				<view v-if="signImage1" style="text-align: right; display:flex; justify-content: flex-end; padding-right: 20rpx">
					<image :src="signImage1" style="width: 200rpx; height: 100rpx"></image>
				</view>
				<view v-if="signImage2" style="text-align: right; display:flex; justify-content: flex-end; padding-right: 20rpx">
					<image :src="signImage2" style="width: 200rpx; height: 100rpx"></image>
				</view>
			</view>

			<myPopup ref="pop">
				<view style="
          background-color: #ffffff;
          border-top-left-radius: 20rpx;
          border-top-right-radius: 20rpx;
        ">
					<view style="
            margin-left: 92%;
            margin-bottom: -10rpx;
            width: 40rpx;
            height: 40rpx;
            font-size: 26rpx;
            line-height: 40rpx;
            background-color: #000000;
            opacity: 0.5;
            border-radius: 20rpx;
            text-align: center;
            position: fixed;
            bottom: 34.5%;
            z-index: 3000;
            left: 0rpx;
            color: #ffffff;
          " @click="hideShow">
						X
					</view>
					<view style="
            width: 100%;
            height: 100rpx;
            line-height: 100rpx;
            font-size: 30rpx;
            font-weight: bold;
            text-align: center;
          ">开始签名</view>
					<canvas class="firstCanvas" canvas-id="firstCanvas" @touchmove="move" @touchstart="start($event)"
						@touchend="end" @touchcancel="cancel" @longtap="tap" disable-scroll="true"
						@error="error"></canvas>

					<view class="caozuo">
						<view class="chongqian" @tap="clearClick">重签</view>
						<view class="over" @click="overSign">完成签名</view>
					</view>
				</view>
			</myPopup>
			<view style="display: flex; justify-content: center; margin-top: auto; background: #fffl"
				v-if="token && agreementInfo.status === 1">
				<view style="
          text-align: center;
          font-size: 26rpx;
          width: 200rpx;
          height: 70rpx;
          line-height: 70rpx;
          background-color: #0599d7;
          color: #ffffff;
          border-radius: 40rpx;
          margin: 0 auto;
          margin-top: 20rpx;
        " @click="showSign(1)">
					{{ signImage1 ? "重新签名" : "开始签名" }}
				</view>
				<view v-if="signImage1" style="
          text-align: center;
          font-size: 26rpx;
          width: 200rpx;
          height: 70rpx;
          line-height: 70rpx;
          background-color: #0599d7;
          color: #ffffff;
          border-radius: 40rpx;
          margin: 0 auto;
          margin-top: 20rpx;
        " @click="showSign(2)">
					{{ signImage2 ? "重新代签名" : "代签名" }}
				</view>
			</view>
			<view class="caozuo1"></view>
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
	import {
		getAgreementInfo,
		imgUpload,
		addAutograph,
		getAutographInfo,
		updateAutograph
		// getAu
	} from "@/apis/index.js"
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	});
	import myPopup from "@/components/qianxiao-pop/qianxiao-pop.vue";
	export default {
		components: {
			myPopup,
		},
		computed: {
			token() {
				return this.$store.state.token;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			loadingSize() {
				return uni.upx2px(120)
			},
			showLoading() {
				return this.$store.state.loading
			},
		},
		watch: {
			token(val) {
				if (val) {
					this.getAgreementInfo();
					this.getAutographInfo();
				}
			}
		},
		data() {
			return {
				isLoad: false,
				agreementId: "",
				signImage1: "",
				signImage2: "",
				signImageKey: "signImage1",
				isEnd: false, // 是否签名
				// 协议
				agreementInfo: {
					title: "",
					content: "",
				},
				// 用户签名
				autographInfo: {},
				tagStyle: {
					table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
					th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					li: 'margin: 5px 0;'
				},
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			_that = this;
			//获得Canvas的上下文
			content = uni.createCanvasContext("firstCanvas", _that);
			if (!options.id) {
				uni.showToast({
					title: "未知错误！",
					icon: "none",
				});
				return;
			}
			this.agreementId = options.id;
			this.getAgreementInfo();
			this.getAutographInfo()
		},
		onShareAppMessage(){
			return {
                title: this.agreementInfo.title,
				path: '/pages/agreement/detai?id=' + this.agreementId,
			}
		},
		methods: {
			getAgreementInfo() {
				this.$store.state.loading = true
				getAgreementInfo({
					id: this.agreementId
				}).then(res => {
					this.agreementInfo = res.data
				}).finally(() => {
					this.isLoad = true
					this.$store.state.loading = false
				})
			},
			getAutographInfo() {
				getAutographInfo({
					agreementId: this.agreementId
				}).then(res => {
					let autographInfo = res.data.id ? res.data : {
						content: ''
					}
					this.signImage1 = autographInfo.content.split(',')[0];
					this.signImage2 = autographInfo.content.split(',')[1];
					this.autographInfo = autographInfo;
				})
			},
			addAutograph(content) {
				let that = this;
				return new Promise((resolve, reject) => {
					this.$store.state.loading = true
					let request;
					if (this.autographInfo.id) {
						request = updateAutograph({
							id: this.autographInfo.id,
							agreementId: this.agreementInfo.id,
							content: content
						})
					} else {
						request = addAutograph({
							content: content,
							agreementId: that.agreementId
						})
					}
					Promise.resolve(request).then(res => {
							resolve(res.data)
						}).catch(err => {
							reject(err)
						})
						.finally(() => {
							this.$store.state.loading = false
						})
				})
			},
			hideShow() {
				console.log("333");
				// #ifdef MP-WEIXIN
				_that.$refs.pop.hide();
				// #endif
				// #ifdef APP-PLUS || H5
				_that.$nextTick(() => {
					_that.$refs.pop.hide();
				});
				// #endif
			},
			showSign(key = 1) {
				this.signImageKey = key == 1 ? "signImage1" : "signImage2";
				// #ifdef MP-WEIXIN
				_that.$refs.pop.show();
				// #endif
				// #ifdef APP-PLUS || H5
				_that.$nextTick(() => {
					_that.$refs.pop.show();
				});
				// #endif
			},
			overSign: function() {
				let that = this;
				if (_that.isEnd) {
					uni.canvasToTempFilePath({
						canvasId: "firstCanvas",
						success: async function(res) {
							let signImage1 = _that.signImage1;
							let signImage2 = _that.signImage2;
							let imageUrl = await imgUpload(res.tempFilePath, 'autograph');
							_that.signImageKey == "signImage1" ?
								(signImage1 = imageUrl) :
								(signImage2 = imageUrl);
							if (_that.signImageKey == "signImage2" || signImage2) {
								await _that.addAutograph(signImage1 + ',' + signImage2)
							} else {
								await _that.addAutograph(signImage1)
							}
							_that.signImage1 = signImage1
							_that.signImage2 = signImage2
							_that.hideShow();
							_that.clearClick();
						},
					});
				} else {
					uni.showToast({
						title: "请先完成签名",
						icon: "none",
						duration: 1500,
						mask: true,
					});
				}
			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				// console.log("触摸开始" + event.changedTouches[0].x)
				// console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y,
				};
				// console.log(point)
				touchs.push(point);
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				};
				// console.log(point)
				touchs.push(point);
				if (touchs.length >= 2) {
					this.draw(touchs);
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				// 设置为已经签名
				this.isEnd = true;
				console.log("end");
				// 清空轨迹数组
				touchs.pop();
				// for (let i = 0; i < touchs.length; i++) {
				// 	touchs.pop()
				// }
			},

			// 画布的触摸取消响应
			cancel: function(e) {},

			// 画布的长按手势响应
			tap: function(e) {},
			//画布触摸错误
			error: function(e) {},

			//绘制
			draw: function(touchs) {
				let point1 = touchs[0];
				let point2 = touchs[1];
				touchs.shift();
				//设置线的颜色
				content.setStrokeStyle("#000");
				//设置线的宽度
				content.setLineWidth(5);
				//设置线两端端点样式更加圆润
				content.setLineCap("round");
				//设置两条线连接处更加圆润
				content.setLineJoin("round");
				content.moveTo(point1.x, point1.y);
				content.lineTo(point2.x, point2.y);
				content.stroke();
				content.draw(true);
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false;
				//清除画布
				content.clearRect(0, 0, canvasw, canvash);
				content.draw(true);
			},
		},
	};
</script>

<style>
	.ts {
		color: #ff485d;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #f2f2f2;
		width: 100%;
		height: 20vh;
		/* margin: 0 25upx; */
		/* height: calc(100vh - 140upx); */
	}

	.contents {
		min-height: 99vh;
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	#signatureImg {
		background-color: #fff;
	}

	.caozuo1 {
		display: flex;
		height: 0;
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #eeeeee;
		background-color: #fff;
		z-index: 1000;
	}

	.caozuo {
		display: flex;
		height: 100rpx;
		width: 100%;
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.caozuo view {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		margin-left: 5%;
		border-radius: 40rpx;
	}

	.caozuo view:last-child {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		margin-left: 10%;
	}

	.caozuo view:active {
		background-color: #cccccc;
		color: #333333;
		background-color: #fff
	}

	.chongqian {
		background-color: #ff8f58;
	}

	.over {
		background-color: #0599d7;
	}
</style>
