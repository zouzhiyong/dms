import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import ElementUI from 'element-ui'


//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
// import VueProgressBar from 'vue-progressbar'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)



// Vue.prototype.ExportJsonExcel = ExportJsonExcel;
// Vue.use(VueProgressBar, {
//     color: 'rgb(143, 255, 199)',
//     failedColor: 'red',
//     height: '2px'
// })

Vue.config.productionTip = false;


//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    // mode: 'history',
    saveScrollPosition: true,
    routes
})


//检测本地路由
let localRoutes = sessionStorage.routes;
if (localRoutes) {
    JSON.parse(localRoutes).map(item => {
        item.component = resolve => require([`./views/Home.vue`], resolve);
        item.children.map(_item => {
            _item.component = resolve =>
                require(["./views/" + _item.MenuPath + `.vue`], resolve);
        });
        router.options.routes.push(item);
    });

    router.addRoutes(router.options.routes);
}

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('routes');
        if (from.path == '/index') {
            location.reload();
        }
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('routes');
        next({ path: '/login' })
    } else {
        next()
    }
})

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



//router.afterEach(transition => {
//NProgress.done();
//});
//回车跳转v-enter=""
// Vue.directive('enter', {
//     bind: function(el, { value }, vnode) {
//         el.addEventListener("keydown", ev => {
//             el.addEventListener("keyup", ev => {
//                 if (ev.keyCode === 13) {
//                     let nextInput = vnode.context.$refs[value];
//                     if (nextInput) {
//                         if (nextInput[0] && typeof nextInput[0].focus === "function") {
//                             nextInput[0].focus();
//                             if (nextInput[0].$refs.input.$refs.input && typeof nextInput[0].$refs.input.$refs.input.select === "function") {
//                                 nextInput[0].$refs.input.$refs.input.select();
//                             }
//                         } else {
//                             nextInput.focus();
//                             if (nextInput.$refs.input && typeof nextInput.$refs.input.select === "function") {
//                                 nextInput.$refs.input.select();
//                             }
//                         }
//                     }
//                 }
//             });
//         });
//     }
// })


new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')