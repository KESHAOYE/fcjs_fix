<template>
    <div class="myorder">
        <div class="person_head">
            <span>我的订单</span>
        </div>
        <div class="order_detail">
            <div class="order_tool">
                <div class="screen">
                    <span class="screen_item" v-for="(types,index) in ordertype" :key="index"
                        @click="changescreen(types.value)" :value="types.value"
                        :class="{'active':activeType==types.value}">{{types.typename}}</span>
                </div>
                <div class="order_search">
                    <el-input size="small" placeholder="订单编号/商品名" v-model="ordersearch"></el-input>
                    <span class="search el-icon-search"></span>
                </div>
            </div>
            <div class="order_screen">
                <span class="order_detail_title">订单详情</span>
                <span class="order_man_title">收货人</span>
                <span class="order_price_title">金额</span>
                <span class="order_state_title">订单状态</span>
                <span class="order_control_title">操作</span>
            </div>
            <div class="order_detail_items">
                <div class="order_detail_item">
                    <div class="order_detail_head">
                        <span class="order_time">
                            2019-09-08 18:00:23
                        </span>
                        <span class="order_id">
                            订单号:T10000000002
                        </span>
                    </div>
                    <div class="order_detail_body">
                        <div class="order_detail_info">
                            <img src="../../../assets/phone/iphone5s.png" alt="" srcset="">
                            <span>小米（MI）生态链iHealth九安家用电子血压计 医用全自动上臂式血压仪 测量血压仪器 语</span>
                            <div class="shop_count">5</div>
                        </div>
                        <div class="order_detail_man">
                            <span class="order_name">
                                李柯伟
                            </span>
                        </div>
                        <div class="order_detail_price">
                            <span class="order_price">
                                50.00
                            </span>
                        </div>
                        <div class="order_detail_state">
                            已付款
                        </div>
                        <div class="order_detail_control">
                            <span @click="todetail()">订单详情</span>
                            <span class="deleteorder" @click="deleteorder()">删除订单</span>
                            <span class="after_sale">申请售后</span>
                        </div>
                    </div>
                </div>
                <div class="order_detail_item">
                    <div class="order_detail_head">
                        <span class="order_time">
                            2019-09-08 18:00:23
                        </span>
                        <span class="order_id">
                            订单号:T10000000002
                        </span>
                    </div>
                    <div class="order_detail_body">
                        <div class="order_detail_info">
                            <img src="../../../assets/phone/iphone5s.png" alt="" srcset="">
                            <span>小米（MI）生态链iHealth九安家用电子血压计 医用全自动上臂式血压仪 测量血压仪器 语</span>
                            <div class="shop_count">5</div>
                        </div>
                        <div class="order_detail_man">
                            <span class="order_name">
                                李柯伟
                            </span>
                        </div>
                        <div class="order_detail_price">
                            <span class="order_price">
                                50.00
                            </span>
                        </div>
                        <div class="order_detail_state">
                            已付款
                        </div>
                        <div class="order_detail_control">
                            <span @click="todetail()">订单详情</span>
                            <span class="deleteorder" @click="deleteorder()">删除订单</span>
                            <span class="after_sale">申请售后</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
            <span>是否要删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "myorder",
        data() {
            return {
                activeType: "all",
                ordersearch:"",
                ordertype: [{
                        typename: "全部订单",
                        value: "all"
                    },
                    {
                        typename: "待付款",
                        value: "waitpay"
                    },
                    {
                        typename: "待维修",
                        value: "waitfix"
                    },
                    {
                        typename: "维修中",
                        value: "fixing"
                    },
                    {
                        typename: "待发货",
                        value: "waitout"
                    },
                    {
                        typename: "待收货",
                        value: "waitin"
                    },
                    {
                        typename: "待评价",
                        value: "waitsay"
                    },
                    {
                        typename: "售后处理中",
                        value: "dealing"
                    },
                ],
                dialogVisible: false
            }
        },
        methods: {
            changescreen(el) {
                this.activeType = el;
            },
            todetail() {
                this.$router.push({
                    name: "orderdetail",
                    query: {
                        mid: "11"
                    }
                })
            },
            deleteorder() {
                this.$confirm('确认要删除？')
                    .then(()=> {
                        
                    })
            }
        },
        mounted() {
            this.activeType = this.$route.query.activetype ? this.$route.query.activetype : "all";
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
        border-radius: 5px;
        font-size: 1.3em;
        font-family: "等线";
        font-weight: bolder;

        span {
            margin-left: 25px;
        }
    }

    .myorder {
        width: 100%;
        min-height: 50px;

        .order_detail {
            width: 100%;
            min-height: 600px;
            background: white;
            margin-top: 30px;
            border-radius: 5px;

            .order_tool {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 50px;

                .screen {
                    width: 500px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 0.9em;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 30px;

                    .screen_item {
                        cursor: pointer;
                        font-family: "等线";
                        font-weight: bold;
                    }

                    .screen_item:hover {
                        color: red;
                        transition: .1s;
                    }

                    .active {
                        color: red;
                    }
                }
            }

            .order_search {
                width: 200px;
                height: 50px;
                margin-right: 80px;
                line-height: 50px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;

                .search {
                    width: 40px;
                    min-height: 30px;
                    height: 30px;
                    margin-left: 0;
                    line-height: 30px;
                    position: relative;
                    left: -1px;
                    top: 50%;
                    margin-top: -16.5px;
                    border: 1px solid #d2d2d2;
                    cursor: pointer;
                    background: #d2d2d2;
                }
            }
        }

        .order_screen {
            width: 950px;
            height: 40px;
            background: #f2f2f2;
            margin: 15px 25px;
            line-height: 40px;

            span {
                width: 128px;
                font-size: 0.8em;
                float: left;

            }

            .order_detail_title {
                width: 430px;
            }
        }

        .order_detail_items {
            width: 950px;
            min-height: 155px;
            margin-left: 25px;
            margin-top: 20px;

            .order_detail_item {
                margin-top: 25px;
                border: 1px solid #d9d9d9;
            }

            .order_detail_head {
                width: 100%;
                height: 30px;
                background: #f2f2f2;
                line-height: 30px;
                text-align: left;

                .order_time {
                    font-size: 0.9em;
                    margin-left: 20px;
                    color: #b2b2b2;
                }

                .order_id {
                    font-size: 0.9em;
                    margin-left: 30px;
                    color: #b2b2b2;
                }
            }

            .order_detail_body {
                width: 100%;
                min-height: 125px;
                display: flex;
                flex-flow: row nowrap;

                .order_detail_info {
                    width: 450px;
                    min-height: 125px;
                    border-right: 1px solid #d9d9d9;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;

                    img {
                        width: 80px;
                        height: 80px;
                        margin-left: 30px;
                        border: 1px solid #d2d2d2;
                    }

                    span {
                        width: 250px;
                        display: -webkit-box;
                        font-size: 0.8em;
                        text-align: left;
                        margin-left: 10px;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }

                    .shop_count {
                        margin-left: 30px;
                        font-size: 0.8em;
                        color: #c2c2c2;
                    }

                    .shop_count::before {
                        content: "x"
                    }
                }

                .order_detail_man,
                .order_detail_price,
                .order_detail_state,
                .order_detail_control {
                    width: 130.5px;
                    min-height: 125px;
                    border-right: 1px solid #d9d9d9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9em;

                    .order_name::before {
                        content: "\e655";
                        font-family: iconfont !important;
                        font-size: 1.1em;
                    }

                    .order_price:before {
                        content: "\e6cb";
                        font-family: iconfont !important;
                    }
                }

                .order_detail_control {
                    border: 0;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    span {
                        cursor: pointer;
                        color: skyblue;
                    }
                }
            }
        }
    }
</style>