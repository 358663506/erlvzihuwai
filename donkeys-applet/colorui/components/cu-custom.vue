<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" v-if="!isBack">
					<slot name="left"></slot>
				</view>
				<view class="action not-show" @tap="BackPage" v-if="isBack" :class="{'show': isLoad}">
					<text class="cuIcon-back" v-if="isPrePage"></text>
					<view class="go-to-home-icon" v-else>
						<text class="cuIcon-homefill"></text>
					</view>
					<slot name="backText" v-if="isPrePage"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		prePage
	} from "@/common/common.js"
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isPrePage: true,
				isLoad: false,
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		mounted() {
			this.isPrePage = !!prePage()
			this.isLoad = true
		},
		methods: {
			BackPage() {
				if (this.isPrePage) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.reLaunch({
						url: '/pages/index/tabbar'
					})
				}
			}
		}
	}
</script>

<style scope>
	.go-to-home-icon {
		background-color: rgba(248,248,248, 0.8);
		color: black;
		width: 80rpx;
		text-align: center;
		border-radius: 90rpx;
	}
</style>
