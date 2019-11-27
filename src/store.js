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
    //购物车信息
    shopcar:[
      {id:"1",
       shopname:"荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待",
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
        id:"1",
        name:"苹果",
        value:"Apple",
        list:[
          {
            phonename:"iPhone 11 Pro Max"
          }
        ]
      },
      {
        id:"2",
        name:"三星",
        value:"SamSung",
        list:[
          {
            phonename:"三星 NOTE10",
          }
        ]
      },
    ],
    //是否打开添加地址
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

  }
})
