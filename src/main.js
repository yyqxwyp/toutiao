import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import './utils/dayjs'
// import { NavBar, Form, Field, Button, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Dialog, Tab, Tabs, List, Cell, PullRefresh, CellGroup, Popup, Search } from 'vant'

// Vue.use(Search)
// Vue.use(Popup)
// Vue.use(CellGroup)
// Vue.use(PullRefresh)
// Vue.use(Cell)
// Vue.use(List)
// Vue.use(Tab)
// Vue.use(Tabs)
// // 全局注册
// Vue.use(Dialog)
// Vue.use(Grid)
// Vue.use(GridItem)
// Vue.use(VanImage)
// Vue.use(Icon)

// Vue.use(Tabbar)
// Vue.use(TabbarItem)
// Vue.use(CountDown)
// Vue.use(Toast)
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(Field)
// Vue.use(NavBar)
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
