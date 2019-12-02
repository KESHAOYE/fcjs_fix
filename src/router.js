import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import fixfirst from './views/fix/fixfirst'
import fixsecond from './views/fix/fixsecond'
import fixthird from './views/fix/fixthird'
import search from './views/shop/search'
import shopdetail from './views/shop/shopdetail'
import personcenter from './components/person/personcenter'
import el from "element-ui"
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            component:home,
            name:"home",
            meta:{
                title: "首页-福城建设在线商城"
            }
        },
        {
            path:"*",
            redirect:"/",
             meta: {
                 title: "首页-福城建设在线商城"
             }
        },
        {
            path:"/register",
            name:'register',
            component:()=>import("./components/register.vue"),
             meta: {
                 title: "注册-福城建设在线商城"
             }
        },
        {
            path: "/fixfirst",
            name: 'fixfirst',
            component: fixfirst,
             meta: {
                 title: "维修-福城建设在线商城"
             }
        },
        {
            path: "/fixsecond",
            name: 'fixsecond',
            component: fixsecond,
            meta: {
                title: "维修-福城建设在线商城"
            }
        },
        {
            path: "/fixthird",
            name: 'fixthird',
            component: fixthird,
            meta: {
                title: "维修-福城建设在线商城"
            }
        },
        {
            path:"/search",
            name:"search",
            component:search
        },
        {
            path: "/shopdetail",
            name: "shopdetail",
            component: shopdetail
        },
        {
            path:"/shopcar",
            name:"shopcar",
            component:()=>import("./components/shopcar"),
            meta: {
                title: "我的购物车-福城建设在线商城"
            }
        },
        {
            path:"/fullinfo",
            name:"fullinfo",
            component:()=>import("./components/full_info"),
            
            beforeEnter(to,from,next){
                if(from.path!="/register"){
                     el.Message({
                         message:"您暂未注册，请先注册",
                         type:"error",
                         duration:3000
                     })
                     next({name:"register"})
                }else{
                next();
                }
            }
        },
        {
            path:"/more",
            name:"more",
            component:()=>import("./components/more")
        },
        {
            path:"/login",
            name:"login",
            component:()=>import("./components/login")
        },
        {
            path:"/getcoupon",
            name:"getcoupon",
            component:()=>import("./views/getcoupon")
        },
        {
            path:"/personcenter",
            name:"personcenter",
            component:personcenter,
            children:[
                {
                    path:"/",
                    name:"personhome",
                    component: () => import('./components/person/personhome')
                },
                {
                    path:"/myorder",
                    name:"myorder",
                    component:()=>import('./components/person/order/myorder'),
                    
                },
                {
                    path: "/orderdetail",
                    name: "orderdetail",
                    component:()=>import('./components/person/order/orderdetail')
                },
                {
                    path:"/coupon",
                    name:"coupon",
                    component:()=>import("./components/person/wallet/coupon")
                },
                {
                    path:"/balance",
                    name:"balance",
                    component:()=>import('./components/person/wallet/balance')
                },
                {
                    path:"/paymethod",
                    name:"paymethod",
                    component:()=>import("./components/person/wallet/paymethod")
                },
                {
                    name:"addbank",
                    path:"/addbank",
                    component:()=>import("./components/person/wallet/addbank")
                },
                {
                    name:"myinfo",
                    path:"/myinfo",
                    component:()=>import("./components/person/myaccount/myinfo")
                },
                {
                    name: "changepassword",
                    path: "/changepassword",
                    component: () => import("./components/person/myaccount/changepassword")
                },
                {
                    name: "addressmanage",
                    path: "/addressmanage",
                    component: () => import("./components/person/myaccount/addressmanage")
                }
            ]
        },
        {
            name:"ordersubmit",
            path:"/ordersubmit",
            component:()=>import("./components/person/ordersubmit")
        },
        {
            redirect: "/",
            path: "/"
        }
    ]
})