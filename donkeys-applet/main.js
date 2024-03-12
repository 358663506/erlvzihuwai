import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
uni.$store = store
// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom)

//裁剪正中部分，等比缩小生成200x200缩略图：
// ?imageView2/1/w/300/h/200

// 宽度固定为200px，高度等比缩小，生成200x133缩略图
// ?imageView2/2/w/300

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);
// 通过`console.log`打印的形式
console.log(uni.$u.config.v);

// 可以查阅uView的配置文件得知当前版本号，具体位置为：
console.log('uni.$u.config.v', uni.$u.config.v);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
