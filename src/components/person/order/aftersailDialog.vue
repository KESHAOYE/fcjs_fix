<template>
    <div>
        <el-dialog title="售后申请" :visible="dialogFormVisible" :before-close="close" width=950px>
            <el-radio-group v-model="type">
                <el-radio-button :disabled='!canreturn' label="0">退货</el-radio-button>
                <el-radio-button :disabled='!canchange' label="1">换货</el-radio-button>
                <el-radio-button :disabled='!canfix' label="2">维修</el-radio-button>
            </el-radio-group>
            <div class="shoplist">
                <div class="title">
                    <span>订单清单</span>
                    <hr>
                </div>
                <div class="shoplist_content">
                    <div class="shoplist_items" v-for='(item,index) in shopList' :key="index">
                        <span class="choose" @click='addshop(item)' :class='{cant:item.afterstatus == 0,active: isselect(item)!=-1}'></span>
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
            <div class="sure">
                <el-button type='primary' plain @click='sends'>确认申请</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getaftersail,
        addaftersail
    } from '@/http/api'
    export default {
        name: 'deliverDialog',
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        filters: {
            sku(val) {
                val = val.replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
                return val
            },
        },
        data() {
            return {
                shopList: [],
                aftersailinfo: [],
                canreturn: false,
                canchange: false,
                canfix: false,
                type: '0',
                aftershop: [],
                dialogFormVisible: false
            }
        },
        computed: {
            isselect(item) {
                return function (item) {
                    let index = this.aftershop.findIndex(el => {
                        return el.shopid == item.shop_id
                    })
                    return index
                }
            }
        },
        created() {},
        methods: {
            open() {
                this.dialogFormVisible = true
                setTimeout(() => {
                    this.getinfo()
                }, 0)
            },
            getinfo() {
                this.loading = true
                getaftersail({
                        orderid: this.id
                    })
                    .then(data => {
                        if (data.code == 200) {
                            this.shopList = data.info.shopList
                            this.canreturn = data.info.canreturn
                            this.canchange = data.info.canchange,
                                this.canfix = data.info.canfix
                        } else
                            this.$message({
                                message: data.message,
                                type: 'error'
                            })
                    })
            },
            addshop(item) {
                if(this.isselect(item)==-1){
                  this.aftershop.push({
                    shopid: item.shop_id,
                    sku_id: item.sku_id
                  })
                } else {
                  this.aftershop.splice(this.isselect(item),1)
                }
            },
            sends() {
                if(this.type != '' && this.aftershop.length > 0){
                addaftersail({
                        aftershop: this.aftershop,
                        orderid: this.id,
                        type: this.type
                    })
                    .then(data => {
                        if (data.code == 200) {
                            this.$message({
                                message: '申请成功',
                                type: 'success'
                            })
                            this.$emit('success')
                            this.close()
                        } else {
                            this.$message({
                                message: '发货失败',
                                type: 'error'
                            })
                        }
                    })
                } else {
                    this.$message({
                      message: '请提供完整信息',
                      type: 'error'
                    })
                }
            },
            close() {
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tips {
        font-weight: bolder;
        font-size: 1.2em;
        display: block;
        margin-bottom: 10px;
    }

    .sure {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 100%;
    }

    .shoplist {
        width: 100%;
        min-height: 250px;
        background: white;
        padding: 10px 0;

        .title {
            width: 95%;
        }

        .shoplist_content {
            width: calc(100% - 50px);
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

                .choose {
                    width: 15px;
                    height: 15px;
                    display: block;
                    border: 1px solid #c2c2c2;
                    margin-left: 10px;
                    border-radius: 2px;
                    cursor: pointer;
                }

                .active {
                    background: #0084ff;
                    border: 1px solid #fff;
                    position: relative;
                }
                .active::after{
                    content: '\e714';
                    font-family: iconfont !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 15px;
                    height: 15px;
                    font-style: normal;
                    font-size:0.8em;
                    text-align: center;
                    line-height: 15px;
                    font-weight: bolder;
                    color: white;
                }
                .cant {
                    background: #f2f2f2;
                    cursor: not-allowed;
                }

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
</style>