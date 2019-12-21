import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户登录信息
    loginToken:"",
    islogin:false,
    userinfo:[],
    usercoupon:[],
    brandinfo:[],
    fixmodel:[],
    //购物车信息
    shopcar:[
      {id:"1",
       shopname:"荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待",
       shoptype:"黑色",
       img:require("./assets/phone/iphone5s.png"),
       price:"100.00",
       count:"1",
       delete:false,
      },
      {id:"2",
       shopname:"test",
       img:require("./assets/phone/iphone5s.png"),
       price:"100.00",
       count:"1",
       delete:false
      },
      {id:"3",
       shopname:"test",
       img:require("./assets/phone/iphone5s.png"),
       price:"100.00",
       count:"1",
       delete:false
      },
    ],
    //订单信息
    order:[],
    //维修品牌机型信息
    fixmodel:[
      {
        name:'小米',
        value:'xiaomi'
      }
    ],
    //是否打开添加地址组件
    isopenaddress:false,
    //维修信息
    fixedmodel:[{
      selectphone:"",
      selectitems:{

      },
      totalprice:""
     }
    ]
  },
  //支付方式
  payinfo:[
    {
      payid:"0001",
      payname:"招商银行",
      payename:"zsbank",
      payid:"6222 1054 0948 5552"
    }
  ],
  getters:{
    countshopcarprice:state=>{
      let price=0;
      state.shopcar.forEach(element => {
         price=element.price*element.count+price;
      });
      return price;
    }
  },
  mutations: {
    ocaddress(state,value){
      state.isopenaddress=value;
    },
    changefixedmodel(state,value){
      state.fixedmodel=value
    }
  },
  actions: {
    getBrand (Store) {
       
    }
  }
})
