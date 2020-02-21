<template>
    <div class="ordersubmit">
        <personbar />
        <headers />
        <div class="content">
            <div class="person_head">
                <span>订单结算</span>
            </div>
            <myaddress @orderaddress="changeaddress" :addressid="orderinfo.addressid" />
            <div class="pay_methods">
                <div class="title">
                    <span>请选择付款方式</span>
                    <hr>
                </div>
                <div class="pay_content">
                    <div class="pay_item"
                        :class="[{active:ischoosebank(p)},{alipay:p.receive_ename=='alipay'},{zsbank:p.receive_ename=='zsbank'},{nybank:p.receive_ename=='nybank'},{wechat:p.receive_ename=='wechat'},{jsbank:p.receive_ename=='jsbank'}]"
                        v-for="(p,index) in userpay" :key="index" @click="choosebank(p)">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="p.receive_logo"></use>
                        </svg>
                        <span>{{p.paym_cid|account}}</span>
                    </div>
                </div>
            </div>
            <div class="pay_methods">
                <div class="title">
                    <span>请选择优惠券</span>
                    <hr>
                </div>
                <div class="pay_content">
                    <div class="coupon_item" :class="{active: ischoosecoupon(p)}" @click='choosecoupon(p)'
                        v-for="(p,index) in couponList" :key="index">
                        <span>满{{p.min_price}}减{{p.amount}}</span>
                        <span class="date">有效期至:{{p.over_time|date}}</span>
                    </div>
                </div>
            </div>
            <div class="shoplist">
                <div class="title">
                    <span>订单清单</span>
                    <hr>
                </div>
                <div class="shoplist_content">
                    <div class="shoplist_items" v-for='(item,index) in shopList' :key="index">
                        <el-image style="width:90px;height:90px;" :src='item.path'></el-image>
                        <div class="shop_info">
                            <span class="shop_name">{{item.shopname}}</span>
                            <div class="shop_choose">
                                <span class="specs">{{item.sku|sku}}</span>
                            </div>
                        </div>
                        <div class="shop_price">
                            <span class="price">{{item.price}}</span>
                        </div>
                        <div class="shop_count">
                            <span class="scount">{{item.count}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="confirm">
                <div class="title">
                    <span>确认信息</span>
                    <hr>
                </div>
                <div class="confirm_content">
                    <div class="confirm_item">收货人:{{addressinfo.name}}</div>
                    <div class="confirm_item">收货地址:{{addressinfo.str}}{{addressinfo.address}}</div>
                    <div class="confirm_item">收货电话:{{addressinfo.phone}}</div>
                    <div class="confirm_item">订单类型:{{orderinfo.order_type|orderstate}}</div>
                    <div class="confirm_item">付款信息:{{payinfo.receive_name}} {{payinfo.paym_cid}}</div>
                </div>
            </div>
            <div class="confirm_info">
               <div class="price">
                   <span class="coupon_price" v-if='orderinfo.coupon_price > 0'>优惠: - ￥{{orderinfo.coupon_price}} </span>
                   <span class="order_price">总价:￥{{orderinfo.order_price - orderinfo.coupon_price}}</span>
               </div>
               <div class="button" @click='pays()'>
                   去付款
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myaddress from '../myaddress'
    import {
        getordershop,
        getordercoupon,
        getuserreceive,
        pay
    } from '@/http/api'
    import {
        orderstate
    } from '@/utils/filters'
    export default {
        data() {
            return {
                orderinfo: {
                    order_id: this.$route.query.orderid,
                    order_price: 0,
                    address_id: "",
                    coupon_id: '',
                    order_type: "",
                    coupon_price: 0,
                    payid: ''
                },
                userpay: [],
                addressinfo: {

                },
                payinfo:'',
                couponList: [],
                shopList: [],
                load:''
            }
        },
        computed: {
            ischoosebank(val) {
                return function (val) {
                    return this.orderinfo.payid == val.paym_id
                }
            },
            ischoosecoupon(val) {
                return function (val) {
                    return this.orderinfo.coupon_id == val.coupon_id
                }
            }
        },
        filters: {
            sku(val) {
                val = val.replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
                return val
            },
            date(val) {
                let reg = new RegExp(/^\d+-\d+-\d+/)
                return reg.exec(val)[0]
            },
            payinfo(val){
                if(!val == ''){
                  let index = this.userpay(el=>{
                      return el
                  })
                }
                return val == ''? '未选择' : ''
         }
        },
        components: {
            myaddress
        },
        methods: {
            changeaddress(data) {
                this.addressinfo = data;
                this.orderinfo.address_id = data.addressid 
            },
            choosecoupon(data) {
                this.orderinfo.coupon_id = data.coupon_id
                this.orderinfo.coupon_price = data.amount
            },
            choosebank(data) {
                this.orderinfo.payid = data.paym_id
                this.payinfo = data
            },
            countPrice(){
              this.shopList.forEach(el => {
                this.orderinfo.order_price = parseInt(this.orderinfo.order_price) + parseInt(el.price)
              })
            },
            pays(){
                this.load = this.$loading({
                    lock: true,
                    text: '付款中..',
                })
                pay({user_id: this.$store.state.userinfo.userid,...this.orderinfo})
                .then(data=>{
                    setTimeout(()=>{
                        this.load.close()
                        this.$router.push({name: 'myorder'})
                    },1000)
                })
            },
            getordershops() {
                getordershop({
                        orderid: this.$route.query.orderid
                    })
                    .then(data => {
                        this.shopList = data.info
                        this.countPrice()
                    })
            },
            getpay(){
              getuserreceive({userid: this.$store.state.userinfo.userid})
              .then(data=>{
                  if(data.code == 200){
                    this.userpay = data.info
                  }
              })
            },
            getordercoupons() {
                getordercoupon({
                        userid: this.$store.state.userinfo.userid,
                        orderid: this.$route.query.orderid
                    })
                    .then(data => {
                        this.couponList = data.info
                    })
            }
        },
        mounted() {
            this.orderinfo.order_type = this.$route.query.type
            setTimeout(()=>{
              this.getordershops()
              this.getordercoupons()
              this.getpay()
            },0)
        },
    }
</script>

<style lang="scss" scoped>
    .content {
        .person_head {
            width: 100%;
            height: 50px;
            background: white;
            text-align: left;
            line-height: 50px;
            margin-top: 20px;
            border-radius: 5px;
            font-size: 1.3em;
            font-family: "等线";
            font-weight: bolder;
            border: 1px solid #d2d2d2;

            span {
                margin-left: 25px;
            }
        }

        .pay_methods {
            width: 100%;
            min-height: 100px;
            background: #fff;
            margin-top: 25px;
            padding-bottom: 25px;

            .title {
                width: 95%;
            }
        }

        .pay_content {
            width: calc(100% - 80px);
            min-height: 0px;
            background: #fff;
            margin-top: 5px;
            display: flex;
            padding: 0 40px;
            flex-flow: row wrap;

            @keyframes bigcard {
                0% {
                    transform: scale(1);
                    top: 0;
                }

                50% {
                    transform: scale(1);
                    top: -1px;
                }

                100% {
                    transform: scale(1.05);
                    top: -2px;
                }
            }

            .active:before {
                content: '已选';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: '幼圆';
                font-weight: bolder;
            }

            .coupon_item:hover,
            .pay_item:hover {
                animation: .1s bigcard linear;
                transform: scale(1.05);
                top: -2px;

                .close {
                    display: block;
                    transition: .2s;
                }
            }

            .coupon_item,
            .pay_item {
                min-width: 180px;
                height: 110px;
                padding: 0 10px;
                border: .0625rem solid #d5d5d5;
                margin-left: 1.25rem;
                margin-top: 10px;
                border-radius: .3125rem;
                cursor: pointer;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: space-around;
                color: white;
                transition: .5s;
                position: relative;

                .close {
                    font-size: 0.5em;
                    clear: both;
                    width: 100%;
                    height: 10px;
                    position: absolute;
                    top: 3px;
                    right: -40%;
                    display: none;
                }

                i {
                    font-size: 2.3em;
                    line-height: 30px;
                    text-align: center;
                    position: relative;
                    top: 5px;
                }

                span {
                    font-family: "等线";
                    font-size: 1em;
                    position: relative;
                    top: -3px;
                    font-weight: bold;
                }
            }

            .coupon_item {
                border: 1px dashed #ffe6e6;
                background: #fff1f1;
                color: #fc8080;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;

                .date {
                    margin-top: 10px;
                    font-size: 0.8em;
                }
            }
        }

        .shoplist {
            width: 100%;
            min-height: 250px;
            background: white;
            margin-top: 20px;
            padding: 15px 0;

            .title {
                width: 95%;
            }

            .shoplist_content {
                width: calc(100% - 80px);
                display: flex;
                flex-flow: column wrap;
                align-items: center;

                .shoplist_items {
                    width: 100%;
                    min-height: 150px;
                    margin-left: 3%;
                    border-bottom: 1px solid #f2f2f2;
                    padding: 15px 0;
                    background: #fcfcfc;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;

                    .el-image {
                        width: 150px !important;
                        height: 150px !important;
                        margin-left: 25px;
                    }

                    .shop_info {
                        width: 500px;
                        height: 150px;
                        display: flex;
                        flex-flow: column wrap;

                        .shop_name {
                            width: 430px;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            word-break: break-all;
                            -webkit-line-clamp: 3;
                            margin-left: 30px;
                            text-align: left;
                            margin-top: 25px;
                        }

                        .shop_choose {
                            margin-top: 25px;
                            display: flex;
                            flex-flow: row wrap;
                            font-size: 0.8em;
                            margin-left: 30px;
                            justify-content: space-between;

                            .specs {
                                font-weight: bolder;

                                .data {
                                    font-weight: normal;
                                }
                            }
                        }
                    }

                    .shop_price {
                        width: auto;
                        flex: 1;
                        height: 125px;
                        padding-top: 25px;
                        color: rgb(255, 68, 68);
                        font-size: 1.3em;
                        font-weight: bolder;

                        .price::before {
                            content: "￥";
                            position: relative;
                        }
                    }

                    .shop_count {
                        width: auto;
                        flex: 1;
                        height: 120px;
                        font-size: 1.1em;
                        padding-top: 30px;

                        .scount::before {
                            content: "x";
                            position: relative;
                        }
                    }

                }

            }

        }

        .confirm {
            width: 100%;
            min-height: 120px;
            background: white;
            margin-top: 25px;

            .title {
                width: 95%;
            }

            .confirm_content {
                display: flex;
                align-items: center;
                margin-left: 30px;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: flex-start;
                margin-left: 35px;
                padding-bottom: 20px;

                .confirm_item {
                    height: 20px;
                    font-size: 1.1em;
                    font-family: "等线";
                    margin-top: 10px;
                }
            }
        }
        .confirm_info{
        width: 100%;
        background: white;        
        margin-top: 20px;
        height: 80px;
        margin-bottom: 50px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        .coupon_price{
            margin-right: 10px;
            color: #d2d2d2;
            font-size: 1em;
        }
        .order_price{
          font-size: 1.5em;
          font-weight: bolder;
          color:#ff3333;
          margin-right: 25px;
        }
        .button{
            width: 100px;
            height: 50px;
            background: #ff3333;
            color:#fff;
            display: block;
            line-height: 50px;
            margin-right: 15px;
            cursor: pointer;
        }
     }
    }
    .icon{
            width: 2em;
            height: 2em;
        }
</style>