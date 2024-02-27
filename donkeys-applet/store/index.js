import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from "dayjs"
import {
	httpLogin
} from "@/common/request.js"
Vue.use(Vuex)
const  getStoreObj = (key) => {
	let obj = null
	try{
		obj = uni.getStorageSync(key)
		if(obj){
			obj = JSON.parse(obj)
		}
	} catch(e){
		//TODO handle the exception
	}
	return obj || {}
}
const store = new Vuex.Store({
    state: {
		token: uni.getStorageSync('token') || '',
		userInfo: getStoreObj('userInfo'),
		PageCur: __checkePageName(uni.getStorageSync('PageCur')), // index 首页| medias 照片墙 | me 个人中心,
		postInfo: getStoreObj('postInfo'),
		refreshPost: false, // 文章改动后需要刷新
		refreshPostDetail: false, // 文章改动后需要刷新
		loading: false, // 页面 loading
		tokenMap: getStoreObj('tokenMap'),
		isLoginPage: false, // 是否显示登录页面
	},
    mutations: {
		setUserInfo(state, userInfo){
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		setPageCur(state, pageName){
			pageName = __checkePageName(pageName)
			state.PageCur = pageName
			uni.setStorageSync('PageCur', pageName)
		},
		setPostInfo(state, postInfo){
			state.postInfo = postInfo
			uni.setStorageSync('postInfo', JSON.stringify(postInfo))
		},
		setTokenMap(state, userInfo){
			state.tokenMap = {
				refreshExpire: userInfo.refreshExpire,
				refreshToken: userInfo.refreshToken,
				expire: userInfo.expire,
				token: userInfo.token,
				timestamp: dayjs().unix()
			}
			state.token = userInfo.token
			uni.setStorageSync('token', userInfo.token)
			uni.setStorageSync('tokenMap', JSON.stringify(state.tokenMap))
		},
		setToken(state, token){
			state.token = token
			uni.setStorageSync('token', token)
		},
		setLoading(state, status){
			state.loading = status
		},
		setLoginPage(state, status) { 
			state.isLoginPage = status
		}
	},
	actions: {
		wxLogin(context, type = 'http') {
			if (type === 'http') {
				context.commit('setLoginPage', true)
				return Promise.resolve()
			} else { 
				return httpLogin()
			}
		}
	}
})
export default store

function __checkePageName(pageName){
	if(['index', 'medias', 'me'].indexOf(pageName) == -1){
		pageName = 'index'
	}
	return pageName
}