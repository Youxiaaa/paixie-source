import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dollarSign from './filters/dollarSignFilter'
import filterDate from './filters/filterDate'
import VideoBg from 'vue-videobg'
import VueTyperPlugin from 'vue-typer'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueNoty from 'vuejs-noty'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

import './bus'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('min', {
  validate (value, args) {
    return value.length >= args.length
  },
  params: ['length'],
  message: '輸入長度不夠'
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueTyperPlugin)
Vue.use(VueNoty)

Vue.component('video-bg', VideoBg)
Vue.component('Loading', Loading)

Vue.filter('dollarSign', dollarSign)
Vue.filter('filterDate', filterDate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`

    axios.post(api).then((res) => {
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/signin'
        })
      }
    })
  } else {
    next()
  }
})
