<template>
	<view class="flex flex-column contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报名管理</block>
		</cu-custom>
		<view class="nav-header bg-white" v-if="showForm" :style="{top: customBar + 'px'}">
			<u-form
				labelPosition="left"
				:model="userInfo"
				 ref="uForm"
				 :required="true" 
				 labelAlign="left"
				labelWidth="47%"
			>
			<u-form-item
				label="微信昵称"
				prop="name"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.name"
					type="nickname"
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
				<u-input v-model="userInfo.enroll_muster_address_name" type="select" @click="show = true" />
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
					  v-for="(item) in radiolist3"
					  :key="item.value"
					  :label="item.label"
					  :name="item.value"
					>
					{{ item.label }}
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
				prop="policy_flg"
				borderBottom
				class="policy_flg"
				ref="item1">
				<view class="ticp">(需要买保险的填姓名、身份证)</view>
				<u-radio-group
					v-model="userInfo.policy_flg"
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
				v-if="userInfo.policy_flg !== 1"
				label="保险单号"
				prop="policy_no"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.policy_no"
					
					></u-input>
			</u-form-item>
			<!-- <u-form-item
				v-if="userInfo.policy_flg !== 1"
				label="保险照片"
				prop="policy_img"
				borderBottom
				ref="item1">
				<u-upload  :before-upload="beforeUpload"   :max-size="10 * 1024 * 1024" max-count="1" :limitType="['png', 'jpg', 'jpeg', 'webp', 'gif']" :file-list="fileList" ></u-upload>
			</u-form-item> -->
			
			<u-form-item
				v-if="userInfo.policy_flg === 1"
				label="姓名"
				prop="real_name"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.real_name"
					
					></u-input>
			</u-form-item>
			<u-form-item
			v-if="userInfo.policy_flg === 1"
				label="身份证号"
				prop="id_card"
				borderBottom
				ref="item1">
				<u-input
					v-model="userInfo.id_card"
					
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
				
				<view class="btnsJoin" v-if="!userInfo.id">
					<u-button class="btn"   @click="submit('join')">参加</u-button>
				</view>
				<view class="btns" v-else>
					<u-button class="btn" type="primary"  @click="submit('update')">修改</u-button>
					<u-button class="btn" type="error" v-if="userInfo.status === 0" @click="quit(0)">下车</u-button>
					<u-button class="btn" type="primary" v-else @click="quit(1)">上车</u-button>
				</view>
		</view>
		<u-select v-model="show"  @confirm="confirm" :list="radiolist2"></u-select>
		<view class="bg-masker-loading" v-show="showLoading" @touchmove.stop.prevent @touchmove.stop.prevent>
			<view class="bg-masker-loading-fixed loading flex align-center justify-center" @touchmove.stop.prevent
				@touchmove.stop.prevent>
				<u-loading color="#fff" mode="flower" :show="true" :size="loadingSize"></u-loading>
			</view>
		</view>
	<!-- 	<view v-if="showPrivacy">
		  <view>隐私弹窗内容....</view>
		  <button bindtap="handleOpenPrivacyContract">查看隐私协议</button>
		  <button id="agree-btn" open-type="agreePrivacyAuthorization" bindagreeprivacyauthorization="handleAgreePrivacyAuthorization">同意</button>
		</view> -->
	</view>
</template>

