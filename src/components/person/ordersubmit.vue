<template>
    <div class="ordersubmit">
        <personbar />
        <headers />
        <div class="content">
            <div class="person_head">
                <span>订单结算</span>
            </div>
            <myaddress @orderaddress="changeaddress" :addressid="orderinfo.address_id" />
            <div class="pay_methods">
                <div class="title">
                    <span>请选择付款方式</span>
                    <hr>
                </div>
                <div class="pay_content">
                    <div class="pay_item" :class="[{alipay:p.ename=='alipay'},{zsbank:p.ename=='zsbank'},{nybank:p.ename=='nybank'},{wechat:p.ename=='wechat'},{jsbank:p.ename=='jsbank'}]" v-for="(p,index) in userpay" :key="index" @click="choosebank(p)">
                        <i>{{p.icon}}</i>
                        <span>{{p.card|account}}</span>
                    </div>
                </div>
            </div>
            <div class="shoplist">
                <div class="title">
                    <span>订单清单</span>
                    <hr>
                </div>
                <div class="shoplist_content">
                    <div class="shoplist_items">
                        <el-image style="width:100px;height:100px;"></el-image>
                        <div class="shop_info">
                            <span class="shop_name"> 荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机</span>
                            <div class="shop_choose">
                                <span class="specs">颜色:<span class="data">黑色</span></span>
                            </div>
                        </div>
                        <div class="shop_price">
                            <span class="price">89.00</span>
                        </div>
                        <div class="shop_count">
                            <span class="scount">1</span>
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
                    <div class="confirm_item">收货人:{{addressinfo.address_name}}</div>
                    <div class="confirm_item">收货地址:{{addressinfo.address_content}}</div>
                    <div class="confirm_item">收货电话:{{addressinfo.address_phone}}</div>
                    <div class="confirm_item">订单类型:{{orderinfo.order_type}}</div>
                    <div class="confirm_item">付款信息:{{orderinfo.payment.name}}-{{orderinfo.payment.card|account}}</div>
                </div>
                <div class="confirm_info"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import myaddress from '../myaddress'
    export default {
        data() {
            return {
                orderinfo: {
                    order_id: "22234568582",
                    order_price: "8000.00",
                    address_id: "01239",
                    order_type: "维修（需用户自行寄修）",
                    payment:{
                        name:"农业银行",
                        card:"6222 1002 2003 1234"
                    },
                    order_shop: [{
                            shop_id: "000123",
                            shop_name: "洗衣机",
                        },
                        {

                        },
                    ]
                },
                userpay:[
                    {
                      icon:"\ue628",  
                      bankname:"农业银行",
                      ename:"nybank",
                      card:"6222 2222 2222 2222",
                    },
                    {
                      icon:"\ue659",
                      bankname:"招商银行",
                      ename:"zsbank",
                      card:"6222 2222 2222 2222",
                    },
                    {
                      icon:"\ue647",  
                      bankname:"支付宝",
                      ename:"alipay",
                      card:"柯少爷-"
                    },
                ],
                addressinfo:{
                    address_id:"01239",
                    address_name:"李柯伟",
                    address_content:"福州市仓山区",
                    address_phone:"15359639480",
                }
            }
        },
        components: {
            myaddress
        },
        methods:{
          changeaddress(data){
              this.orderinfo.address_id=data;
          },
          choosebank(data){
              this.orderinfo.payment.name=data.bankname;
              this.orderinfo.payment.card=data.card
          }
        }
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

            .pay_item:hover {
                animation: .1s bigcard linear;
                transform: scale(1.05);
                top: -2px;

                .close {
                    display: block;
                    transition: .2s;
                }
            }

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
        }

        .shoplist {
            width: 100%;
            min-height: 250px;
            background: white;
            margin-top: 20px;

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
                    background: #f2f2f2;
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
                    margin-bottom:50px;
                    .title{
                        width: 95%;
                    }
                    .confirm_content{
                        display: flex;
                        align-items: center;
                        margin-left: 30px;
                        flex-flow: column nowrap;
                        justify-content: center;
                        align-items: flex-start;
                        margin-bottom:25px;
                        margin-left: 35px;
                        .confirm_item{
                            height: 20px;
                            font-size: 1.1em;
                            font-family: "等线";
                            margin-top: 10px;
                        }
                    }
                }
    }
</style>