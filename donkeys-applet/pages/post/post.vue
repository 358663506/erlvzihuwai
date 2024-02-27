<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''" id="scroll">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">编辑活动</block>
			</cu-custom>
			<view class="editor_toolbox">
				<i class="iconfont icon-undo" data-method="undo" @tap="edit" />
				<i class="iconfont icon-redo" data-method="redo" @tap="edit" />
				<i class="iconfont icon-img" data-method="insertImg" @tap="edit" />
				<i class="iconfont icon-video" data-method="insertVideo" @tap="edit" />
				<i class="iconfont icon-link" data-method="insertLink" @tap="edit" />
				<i class="iconfont icon-text" data-method="insertText" @tap="edit" />
				<i class="iconfont icon-clear" @tap="clear" />
				<i class="iconfont icon-save" @tap="showModal" data-target="viewModal" />
			</view>
			<view style="min-height: 100%;">
				<mp-html id="article" ref="article" container-style="padding:20rpx 32rpx 120rpx 32rpx" :content="postInfo.content" domain=""
					lazy-load scroll-table selectable :use-anchor="true" :tag-style="tagStyle" :editable="editable"
					@remove="remove" @load="load" @ready="ready" @imgtap="imgtap" @linktap="linktap" />
			</view>
		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">文章标题</view>
						<input placeholder="文章标题" name="input" v-model.trim="postInfo.title"></input>
					</view>
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							封面
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-if="postInfo.articleCover" @tap="viewImage(postInfo.articleCover)"
								:data-url="postInfo.articleCover">
								<image v-if="postInfo.articleCover" :src="postInfo.articleCover + '?imageView2/2/w/300'"
									mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="chooseImage" v-if="!postInfo.articleCover">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">活动时间</view>
						<picker mode="date" :value="postInfo.departureTime" @change="dateChange">
							<view class="picker">
								{{ postInfo.departureTime  | dateMonth }}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">出行地点</view>
						<input placeholder="请输入出行地点" name="input" v-model="postInfo.destinationPos"></input>
						<text class='cuIcon-locationfill text-orange'></text>
					</view>
					<view class="cu-form-group">
						<view class="title">风景级别</view>
						<view>
							<u-icon class="margin-left-sm" :name="postInfo.lanscapeLevel < uicon ? 'star' : 'star-fill'"
								v-for="uicon in [1,2,3,4,5]" :key="uicon" :size="uIconSize"
								:color="postInfo.lanscapeLevel < uicon ? '#aaa' : 'rgba(0, 67, 255, 0.5)'"
								@click="onLanscapeLevel(uicon)"></u-icon>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">活动难度</view>
						<view>
							<u-icon class="margin-left-sm" :name="postInfo.difficulty < uicon ? 'star' : 'star-fill'"
								v-for="uicon in [1,2,3,4,5]" :size="uIconSize" :key="uicon"
								:color="postInfo.difficulty < uicon ? '#aaa' : 'rgba(0, 67, 255, 0.5)'"
								@click="onDifficulty(uicon)"></u-icon>
						</view>
					</view>
					<view class="bg-white cu-bar u-border-top">
						<view class="action">活动状态</view>
					</view>
					<view class="bg-white padding-lr-sm flex justify-between padding-bottom-sm">
						<view class="cu-tag light sm round"
							:class="postInfo.status === index + 1 ? 'bg-blue': 'bg-grey'"
							v-for="(item, index) in postStatusText.filter(it => !!it)" :key="item"
							@tap="onStatus(index)">{{item }}</view>
					</view>
					<view class="cu-form-group u-border-top">
						<view class="title">置顶</view>
						<switch @change="switchTop" :class="postInfo.top?'checked':''"
							:checked="postInfo.top?true:false"></switch>
					</view>
				</form>

				<u-button :loading="saveLoading" shape="circle" size="small" :custom-style="customStyle"
					@click="save()">保存</u-button>
			</view>
		</scroll-view>

		<block v-if="modal">
			<view class="mask" />
			<view class="modal">
				<view class="modal_title">{{modal.title}}</view>
				<input class="modal_input" :value="modal.value" maxlength="-1" auto-focus @input="modalInput" />
				<view class="modal_foot">
					<view class="modal_button" @tap="modalCancel">取消</view>
					<view class="modal_button" style="color:#576b95;border-left: 1px solid rgba(0,0,0,.1)"
						@tap="modalConfirm">确定</view>
				</view>
			</view>
		</block>

		<view class="bg-masker-loading" v-show="showLoading" @touchmove.stop.prevent @touchmove.stop.prevent>
			<view class="bg-masker-loading-fixed loading flex align-center justify-center" @touchmove.stop.prevent
				@touchmove.stop.prevent>
				<u-loading color="#fff" mode="flower" :show="true" :size="loadingSize"></u-loading>
			</view>
		</view>
	</view>
