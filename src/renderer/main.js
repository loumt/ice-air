import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import store from './store'
import electron, {ipcRenderer} from 'electron'
import settings from 'electron-settings'
import ElementUI,{MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = true
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.$electron = Vue.prototype.$electron = electron
Vue.$ipcRenderer = Vue.prototype.$ipcRenderer = ipcRenderer
Vue.$setting = Vue.prototype.$setting = settings
Vue.$alert = Vue.prototype.$alert  =  MessageBox.alert
Vue.$confirm = Vue.prototype.$confirm  =  MessageBox.confirm
Vue.$prompt = Vue.prototype.$prompt  =  MessageBox.prompt
axios.defaults.baseURL = 'http://192.168.16.66:3020/api/client'
axios.defaults.withCredentials = true
axios.interceptors.response.use(res => res, err => {
    if(err.response.status === 401) {
        vm.$router.push('/login')
        // location.href = '/#/login'
    }
    return Promise.reject(err)
})
Vue.$http = Vue.prototype.$http = axios

const navLang = navigator.language
const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : false
const lang = window.localStorage.lang || localLang || 'zh-CN'

console.log('localLang :' + localLang)
console.log('lang:' + lang)

Vue.prototype.$bus = new Vue()

const i18n = new VueI18n({
    locale: lang,
    messages:{
        'zh-CN': require('./lang/zh-CN'),
        'en-US': require('./lang/en-US')
    }
})


new Vue({
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
}).$mount('#app')
