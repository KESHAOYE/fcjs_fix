<template>
    <div class="coupon">
        <div class="person_head">
            <span>我的优惠券</span>
        </div>
        <div class="coupon_detail">
            <div class="coupon_tool">
                <span @click="changecoupon(0)" :class = '{active: type == 0}'>可用</span>
                <span @click="changecoupon(1)" :class = '{active: type == 1}'>已使用</span>
                <span @click="changecoupon(2)" :class = '{active: type == 2}'>已过期</span>
            </div>
            <div class="coupon_items">
                <div class="coupon_item" :class='{used: item.use_status > 0}' v-for='(item,index) in couponList' :key='index'>
                    <div class="coupon_tip_left"></div>
                    <div class="coupon_item_detail">
                        <span class="coupon_title">
                            {{item.note}}
                        </span>
                        <span class="coupon_price">
                            {{item.amount}}
                        </span>
                        <span class="coupon_time">
                            {{item.over_time|date}}过期
                        </span>
                    </div>
                    <div class="coupon_tip_right"></div>
                    <div class="coupon_item_bottom">
                        <span class="coupon_trandition">
                            满{{item.min_price}}可用
                        </span>
                    </div>
                </div>
                <div class="coupon_null" v-if='couponList.length <= 0'>
                <span><i>&#xe708;</i>暂没有优惠券</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getusercoupon
    } from '@/http/api'
    export default {
        name: "coupon",
        data() {
            return {
                couponList: [],
                type: 0
            }
        },
        filters: {
            date(val) {
                let reg = new RegExp(/^\d+-\d+-\d+/)
                return reg.exec(val)[0]
            }
        },
        methods: {
            changecoupon(type) {
                this.type = type
                this.get(type)
            },
            get(type) {
                const load = this.$loading({
                    loading: true,
                    text: '获取优惠券'
                })
                this.couponList = []
                if (Object.keys(this.$store.state.userinfo).length > 0) {
                    getusercoupon({
                            userid: this.$store.state.userinfo.userid,
                            type: type
                        })
                        .then(data => {
                            load.close()
                            this.couponList = data.info
                        })
                }
            }
        },
        created() {
            this.get(0)
        }
    }
</script>

<style lang="scss">
    .person_head {
        width: 100%;
        height: 50px;
        background: white;
        text-align: left;
        line-height: 50px;
        margin-top: 20px;

        span {
            margin-left: 25px;
        }
    }

    .coupon {
        width: 100%;
        height: auto;

        .coupon_detail {
            width: 100%;
            min-height: 500px;
            margin-top: 30px;
            background: #fff;
            padding-top: 20px;

            .coupon_tool {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                width: 200px;
                height: 35px;
                line-height: 35px;
                margin-left: 20px;

                span {
                    cursor: pointer;
                    font-family: "等线";
                    font-weight: bold;
                }

                span:hover {
                    color: red;
                }

                .active {
                    color: red;
                }
            }
            
            .coupon_items {
                width: 100%;
                min-height: 450px;
                display: flex;
                flex-flow: row wrap;
                margin-top: 25px;
                .used{
                  filter: grayscale(1);
                }
                .used:hover{
                    box-shadow: 0px 0px 0px rgba(#f4ca3a, 0.4);
                    top: 0px;
                }
                .coupon_item{
                    position:relative;
                    top:0;
                    transition: .4s;
                }
                .coupon_item:hover {
                    box-shadow: 0px 15px 30px rgba(#f4ca3a, 0.4);
                    // transform: translate3d(0, -2px, 0);
                    top: -3px;
                }

                @keyframes coupontop {
                    0% {
                        top: 0px
                    }

                    50% {
                        top: -2px
                    }

                    100% {
                        top: -4px
                    }
                }

                .coupon_item {
                    width: 200px;
                    height: 175px;
                    background: #f4ca3a;
                    margin-left: 25px;
                    position: relative;
                    color: #303c30;
                    cursor: pointer;

                    .coupon_tip_left {
                        width: 20px;
                        height: 20px;
                        float: left;
                        background: #fff;
                        border-radius: 50%;
                        position: relative;
                        left: -10px;
                        top: 50%;
                        margin-top: -20px;
                    }

                    .coupon_tip_right {
                        width: 20px;
                        height: 20px;
                        float: right;
                        background: #fff;
                        border-radius: 50%;
                        position: relative;
                        right: -10px;
                        top: 50%;
                        margin-top: -20px;
                    }

                    .coupon_item_detail {
                        float: left;
                        width: 150px;
                        text-align: center;
                        margin-left: 25px;

                        .coupon_title {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 15px;
                            position: relative;
                            font-size: 0.8em;
                        }

                        .coupon_price {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 30px;
                            position: relative;
                            font-size: 2.5em;
                            font-weight: bolder;
                        }

                        .coupon_price:before {
                            content: "\e6cb";
                            font-family: iconfont !important;
                            font-size: 24px;
                            margin-right: -12px;
                        }

                        .coupon_time {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 45px;
                            position: relative;
                            font-size: 0.8em;
                        }

                    }

                    .coupon_item_bottom {
                        width: 100%;
                        height: 30px;
                        background: #303c30;
                        position: absolute;
                        bottom: 0;

                        .coupon_trandition {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            // top:55px;
                            height: 30px;
                            line-height: 30px;
                            position: relative;
                            font-size: 0.9em;
                            color: white;
                        }
                    }
                }

                .coupon_item:after {
                    position: absolute;
                    content: "";
                    width: 200px;
                    bottom: 0;
                    left: 0;
                    border-bottom: 1px dashed white;
                    display: block;
                }

                .coupon_null {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    position: relative;
                    top: 50%;
                    margin-top: 30px;
                    font-size: 1.2em;

                    i {
                        font-size: 3em;
                        margin-right: 10px;
                    }

                    .active {
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>