</template>

<script>
	import mpHtml from '@/components/mp-html/mp-html'

	import {
		imgUpload,
		updatePost,
		addPost
	} from "@/apis/index.js"
	import dayjs from "dayjs"
	export default {
		name: 'page-post',
		computed: {
			uIconSize() {
				return uni.upx2px(60)
			},
			loadingSize() {
				return uni.upx2px(120)
			},
			showLoading() {
				return this.$store.state.loading
			},
		},
		filters: {
			dateMonth(value) {
				if (!value) {
					return ''
				}
				return dayjs(value).format("YYYY年MM月DD日")
			}
		},
		data() {
			let initPostInfo = {
				content: `<div><section></section></div>`,
				destinationPos: '', // "尼泊尔中北部6"
				difficulty: 5,
				lanscapeLevel: 5,
				departureTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
				status: 1,
				title: '', // "尼泊尔安娜普尔纳大环线6"
				top: 1, //
				articleCover: ''
			}
			return {
				customStyle: {
					height: uni.upx2px(72) + 'px',
					marginTop: uni.upx2px(60) + 'px',
					fontSize: uni.upx2px(28) + 'px',
					color: '#fff',
					background: 'linear-gradient(to right,#0081ff, #1cbbb4)'
				},
				saveLoading: false,
				postStatusText: ['隐藏', '报名中', '结束报名', '活动开始', '活动取消', '活动结束'],
				postStatusClass: ['bg-black', 'bg-green' /*报名中*/ , 'bg-purple' /*结束报名*/ , 'bg-blue' /*活动开始*/ , 'bg-red' /*活动取消*/ ,
					'bg-gray' /*活动结束*/
				],
				modalName: null,
				tagStyle: {
					table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
					th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
					li: 'margin: 5px 0;'
				},
				initPostInfo,
				modal: null,
				editable: true,
				scrollTop: 0,
				postInfo: {
					...initPostInfo
				}
			}
		},
		components: {
			mpHtml
		},
		// onPageScroll(e) {
		// 	this.scrollTop = e.scrollTop
		// },
		onLoad(options) {
			let initPostInfo = this.initPostInfo
			if (options.id) {
				let postInfo = this.$store.state.postInfo
				this.postInfo = Object.assign({}, initPostInfo, postInfo)
				console.log(this.postInfo)
			} else {
				this.postInfo = Object.assign({}, initPostInfo)
			}
			// this.$set(this.postInfo, 'content', this.postInfo.content)
		},
		onReady() {
			let that = this
			/**
			 * @description 设置获取链接的方法
			 * @param {String} type 链接的类型（img/video/audio/link）
			 * @param {String} value 修改链接时，这里会传入旧值
			 * @returns {Promise} 返回线上地址
			 *   type 为音视频时可以返回一个数组作为源地址
			 *   type 为 audio 时，可以返回一个 object，包含 src、name、author、poster 等字段
			 */
			this.$refs.article.getSrc = (type, value) => {
				return new Promise((resolve, reject) => {
					if (type === 'img') {
						uni.showActionSheet({
							itemList: ['本地选取', '远程链接'],
							success: res => {
								if (res.tapIndex === 0) {
									// 本地选取
									uni.chooseImage({
										count: value === undefined ? 9 :
										1, // 2.2.0 版本起插入图片时支持多张（修改图片链接时仅限一张）
										success: res => {
											that.$store.state.loading = true;;
											(async () => {
												const arr = []
												for (let item of res
														.tempFilePaths) {
													let publicUrl =
														await imgUpload(
															item)
													arr.push(publicUrl)
												}
												return arr
											})().then(res => {
												resolve(res)
											}).finally(() => {
												that.$store.state.loading =
													false
											})
										},
										fail: reject
									})
								} else {
									// 远程链接
									this.callback = {
										resolve,
										reject
									}
									this.$set(this, 'modal', {
										title: '图片链接',
										value
									})
								}
							}
						})
					} else {
						this.callback = {
							resolve,
							reject
						}
						let title
						if (type === 'video') {
							title = '视频链接'
						} else if (type === 'audio') {
							title = '音频链接'
						} else if (type === 'link') {
							title = '链接地址'
						}
						this.$set(this, 'modal', {
							title,
							value
						})
					}
				})
			}
		},
		methods: {
			onScrollHtml(e){
				let { scrollTop } = e.detail
				this.scrollTop = scrollTop
			},
			// 删除图片/视频/音频标签事件
			remove(e) {
				// 删除线上资源
			},
			// 处理模态框
			modalInput(e) {
				this.value = e.detail.value
			},
			modalConfirm() {
				let value = this.value || this.modal.value
				if (value) {
					if (/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
						.test(value)) {
						this.callback.resolve(value)
						this.$set(this, 'modal', null)
						return
					}
				}
				uni.showToast({
					title: "请输入正确的远程地址",
					icon: 'none'
				})
			},
			modalCancel() {
				this.callback.reject()
				this.$set(this, 'modal', null)
			},
			// 调用编辑器接口
			edit(e) {
				this.$refs.article[e.currentTarget.dataset.method]()
			},
			// 清空编辑器内容
			clear() {
				uni.showModal({
					title: '确认',
					content: '确定清空内容吗？',
					success: res => {
						if (res.confirm)
							this.$refs.article.clear()
					}
				})
			},
			// 保存编辑器内容
			save() {
				if (!this.postInfo.title) {
					uni.showToast({
						title: "请输入标题",
						icon: 'none'
					})
					return
				}
				if (!this.postInfo.articleCover) {
					uni.showToast({
						title: "请上传封面图",
						icon: 'none'
					})
					return
				} 
				if (!this.postInfo.destinationPos) {
					uni.showToast({
						title: "请输入出行地点",
						icon: 'none'
					})
					return
				}
				this.saveLoading = true
				this.$store.state.loading = true
				let content = this.$refs.article.getContent()
				let postInfo = {
					...this.postInfo,
					content
				}
				let requestApi = postInfo.id ? updatePost : addPost
				requestApi(postInfo).then(res => {
					this.hideModal()
					uni.showToast({
						title: "保存成功",
						icon: 'success'
					})
					if (postInfo.id) {
						this.$store.state.refreshPost = true
						this.$store.state.refreshPostDetail = true
					}
					this.postInfo = res.data
					this.$store.commit('setPostInfo', this.postInfo)
				}).finally(() => {
					this.saveLoading = false
					this.$store.state.loading = false
				})
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			viewImage(url) {
				uni.previewImage({
					urls: [url],
					current: 0
				});
			},
			dateChange(e) {
				this.$set(this.postInfo, 'departureTime', e.detail.value + " 00:00:00")
			},
			switchTop() {
				this.$set(this.postInfo, 'top', +!this.postInfo.top)
			},
			onDifficulty(i) {
				this.$set(this.postInfo, 'difficulty', i)
			},
			onLanscapeLevel(i) {
				this.$set(this.postInfo, 'lanscapeLevel', i)
			},
			onStatus(i) {
				this.$set(this.postInfo, 'status', i + 1)
			},
			delImg(e) {
				this.$set(this.postInfo, 'articleCover', '')
			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 从相册选择
					success: (res) => {
						that.$store.state.loading = true;;
						(async () => {
							let img = res.tempFilePaths[0]
							let publicUrl = await imgUpload(img)
							that.$set(that.postInfo, 'articleCover', publicUrl)
						})().then(res => {}).finally(() => {
							that.$store.state.loading = false
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		overflow: hidden;
		background-image: var(--gradualBlue);
		width: 100vw;

		input,
		textarea {
			box-sizing: content-box;
		}
	}

	.editor_toolbox {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 999;
		background-color: #EDEDED;
		display: flex;
		padding: 5px;
		box-sizing: border-box;
		line-height: 1.6;
	}

	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.iconfont {
		flex: 1;
		text-align: center;
		font-family: "iconfont" !important;
		font-size: 22px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-undo:before {
		content: "\e607";
	}

	.icon-redo:before {
		content: "\e606";
	}

	.icon-img:before {
		content: "\e6e2";
	}

	.icon-video:before {
		content: "\e798";
	}

	.icon-link:before {
		content: "\e60d";
	}

	.icon-text:before {
		content: "\e6ce";
	}

	.icon-clear:before {
		content: "\e637";
	}

	.icon-save:before {
		content: "\e501";
	}

	/* 模态框 */
	.modal {
		position: fixed;
		top: 50%;
		left: 16px;
		right: 16px;
		background-color: #fff;
		border-radius: 12px;
		transform: translateY(-50%);
	}

	.modal_title {
		padding: 32px 24px 16px;
		font-size: 17px;
		font-weight: 700;
		text-align: center;
	}

	.modal_input {
		display: block;
		padding: 5px;
		margin: 0 24px 32px 24px;
		font-size: 14px;
		border: 1px solid #dfe2e5;
	}

	.modal_foot {
		display: flex;
		line-height: 56px;
		font-weight: 700;
		border-top: 1px solid rgba(0, 0, 0, .1);
	}

	.modal_button {
		flex: 1;
		text-align: center;
	}

	/* 蒙版 */
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: black;
		opacity: 0.5;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 88vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		background-color: #f1f1f1;
		position: absolute;
		width: 88vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
