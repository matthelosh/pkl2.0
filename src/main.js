import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import vueXlsxTable from 'vue-xlsx-table'
// import xlsx from 'js-xlsx'
import store from './store/index'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// import VueYouTubeEmbed from 'vue-youtube-embed'
// import VueMce from 'vue-mce'
// import Quill from 'quill'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import 'material-icons/css/material-icons.css'
import 'mdi/css/materialdesignicons.css'
import 'font-awesome/css/font-awesome.css'


// Vue.use(VueYouTubeEmbed)
Vue.use(Vuetify)
Vue.use(Vuex)
// Vue.use(vueXlsxTable, {rABS: false})
// Vue.use(VueMce)
// Vue.use(Quill)
// Vue.use(xlsx)
new Vue({
  el: '#app',
  store,
  router,
  store,
  render: h => h(App)
})