<script>
	import {
		signUpAdd,
		getByEnrollId,
		postStatus,
		signUpAddUpdate,
		musterAdressPage
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
			showLoading() {
				return this.$store.state.loading
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
				showPrivacy: false,
				fileList: [],
				showSex: false,
				userInfo: {
						id: '',
						enroll_id: '', // 报名活动关联ID
						name: uni.$store.state.userInfo.nickName, // 微信名称
						mobile: '', // 手机号
						enroll_muster_address_id: '', // 集合地点ID
						driver_flg: 1, // 是否自驾
						driver_address: '', // 自驾出发地址
						real_name: '', // 真实姓名
						id_card: '', // 身份证号
						policy_no: '', // 保险单号
						policy_img: '', // 保险照片
						dinner_lfg: '0', // 是否愿意吃晚餐0，吃，1:不吃，2都可以
						emergency_contact: '', // 紧急联系人名
						emergency_contact_mobile: '', // 紧急联系人手机号
						openid: uni.$store.state.userInfo.openId, // 小程序openlD
						unionid: uni.$store.state.userInfo.unionId, // 小程序unionid
						status: 0, // 0:参加，1:退出
						create_time: '', // 创建时间
						sex: '男',
						enroll_muster_address_name: '',
						policy_flg: 1
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
						label: '世纪大道12号口(上午7点30)',
						value: 1
					},
					{
						label: '七宝地铁5号口(上午8点10分)',
						value: 2
					},
					{
						label: '宜山路5号口(上午7点)',
						value: 3
					}
				],
				// 是否自驾
				radiolist3: [
					{
						label: '是',
						value: 1
					},
					{
						label: '否',
						value: 0
					}
				],
				// 是否吃晚餐
				radiolist4: [
					{
						label: '吃',
						value: '0'
					},
					{
						label: '不吃',
						value: '1'
					},
					{
						label: '都可以',
						value: '2'
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
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					}
				],
				mobile: [
					{ 
						required: true, 
						message: '请输入手机号', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					},
					{
			// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '请输入正确的手机号',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					},
					// {
					// 	type: 'regexp',
					// 	pattern: /^1[34578]\d{9}/,
					// 	message: '请输入正确的手机号',
					// 	trigger: ['change','blur'],
					// }
				],
				driver_address: [
					{
			// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							if (this.userInfo.driver_flg !== 1) {
								return true
							} else {
								return !!value.trim()
							}
						},
						message: '请输入自驾出发地址',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
				],
				id_card: [
					{
						validator: (rule, value, callback) => {
							if (this.userInfo.policy_flg !== 1) {
								return true
							} else {
								return !!value.trim()
							}
						},
						message: '请输入身份证号',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					},
				],
				real_name: [
					{
						validator: (rule, value, callback) => {
							if (this.userInfo.policy_flg !== 1) {
								return true
							} else {
								return !!value.trim()
							}
						},
						message: '请输入真实姓名',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					},
				],
				},
				radio: '',
				switchVal: false,
				showForm: false
			}
		},
		onLoad(options) {
	
			console.log(this.$route, options)
			this.userInfo.enroll_id = options.id
			this.radiolist2 = JSON.parse(options.addressList).map(item => {
				return {
					value: item.id,
					label: item.name + '' + item.muster_time,
				}
			})
			this.getInfo()
			// this.$store.state.loading = true
		},
		mounted () {
			console.log(new Date() * 1 , new Date('2024/3/22 08:00:00') * 1)
			if (new Date() * 1 > new Date('2024/3/22 08:00:00') * 1) {
				this.showForm = true
			}
			const that = this
			setTimeout(() => {
				that.$nextTick(() => {
				if (that.showForm) {
					that.$refs.uForm.setRules(this.rules);  
				}
				
			});  
			}, 500)
			
		},
		onReady() {
			// const that = this
			// setTimeout(() => {
			// 	that.$nextTick(() => {
			// 	if (that.showForm) {
			// 		that.$refs.uForm.setRules(this.rules);  
			// 	}
				
			// });  
			// }, 500)
		},
		methods: {
			async beforeUpload (index, list) {
				console.log(index, list);
			},
			async getInfo () {
				this.$store.state.loading = true
				try {
					const res = await getByEnrollId({ enrollId: this.userInfo.enroll_id, openId: uni.$store.state.userInfo.openId })
				for (const i in this.userInfo) {
					if (i === 'enroll_muster_address_name') {
						this.userInfo[i] = this.radiolist2.filter(item => item.value === res.data['enroll_muster_address_id'])[0].label 
					} else {
						this.userInfo[i] = res.data[i]
					}
					setTimeout(() => {
						this.$store.state.loading = false
					}, 500)
				}
				} catch (error) {
					setTimeout(() => {
						this.$store.state.loading = false
					}, 500)
				} 
			},
			confirm (e) {
				console.log(e)
				this.userInfo.enroll_muster_address_id = e[0].value
				this.userInfo.enroll_muster_address_name = e[0].label
			},
			submit (e) {
				console.log(e, uni.$store.state.userInfo)
				this.$refs.uForm.validate(async valid => {
					console.log(valid)
								if (valid) {
									const data = {
										...this.userInfo
									}
									this.$store.state.loading = true
									if ( e === 'join') {
										delete data.id
									}
									const res = e === 'join' ? await signUpAdd(data) : await signUpAddUpdate(data)
									this.$store.state.loading = false
									if (res.code === 1000 ) {
										uni.showToast({
											title:  e === 'join' ? "新增成功" : '修改成功',
											icon: 'none',
										})
										this.getInfo()
									}
								} else {
									console.log('验证失败');
								}
							});
			},
			async quit (index) {
				const res = await postStatus({ id: this.userInfo.id })
				this.$store.state.loading = false
				if (res.code === 1000) {
					uni.showToast({
						title: index === 0 ? '下车成功' :  "上车成功",
						icon: 'none',
					})
					this.getInfo()
				}
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
		padding-bottom: 120upx;
		box-sizing: border-box;
	}

	.nav-header {
		border-bottom: 1px solid #gray;
		padding: 0 20upx 20upx;
		left: 0;
		width: 100%;
		z-index: 99;

	}
	.policy_flg {
		position: relative;
	}
	.ticp {
		color: red;
		font-size: 24upx;
		position: absolute;
		top: 45%;
		left: 0%;
	}
	.btns {
		.btn {
			width: 48%;
		}
	}
	.btnsJoin {
		.btn {
			width: 100%;
		}
	}
	.btnsJoin,.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 120upx;
		position: fixed;
		padding: 0upx 20upx;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 9;
		border-top: 1px solid #ccc;
	}
	
</style>
