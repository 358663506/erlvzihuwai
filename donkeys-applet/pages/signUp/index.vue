<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报名管理</block>
		</cu-custom>
		<view class="nav-header bg-white" :style="{top: customBar + 'px'}">
			<u-form
				labelPosition="top"
				:model="model1"
				:rules="rules"
				labelWidth="75px"
				ref="uForm"
		>
			<u-form-item
				label="微信昵称"
				prop="userInfo.name"
				borderBottom
				ref="item1">
				<u-input
					v-model="model1.userInfo.name"
					border="none"
					></u-input>
			</u-form-item>
			<u-form-item
				label="手机号"
				prop="userInfo.mobile"
				borderBottom
				ref="item1"
			>
				<u-input
					v-model="model1.userInfo.mobile"
					border="none"
				></u-input>
			</u-form-item>
			<u-form-item
				label="集合地点"
				prop="userInfo.enroll_muster_address_id"
				borderBottom
				ref="item1"
			>
				<u-radio-group
					v-model="model1.userInfo.enroll_muster_address_id"
					placement="column"
				  >
					<u-radio
					  :customStyle="{marginBottom: '8px'}"
					  v-for="(item, index) in radiolist2"
					  :key="item.value"
					  :label="item.label"
					  :name="item.value"
					>
					{{ item.label }}
					</u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
					label="性别"
					prop="userInfo.sex"
					borderBottom
					ref="item1"
			>
				<u-radio-group
					v-model="model1.userInfo.sex"
					placement="column"
				  >
					<u-radio
					  :customStyle="{marginBottom: '8px'}"
					  v-for="(item, index) in radiolist1"
					  :key="index"
					  :label="item.name"
					  :name="item.name"
					>
					{{ item.name }}
					</u-radio>
				  </u-radio-group>
			</u-form-item>
		</u-form>
		</view>
		<view class="station-list">
		
		</view>
	</view>
</template>

<script>
	import {
		searchApi
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
			searchDataSort(){
				this.search()
			}
		},
		data() {
			return {
				showSex: false,
				model1: {
					userInfo: {
						id: '',
						enroll_id: '', // 报名活动关联ID
						name: 'uView UI', // 微信名称
						mobile: '', // 手机号
						enroll_muster_address_id: '', // 集合地点ID
						driver_flg: '', // 是否自驾
						driver_address: '', // 自驾出发地址
						real_name: '', // 真实姓名
						Id_card: '', // 身份证号
						policy_no: '', // 保险单号
						policy_img: '', // 保险照片
						dinner_lfg: '', // 是否愿意吃晚餐0，吃，1:不吃，2都可以
						emergency_contact: '', // 紧急联系人名
						emergency_contact_mobile: '', // 紧急联系人手机号
						openid: '', // 小程序openlD
						unionid: '', // 小程序unionid
						state: '', // 0:参加，1:退出
						create_time: '', // 创建时间
						sex: '男',
					},
				},
				radiolist1: [
					{
						name: '男'
					},
					{
						name: '女'
					}
				],
				radiolist2: [
					{
						label: '世纪大道',
						value: 1
					},
					{
						label: '七宝',
						value: 2
					},
					{
						label: '宜山路',
						value: 3
					}
				],
				actions: [{
					name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			}
		},
		onLoad() {
			this.$store.state.loading = true
			this.searchApi()
		},

		methods: {
			addRandomData(list) {
				for (let i = 0; i < list.length; i++) {
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(list[i]))
					item.__id = this.$u.guid();
					item.departureTime = item.departureTime ? dayjs(item.departureTime).format("YYYY年MM月DD日") : ''
					this.list.push(item);
				}
			},
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
			tabClick(value){
				this.searchData.type = value
				this.search()
			},
			search() {
				this.$refs.uWaterfall.clear()
				this.$store.state.loading = true
				this.scrollTop = this.scrollTop == 0 ?  -1 : 0
				this.list = []
				this.searchData.page = 1
				this.searchData.size = 10,
				this.searchApi()
			},
			onLoadMore() {
				this.searchApi({
					...this.searchData,
					page: this.isLoadErr ? this.searchData.page : (this.searchData.page + 1)
				})
			},
			searchApi(searchData = this.searchData) {
				this.loadStatus = 'loading'
				console.log(searchData)
				searchApi(searchData).then(res => {
						this.isLoadErr = false
						let list = res.data.list
						this.addRandomData(list)
						this.searchData = {
							...searchData
						}
						this.total = res.data.pagination.total || 0
						console.log(this.total)
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
		padding: 0 20upx 20upx;
		position: fixed;
		left: 0;
		width: 100%;
		height: 180upx;
		z-index: 99;

	}


	.imageInfo{
		position: absolute;
		bottom: 0;
		left: 0;
		white-space: nowrap;
		line-height: 32rpx;
		padding: 10rpx 20rpx;
		color: #fff;
		background: linear-gradient(to top, #0081ff, rgba(28, 187,180, 0.01));
		&.postInfo{
			background: linear-gradient(to top, rgba(28, 187,180, 1), rgba(0,129,255, 0.01));
		}
	}
</style>
