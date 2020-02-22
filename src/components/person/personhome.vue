<template>
    <div class="personhome">
        <div class="person_info">
            <div class="user_info_left">
                <div class="user_info_head">
                    <img :src="userinfo.headimg" alt="">
                    <div class="user_brand">用户</div>
                </div>
                <span class="user_name">{{userinfo.username}}</span>
                <!-- <span class="user_score">1200</span> -->
                <div class="user_info_left_foot">
                    <span class="order_tip">进入订单中心查看详情</span>
                    <div class="enter_order">进入</div>
                </div>
            </div>
            <div class="user_order_right">
                <div class="right_items">
                    <el-badge :value="count.waitpay" :hidden='count.waitpay == 0' class="item">
                        <i>&#xe617;</i>
                        <span>待付款</span>
                    </el-badge>

                </div>
                <div class="right_items">
                    <el-badge :value="count.waitfix" :hidden='count.waitfix == 0' class="item">
                        <i>&#xe669;</i>
                        <span>待维修</span>
                    </el-badge>
                </div>
                <div class="right_items">
                    <el-badge :value="count.fixing" :hidden='count.fixing == 0' class="item">
                        <i>&#xe624;</i>
                        <span>维修中</span>
                    </el-badge>
                </div>
                <div class="right_items">
                    <el-badge :value="count.waitsend" :hidden='count.waitsend == 0' class="item">
                        <i>&#xe690;</i>
                        <span>待发货</span>
                    </el-badge>
                </div>
                <div class="right_items">
                    <el-badge :value="count.waitreceive" :hidden='count.waitreceive == 0' class="item">
                        <i>&#xe684;</i>
                        <span>待收货</span>
                    </el-badge>
                </div>
                <div class="right_items">
                    <el-badge :value="count.waitcomment" :hidden='count.waitcomment == 0' class="item">
                        <i>&#xe60b;</i>
                        <span>待评价</span>
                    </el-badge>
                </div>
            </div>
        </div>
        <div class="person_row">
            <div class="mywallet">
                <div class="person_title">我的钱包</div>
                <div class="wallet_items">
                    <div class="item">
                        <router-link to="/coupon">
                            <i>&#xe625;</i>
                            <span>优惠券</span>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link to="/paymethod">
                            <i>&#xe6a4;</i>
                            <span>支付方式</span>
                        </router-link>
                    </div>
                </div>
                <div class="enter_wallet">
                    <span class="wallet_tip">进入我的钱包查看详情</span>
                </div>
            </div>

            <div class="mywallet myservice">
                <div class="person_title">我的客服</div>
                <div class="wallet_items">
                    <div class="item">
                        <router-link to="/myorder">
                            <i>&#xe60c;</i>
                            <span>我的售后</span>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link tag="a" target='_blank' :to="{name: 'chat'}">
                            <i>&#xe609;</i>
                            <span>我的客服</span>
                        </router-link>
                    </div>
                </div>
                <div class="enter_wallet">
                    <span class="wallet_tip">进入我的客服查看详情</span>
                </div>
            </div>
            <div class="mywallet myaccount">
                <div class="person_title">我的账号</div>
                <div class="wallet_items">
                    <div class="item">
                        <router-link to="/myinfo">
                            <i>&#xe641;</i>
                            <span>个人信息</span>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link to="/changepassword">
                            <i>&#xe627;</i>
                            <span>密码修改</span>
                        </router-link>
                    </div>
                </div>
                <div class="enter_wallet">
                    <span class="wallet_tip">进入我的账号查看详情</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getordercount} from '@/http/api'
    export default {
        name: "personhome",
        data() {
            return {
              count:{}
            }
        },
        computed:{
          userinfo () {
              return this.$store.state.userinfo
          }
        },
        methods: {
            getordercounts(){
              getordercount()
              .then(data=>{
                  this.count = data.info
              })
            }
        },
        mounted() {
            this.getordercounts()
        },
    }
