import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {request} from './network/request'
import ZkTable from 'vue-table-with-tree-grid'

Vue.prototype.request=request


Vue.config.productionTip = false

Vue.component('tree-table', ZkTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
