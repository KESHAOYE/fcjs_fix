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
                    <el-input size="small" placeholder="订单编号" v-model="ordersearch"></el-input>
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
                <div class="null" v-if='orderInfo.length <= 0'>暂无订单</div>
                <div class="order_detail_item" v-for='(item,index) in orderInfo' :key="index">
                    <div class="order_detail_head">
                        <span class="order_time">
                            {{item.order_date|datewithtime}}
                        </span>
                        <span class="order_id">
                            订单号:{{item.order_id}}
                        </span>
                    </div>
                    <div class="order_detail_body">
                        <div class="order_detail_info">
                            <img :src="item.shopimg" alt="" srcset="">
                            <span><span v-if='item.order_state == 1'>维修:</span>{{item.shopname}}</span>
                            <div class="shop_count">{{item.itemcount}}</div>
                        </div>
                        <div class="order_detail_man">
                            <span class="order_name">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="order_detail_price">
                            <span class="order_price">
                                {{item.order_money}}
                            </span>
                        </div>
                        <div class="order_detail_state">
                            {{item.order_state|state}}
                        </div>
                        <div class="order_detail_control">
                            <span @click='topay(item)' v-if='item.order_state == 1'>去付款</span>
                            <span @click="todetail(item)" v-if='item.order_state > 1'>订单详情</span>
                            <span class="deleteorder" @click="deleteorder(item)" v-if='item.order_state == 7'>删除订单</span>
                            <span @click='confirmGet(item)' v-if='item.order_state == 5'>确认收货</span>
                            <span @click='comment(item)' v-if='item.order_state == 6'>去评论</span>
                            <span class="after_sale" @click='toaftersail(item)' v-if='item.order_state == 5 || item.order_state == 6 || item.order_state ==7'>申请售后</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <aftersailDialog :id='id' ref="aftersail" @success='getorder'></aftersailDialog>
        <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
            <span>是否要删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认删除</el-button>
            </span>
        </el-dialog>
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :pageCount='pageCount' v-if='orderInfo.length > 0'>
        </el-pagination>
    </div>
</template>

<script>
    import {
        getcenterorderinfo,
        deleteorder,
        confirm
    } from '@/http/api'
    import aftersailDialog from './aftersailDialog'
    import { datewithtime,state } from '@/utils/filters'
    export default {
        name: "myorder",
        data() {
            return {
                activeType: "all",
                ordersearch: "",
                ordertype: [{
                        typename: "全部订单",
                        value: "all",
                        type: '>0'
                    },
                    {
                        typename: "待付款",
                        value: "waitpay",
                        type: '=1'
                    },
                    {
                        typename: "待维修",
                        value: "waitfix",
                        type: '=2'
                    },
                    {
                        typename: "维修中",
                        value: "fixing",
                        type: '=3'
                    },
                    {
                        typename: "待发货",
                        value: "waitout",
                        type: '=41 or o.order_state = 42'
                    },
                    {
                        typename: "待收货",
                        value: "waitin",
                        type: '=5'
                    },
                    {
                        typename: "待评价",
                        value: "waitsay",
                        type: '=6'
                    },
                    {
                        typename: "售后处理中",
                        value: "dealing",
                        type: '>7'
                    },
                ],
                dialogVisible: false,
                orderInfo: [],
                pageSize: 5,
                currentPage: 1,
                pageCount: 1,
                load: '',
                id: ''
            }
        },
        components:{
            aftersailDialog
        },
        methods: {
            changescreen(el) {
                this.activeType = el;
                this.$router.push({
                    name: "myorder",
                    query: {
                        mid: '11',
                        activetype: el
                    }
                })
            },
            confirmGet(item){
              confirm({orderid: item.order_id})
              .then(data=>{
                if(data.code == 200){
                  this.$message({
                    message: '收货成功',
                    type: 'success'
                  })
                  this.$router.push({
                    name: 'comment',
                    query:{orderid: item.order_id,mid: 11}
                  })
                }
              })
            },
            topay(item){
                this.$router.push({
                    name: "ordersubmit",
                    query: {
                        orderid: item.order_id,
                        type: item.order_type
                    }
                })
            },
            toaftersail(item){
              this.id = item.order_id
              this.$refs.aftersail.open()
            },
            comment(item){
                this.$router.push({
                    name: "comment",
                    query: {
                        mid: "11",
                        orderid: item.order_id
                    }
                })
            },
            todetail(item) {
                this.$router.push({
                    name: "orderdetail",
                    query: {
                        mid: "11",
                        orderid: item.order_id
                    }
                })
            },
            handleCurrentChange(){
                this.getorder()
            },
            deleteorder(item) {
                this.$confirm('确认要删除？')
                    .then(() => {
                       deleteorder({orderid: item.order_id})
                       .then(data=>{
                          if(data.code == 200){
                              this.$message({
                                message: '删除成功',
                                type: 'success'
                              })
                              this.getorder()
                          }else{
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                              })
                          }
                       })
                    })
            },
            getorder() {
                let index = this.ordertype.findIndex(el=>{
                    return el.value == this.activeType
                })
                getcenterorderinfo({
                        userid: this.$store.state.userinfo.userid,
                        page: this.currentPage,
                        pageSize: 3,
                        type: this.ordertype[index].type
                    })
                    .then(data => {
                        this.orderInfo = data.info
                        this.pageCount = Math.ceil(data.count / this.pageSize)
                        this.load.close()
                    })
            },
            handleCurrentChange(el) {
                this.currentPage = el
                this.getorder()
            },
        },
        mounted() {
            this.load = this.$loading({
                    lock: true,
                    text: '获取订单中..',
            });
            setTimeout(() => {
                this.getorder()
            }, 1000)
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
            min-height: 200px;
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
            /* min-height: 155px; */
            margin-left: 25px;
            margin-top: 20px;

            .order_detail_item {
                margin-top: 25px;
                border: 1px solid #d9d9d9;
            }

            .order_detail_head {
                width: 100%;
                height: 30px;
                background: #f9f9f9;
                line-height: 30px;
                text-align: left;

                .order_time {
                    font-size: 0.9em;
                    margin-left: 20px;
                    color: #a5a5a5;
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
                        color: #ff3333;
                    }
                }
            }
        }
    }

    .el-pagination {
        padding: 20px 0;
        background: white;
    }
</style>