<template>
	<view class="myPopup" :style="{height:phoneHeight+'px'}" v-if="isMyPopup" @touchmove.stop.prevent>
		<view class="myPopup_box">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight:'',
				isMyPopup:false
			};
		},
		created(){
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = res.screenHeight
				}
			})
		},
		props:{
			width:{
				width:Number,
				default:500
			},
			height:{
				height:Number,
				default:300
			},
			radius:{
				radius:Number,
				default:30
			},
			bgColor:{
				bgColor:String,
				default:'#ffffff'
			},
			left:{
				left:Number,
				default:125
			},
			top:{
				top:Number,
				default:300
			}
		},
		methods:{
			hide(){
				this.isMyPopup = false
				this.$emit('hide')
			},
			show(){
				this.isMyPopup = true
			},
			stop(e){
				// #ifdef APP-NVUE
				e.stopPropagation()
				// #endif
			}
		}
	}
</script>

<style>
.myPopup{
	width: 750rpx;
	background-color: rgba(0,0,0,.36);
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef MP-WEIXIN */
	height: 100vh;
	z-index: 1000;
	/* #endif */
}
.myPopup_box{
	width:100%;
	left:0;
	bottom: 0;  
	bottom: constant(safe-area-inset-bottom);  
	bottom: env(safe-area-inset-bottom);  
	position: fixed;
	/* #ifdef MP-WEIXIN */
	z-index: 2000;
	/* #endif */
}
</style>
