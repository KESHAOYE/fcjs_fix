<template>
    <div class="coupon">
        <div class="person_head">
            <span>我的优惠券</span>
        </div>
        <div class="coupon_detail">
            <div class="coupon_tool">
                <span class="active" @click="changecoupon">全部</span>
                <span @click="changecoupon">维修</span>
                <span @click="changecoupon">回收</span>
                <span @click="changecoupon">商品</span>
            </div>
            <div class="coupon_items">
                <div class="coupon_item">
                    <div class="coupon_tip_left"></div>
                    <div class="coupon_item_detail">
                        <span class="coupon_title">
                            限维修使用
                        </span>
                        <span class="coupon_price">
                            5
                        </span>
                        <span class="coupon_time">
                            2019年9月30日过期
                        </span>
                    </div>
                    <div class="coupon_tip_right"></div>
                    <div class="coupon_item_bottom">
                        <span class="coupon_trandition">
                            满40可用
                        </span>
                    </div>
                </div>
                <!-- <div class="coupon_null">
                <span><i>&#xe708;</i>暂没有订单，快去<span class="active">领券中心</span>吧</span>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "coupon",
        data() {
            return {

            }
        },
        methods: {
            changecoupon(el) {
                let arr = Array.from(document.getElementsByClassName("coupon_tool")[0].children)
                arr.forEach((e) => {
                    e.classList.remove("active")
                })
                el.currentTarget.classList.add("active")
            }
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

                .coupon_item:hover {
                    box-shadow: 0px 15px 30px rgba(#f4ca3a, 0.4);
                    transform: translate3d(0, -2px, 0);
                    transition: all .2s linear;
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
                    margin-top: -25px;

                    i {
                        font-size: 2.8em;
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