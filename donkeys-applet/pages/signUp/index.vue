<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报名管理</block>
		</cu-custom>
		<view class="nav-header bg-white" :style="{top: customBar + 'px'}">
			<u-form
				labelPosition="top"
				:rules="rules"
				:model="userInfo"
				 ref="uForm"
				labelWidth="75px"
			>
			<u-form-item
				label="微信昵称"
				prop="name"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.name"
					></u-input>
			</u-form-item>
			<u-form-item
				label="手机号"
				prop="mobile"
				borderBottom
				ref="item1"
			>
				<u-input
					v-model="userInfo.mobile"
					
				></u-input>
			</u-form-item>
			<u-form-item
				label="集合地点"
				prop="enroll_muster_address_id"
				borderBottom
				ref="item1"
			>
				<u-input v-model="userInfo.enroll_muster_address_id" type="select" @click="show = true" />
				<!-- <u-radio-group
					v-model="userInfo.enroll_muster_address_id"
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
				  </u-radio-group> -->
			</u-form-item>
			<u-form-item
				label="是否自驾"
				prop="driver_flg"
				borderBottom
				ref="item1"
			>
				<u-radio-group
					v-model="userInfo.driver_flg"
					placement="column"
				  >
					<u-radio
					  :customStyle="{marginBottom: '8px'}"
					  v-for="(item, index) in radiolist3"
					  :key="item.name"
					  :label="item.name"
					  :name="item.name"
					>
					{{ item.name }}
					</u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
				label="自驾出发地址"
				prop="driver_address"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.driver_address"
					
					></u-input>
			</u-form-item>
			<u-form-item
				label="是否委托组织购买"
				prop="isgm"
				borderBottom
				class="isgm"
				ref="item1">
				<view class="ticp">(需要买保险的填姓名、身份证)</view>
				<u-radio-group
					v-model="userInfo.isgm"
					placement="column"
				  >
					<u-radio
					  :customStyle="{marginBottom: '8px'}"
					  v-for="(item, index) in radiolist5"
					  :key="index"
					  :label="item.label"
					  :name="item.value"
					>
					{{ item.label }}
					</u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
				v-if="userInfo.isgm !== 1"
				label="保险单号"
				prop="policy_no"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.policy_no"
					
					></u-input>
			</u-form-item>
			<u-form-item
				v-if="userInfo.isgm !== 1"
				label="保险照片"
				prop="policy_img"
				borderBottom
				ref="item1">
				<u-upload :action="action" :max-size="10 * 1024 * 1024" max-count="1" :limitType="['png', 'jpg', 'jpeg', 'webp', 'gif']" :file-list="fileList" ></u-upload>
			</u-form-item>
			
			<u-form-item
				v-if="userInfo.isgm === 1"
				label="姓名"
				prop="real_name"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.real_name"
					
					></u-input>
			</u-form-item>
			<u-form-item
			v-if="userInfo.isgm === 1"
				label="身份证号"
				prop="Id_card"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.Id_card"
					
					></u-input>
			</u-form-item>
			<u-form-item
					label="性别"
					prop="sex"
					borderBottom
					ref="item1"
			>
				<u-radio-group
					v-model="userInfo.sex"
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
			
			<u-form-item
					label="是否愿意吃晚餐"
					prop="dinner_lfg"
					borderBottom
					ref="item1"
			>
				<u-radio-group
					v-model="userInfo.dinner_lfg"
					placement="column"
				  >
					<u-radio
					  :customStyle="{marginBottom: '8px'}"
					  v-for="(item, index) in radiolist4"
					  :key="index"
					  :label="item.label"
					  :name="item.value"
					>
					{{ item.label }}
					</u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
				label="紧急联系人名"
				prop="emergency_contact"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.emergency_contact"
					
					></u-input>
			</u-form-item>
			<u-form-item
				label="紧急联系人手机号"
				prop="emergency_contact_mobile"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.emergency_contact_mobile"
					
					></u-input>
			</u-form-item>
		</u-form>
				<u-button v-if="userInfo.state === 1" @click="submit(0)">退出</u-button>
				<u-button v-else @click="submit(1)">参加</u-button>
		</view>
		<u-select v-model="show"  @confirm="confirm" :list="radiolist2"></u-select>
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
				show: false,
				fileList: [],
				showSex: false,
				action: 'https://admin.elzhw.cn/api/',
				userInfo: {
						id: '',
						enroll_id: '', // 报名活动关联ID
						name: '', // 微信名称
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
						state: 0,
						isgm: 1
					},
				 // 性别
				radiolist1: [
					{
						name: '男'
					},
					{
						name: '女'
					}
				],
				// 集合点
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
				// 是否自驾
				radiolist3: [
					{
						name: '是'
					},
					{
						name: '否'
					}
				],
				// 是否吃晚餐
				radiolist4: [
					{
						label: '吃',
						value: 0
					},
					{
						label: '不吃',
						value: 1
					},
					{
						label: '都可以',
						value: 2
					}
				],
				// 是否需要购买保险
				radiolist5: [
					{
						label: '需要',
						value: 1
					},
					{
						label: '不需要',
						value: 2
					}
				],
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: ['blur', 'change']
						}
					]
				},
				radio: '',
				switchVal: false
			}
		},
		onLoad() {
			// this.$store.state.loading = true
		},

		methods: {
			confirm (e) {
				console.log(e)
				this.userInfo.enroll_muster_address_id = e[0].label
			},
			submit (e) {
				console.log(e)
				this.$refs.uForm.validate(valid => {
								if (valid) {
									console.log('验证通过');
								} else {
									console.log('验证失败');
								}
							});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.contaier {
		height: 100%;
	}

	.nav-header {
		border-bottom: 1px solid #gray;
		padding: 0 20upx 20upx;
		left: 0;
		width: 100%;
		z-index: 99;

	}
	.isgm {
		position: relative;
	}
	.ticp {
		color: red;
		font-size: 24upx;
		position: absolute;
		top: 12%;
		left: 34%;
	}


	
</style>
