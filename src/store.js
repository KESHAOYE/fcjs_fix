import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //用户登录信息
        islogin: false,
        userinfo: [],
        usercoupon: [],
        brandinfo: [],
        sortList: [],
        //购物车信息
        shopcar: [],
        //订单信息
        order: [],
        //维修品牌机型信息
        fixmodel: [{
            name: '小米',
            value: 'xiaomi'
        }],
        //是否打开添加地址组件
        isopenaddress: false,
        //维修信息
        fixedmodel: [{
            selectphone: "",
            selectitems: {

            },
            totalprice: ""
        }]
    },
    //支付方式
    payinfo: [{
        payid: "0001",
        payname: "招商银行",
        payename: "zsbank",
        payid: "6222 1054 0948 5552"
    }],
    getters: {
        countshopcarprice: state => {
            let price = 0;
            state.shopcar.forEach(element => {
                price = element.per_price * element.count + price;
            });
            return price;
        }
    },
    mutations: {
        ocaddress(state, value) {
            state.isopenaddress = value;
        },
        changefixedmodel(state, value) {
            state.fixedmodel = value
        },
        changeUserInfo(state, value) {
            state.userinfo = value
            state.islogin = true
        },
        changesort(state,data){
            state.sortList = data
        },
        getshopcar(state,data){
            state.shopcar = data
        },
        addshopcar(state,data){
          let index = state.shopcar.findIndex(el=>{
            return el.shopid == data.shopid
          })
          if(index !=-1){
              if(state.shopcar[index].sku_id = data.sku_id){
                state.shopcar[index].count = parseInt(state.shopcar[index].count) + parseInt(data.count)
              }else{
                state.shopcar.push(data)
              }
          }else{
            state.shopcar.push(data)
          }
        },
        deleteshopcar(state,data){
          
        },
        outlogin(state) {
            state.userinfo = {}
            state.islogin = false
        }
    },
    actions: {
        getBrand(Store) {

        }
    }
})