// const baseUrl = 'https://erlvzihuwai.web3n.com/';
// const baseUrl = 'https://admin.elzhw.cn/api/';
const baseUrl = 'http://192.168.1.4:8001/';
import dayjs from "dayjs"
import store from "@/store"

// 节流
function throttle(fn, delay = 500) {
	let timer = null;
	return (...args) => {
		if (timer) {
			return;
		}
		fn(...args);
		timer = setTimeout(() => {
			timer = null;
		}, delay);
	}
}

// 授权提示框
const showAuthModal = throttle((message = null) => { 
	uni.showModal({
		title: '提示',
		content: message || "账号已过期，请重新登录",
		complete: (res) => {
			httpLogin()
		}
	})
})

function wxLogin() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				resolve(loginRes.code)
			},
			fail: err => {
				reject()
				uni.showToast({
					icon: 'error',
					title: "授权失败"
				})
			}
		})
	})
}

const getUserProfile = () => {
	return new Promise((resolve, reject) => {
		wx.getUserProfile({
			withCredentials: true,
			desc: '获取您的微信信息以授权小程序',
			lang: 'zh_CN',
			success: userProfileRes => {
				resolve(userProfileRes)
			},
			fail: err => {
				reject()
				uni.showToast({
					icon: 'error',
					title: "授权失败"
				})
			}
		});
	})
}


// 不带token请求
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'Authorization': store.state.token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Authorization': store.state.token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.onNetworkStatusChange(function(res) {
			if (!res.isConnected) {
				uni.showToast({
					title: '网络连接不可用！',
					icon: 'none'
				});
			}
			return false
		});
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1] && res[1].data && res[1].data.code == 1000) {
					resolve(res[1].data)
				} else {
					reject()
				}
				store.state.loading = false
			}
		).catch(
			(response) => {
				reject(response)
				store.state.loading = false
			}
		)
	})
	return promise
};

let httpPromise = null;
const httpLogin = () => {
	if (httpPromise) {
		return httpPromise
	}
	httpPromise = new Promise((resolve, reject) => {
		Promise.all([wxLogin(), getUserProfile()])
			.then(([code, userInfo]) => {
				uni.showLoading({
					title: "登录中"
				})
				httpRequest({
						url: 'applets-api/applets/open/login',
						method: 'post'
					}, {
						...userInfo,
						code: code
					}).then(res => {
						uni.$store.commit('setUserInfo', res.data)
						uni.$store.commit("setTokenMap", res.data)
						resolve()
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						});
					})
					.catch(e => {
						reject()
						uni.showToast({
							icon: 'error',
							title: "授权失败"
						})
					})
					.finally(() => {
						uni.hideLoading()
						uni.$store.state.loading = false
					})
			})
			.catch(() => {
				reject()
			})
	})
	setTimeout(() => { 
		httpPromise = null
	}, 500)
	return httpPromise
}


//带Token请求
const httpTokenRequest = (opts, data = {}) => {
	return new Promise(async (resolve, reject) => {
		let token = null
		try {
			token = await getToken();
		} catch (e) {
			showAuthModal("账号已过期，请重新登录")
			return reject()
		}
		if (token == '' || token == undefined || token == null) {
			await store.commit('setUserInfo', {})
			await store.commit('setTokenMap', {})
			await store.commit('setToken', '')
			showAuthModal("账号已过期，请重新登录")
			return reject()
		} else {
			let httpDefaultOpts = {
				url: baseUrl + opts.url,
				data: data,
				method: opts.method,
				header: opts.method == 'get' ? {
					'Authorization': token,
					'X-Requested-With': 'XMLHttpRequest',
					"Accept": "application/json",
					"Content-Type": "application/json; charset=UTF-8"
				} : {
					'Authorization': token,
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/json; charset=UTF-8'
				},
				dataType: 'json',
			}

			uni.onNetworkStatusChange(function(res) {
				if (!res.isConnected) {
					uni.showToast({
						title: '网络连接不可用！',
						icon: 'none'
					});
				}
				return false
			});
			uni.request(httpDefaultOpts).then(
				(res) => {
					if (res[1] && res[1].data && res[1].data.code == 1000) {
						resolve(res[1].data)
					} else {
						if (res[1].statusCode == 401) {
							store.commit('setToken', '')
							showAuthModal(res[1].data.message || '登录已过期')
						} else {
							uni.showToast({
								title: '' + res[1].data.message || "未知错误！",
								icon: 'none'
							})
						}
						store.state.loading = false
						reject(res[1])
					}
				}
			).catch(
				(response) => {
					store.state.loading = false
					reject(response)
				}
			)
		}
	})
};

export {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	httpLogin,
	showAuthModal
}
// 
function getToken() {
	return new Promise(async (resolve, reject) => {
		let token = await __getToken()
		if (!token) {
			resolve(token)
		} else if (token == 1) { // 可以刷新
			token = await __getRefreshToken()
		}
		resolve(token)
	})
}
// 获取 token
function __getToken() {
	let token = null
	token = store.state.token
	let tokenMap = uni.$store.state.tokenMap
	if (!tokenMap || !(tokenMap.expire > 0) || !tokenMap.refreshToken) {
		return null
	}
	// 时间戳（秒）
	if ((tokenMap.timestamp + tokenMap.expire - 300) > dayjs().unix()) {
		return token ? uni.$store.state.token : 1
	}
	return 1
}
// 刷新 token
function __getRefreshToken() {
	return new Promise((resolve) => {
		let tokenMap = uni.$store.state.tokenMap
		// 时间戳（秒）
		if ((tokenMap.timestamp + tokenMap.refreshExpire - 300) > dayjs().unix()) {
			httpRequest({
				url: `applets-api/applets/open/refreshToken?refreshToken=${tokenMap.refreshToken}`,
				method: "get",
			}).then(res => {
				store.commit('setTokenMap', res.data)
				resolve(res.data.token)
			}).catch(() => {
				resolve(null)
			})
		} else {
			resolve(null)
		}
	})
}

function __wxLogin() {
	return new Promise((resolve, reject) => {
		wxLogin().then(code => {
			httpRequest({
					url: 'applets-api/applets/open/loginBefore',
					method: 'post'
				}, {
					code: code
				}).then(res => {
					console.log(res)
					if (res.data.id) {
						uni.$store.commit('setUserInfo', res.data)
						uni.$store.commit("setTokenMap", res.data)
						resolve(res.data.token)
						return
					} else if (res.data.code) {
						return __wxGetUserInfo(res.data)
					}
				})
				.catch(e => {
					resolve(null)
				})
		}).catch(() => {
			resolve(null)
		})
	})
}

function __wxGetUserInfo(data) {
	return new Promise(async (resolve) => {
		uni.showModal({
			title: "微信授权登录",
			async success() {
				let userProfile = await getUserProfile()
				console.log('getUserProfile')
				httpRequest({
						url: 'applets-api/applets/open/login',
						method: 'post'
					}, {
						...userProfile,
						...data
					}).then(res => {
						uni.$store.commit('setUserInfo', res.data)
						uni.$store.commit("setTokenMap", res.data)
						resolve(res.data.token)
						uni.showToast({
							title: "登录成功",
							icon: 'none',
						})
					})
					.catch(e => {
						resolve(null)
					}).finayll(() => {
						uni.$store.state.loading = false
					})
			},
			fail() {
				resolve(null)
			}
		})

	})
}
