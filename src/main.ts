import Vue from 'vue'
import App from './App.vue'

import router from './router'
import '@/router/Permission'

import store from './store'

import '@/assets/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
;(ElementUI.Drawer as any).props.wrapperClosable.default = false
;(ElementUI.DatePicker as any).props.valueFormat = {
  default: 'yyyy-MM-dd HH:mm:ss'
}

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
