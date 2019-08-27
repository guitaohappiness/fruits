// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from '@/request/api'
import apily from '@/request/apily'
import AMap from 'vue-amap';

import { 
	LoadMore, XHeader, Swiper, SwiperItem, Tab, TabItem, LoadingPlugin, Toast,
	ToastPlugin, ConfirmPlugin, Confirm, XInput, Group, XButton, XAddress,
	Radio, XTextarea, XDialog, TransferDom, Spinner, Cell,
} from 'vux'

AMap.initAMapApiLoader({
      key: '0a3903e11c93a787c7215e3e98e7009c',
      plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.Geolocation'  ],
        // 默认高德 sdk 版本为 1.4.4
        v: '1.4.4'
});



Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AMap);
Vue.component('load-more',LoadMore)
Vue.component('x-header',XHeader)
Vue.component('swiper',Swiper)
Vue.component('swiper-item',SwiperItem)
Vue.component('tab',Tab)
Vue.component('tabItem',TabItem)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
Vue.component('x-input', XInput)
Vue.component('group',Group)
Vue.component('x-button',XButton)
Vue.component('x-address',XAddress)
Vue.component('radio',Radio)
Vue.component('x-textarea',XTextarea)
Vue.component('x-dialog', XDialog)
Vue.component('spinner', Spinner)
Vue.component('cell', Cell)
Vue.directive('transfer-dom', TransferDom)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$apily = apily
Vue.prototype.appVersion = '2.0.0';//每次版本更新请在这里重新赋值
Vue.prototype.$oid = 15;
Vue.prototype.baseUrl = "https://h5.dylm.kissneck.com/fruit"

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if(window.localStorage.getItem('uid')||window.localStorage.getItem('look')){ //判断本地是否存在uid或随意看看
            next();
	    }else {
	      	next({
	       		path:'/login'
	      	})
	    }
	}
	else {
    	next();
	}
	/*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
	if(to.fullPath == "/login"){
	    if(window.localStorage.getItem('uid')){
	      next({
	        path:'/index'
	      });
	    }else {
            next({
                path:'/login'
           })
	    }
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