</script>
<style lang="scss">
    .personhome {
        width: 100%;
        min-height: 50px;
        margin-top: 20px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        .person_info {
            width: 100%;
            height: 230px;
            background: #fff;
            display: flex;
            flex-flow: row nowrap;

            .user_info_left {
                width: 280px;
                height: 250px;
                background: #f4ca3a;
                position: relative;
                top: -10px;
                box-shadow: 3px 3px 20px #848584;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;

                .user_info_head {
                    width: 60px;
                    height: 60px;
                    margin-top: 30px;

                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        border: 2px solid #fff;
                    }

                    .user_brand {
                        width: 40px;
                        height: 20px;
                        border-radius: 15px;
                        background: white;
                        font-size: 0.8em;
                        line-height: 20px;
                        position: relative;
                        top: -20px;
                        left: 50%;
                        margin-left: -20px;
                    }
                }

                .user_name {
                    margin-top: 15px;
                    color: #303c30;
                    font-size: 1.1em;
                    font-weight: bold;
                }

                .user_score {
                    min-width: 30px;
                    height: 15px;
                    line-height: 15px;
                    text-align: center;
                    border-radius: 10px;
                    border: 1px solid #303c30;
                    color: #303c30;
                    padding: 3px 5px;
                    margin-top: 10px;
                    cursor: pointer;
                }

                .user_score::after {
                    content: "分";
                }

                .user_info_left_foot {
                    width: 100%;
                    height: 70px;
                    background: #303c30;
                    ;
                    position: absolute;
                    bottom: 0;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    font-size: .9em;
                    justify-content: center;
                    font-weight: bold;
                    color: #f4ca3a;

                    .enter_order {
                        width: 40px;
                        height: 20px;
                        border: 1px solid #f4ca3a;
                        margin-left: 10px;
                        cursor: pointer;
                        border-radius: 5px;
                    }
                }
            }

            .user_order_right {
                width: 750px;
                height: 250px;
                margin-left: 30px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                align-items: center;
                transition: 1s;


                .right_items {
                    width: 90px;
                    height: 90px;
                    cursor: pointer;

                    // display: flex;
                    // flex-flow: column nowrap;
                    i {
                        font-family: iconfont !important;
                        font-style: normal;
                        font-size: 2.6em;
                        margin-top: 5px;
                        display: block;
                    }

                    span {
                        margin-top: 5px;
                        display: block;
                    }
                }
            }
        }

        .person_row:last-child {
            margin-bottom: 80px;
        }

        .person_row {
            width: 100%;
            min-height: 50px;
            margin-top: 40px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;

            .person_title {
                width: 95%;
                height: 50px;
                border-bottom: 1px solid #d9d9d9;
                line-height: 50px;
                text-align: left;
                padding-left: 5%;
            }

            .myaddress,
            .mywallet {
                box-shadow: 3px 3px 20px #d2d2d2;
                transition: .5s;
            }

            .myaddress {
                width: 400px;
                min-height: 200px;
                background: #fff;
                float: left;
                border-radius: 20px;

                .address_row:last-child {
                    border: none;
                }

                .address_row {
                    width: 90%;
                    min-height: 20px;
                    padding: 10px 0 0px;
                    border-bottom: 1px solid #d5d5d5;
                    margin-left: 5%;
                    display: flex;
                    flex-flow: row wrap;

                    .title {
                        height: 30px;
                        width: 50px;
                        float: left;
                        line-height: 30px;
                    }

                    .name,
                    .phone {
                        width: 180px;
                        height: 30px;
                        margin-left: 10px;
                        float: left;
                        line-height: 30px;
                    }

                    .name {
                        width: 120px;
                        text-align: left;
                    }

                    .phone {
                        margin-left: 85px;
                    }

                    .address {
                        width: 100%;
                        min-height: 30px;
                        margin-left: 10px;

                        margin-top: 5px;
                        line-height: 30px;

                        .address_detail {
                            width: 320px;
                            text-align: left;
                            margin-left: 50px;
                        }

                    }

                    .address_tool {
                        display: flex;
                        flex-flow: row nowrap;
                        float: right;
                        width: 100%;
                        height: 30px;
                        margin-top: 5px;
                        justify-content: flex-end;
                        align-items: center;

                        span {
                            margin-right: 20px;
                            cursor: pointer;
                        }

                        span:hover {
                            color: red;
                            transition: .1s;
                        }
                    }

                    .add_address {
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-around;
                        height: 80px;
                        width: 100%;
                        cursor: pointer;

                        i {
                            font-size: 2.2em;
                        }
                    }

                }
            }

            .mywallet {
                width: 450px;
                min-height: 250px;
                background: white;
                margin-left: 10px;
                float: left;
                border-radius: 20px;
                margin-top: 20px;

                .wallet_items {
                    width: 100%;
                    height: 150px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-around;
                    align-items: center;
                    border-bottom: 1px solid #d2d2d2;

                    .item {
                        a {
                            width: 100px;
                            height: 100px;
                            display: flex;
                            flex-flow: column nowrap;
                            cursor: pointer;

                            i {
                                font-size: 2.5em;
                                margin-top: 10px;
                            }

                            span {
                                margin-top: 8px;
                            }
                        }
                    }
                }

                .enter_wallet {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                }
            }

            .myservice {
                margin-left: 0;
                width: 450px;
                margin-top: 20px;
            }
        }
    }
</style>