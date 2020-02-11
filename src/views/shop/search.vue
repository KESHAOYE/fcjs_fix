<template>
    <div class="searchhtml">
        <personbar />
        <headers :searchs="search" />
        <div class="content">
            <div class="searchbreadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <span class="searchresult" v-if="search">"{{search}}"</span>
                        <span class="searchresult" v-if="shoptype">"{{shoptype|shoptype}}"</span>
                        <span class="searchresult" v-if="newtype">"{{newtype|newtype}}"</span>
                        <span class="searchresult" v-if="newtypelevel">"{{newtypelevel|newtypelevel}}"</span>
                        <span class="searchresult"
                            v-if="this.$route.query.maxmoney&&this.$route.query.minmoney">"{{minmoney}}元-{{maxmoney}}元"</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="list_sort">
                <div class="sort_row">
                    <span class="sort_title">按商品分类:</span>
                    <span class="sort_item" v-for="(item,index) in shoptypes" :key="index"
                        @click="changetype('shoptype',item.value)">{{item.name}}</span>
                </div>
                <div class="sort_row">
                    <span class="sort_title">按新旧分类:</span>
                    <span class="sort_item" v-for="(item,index) in newtypes" :key="index"
                        @click="changetype('newtype',item.value)">{{item.name}}</span>
                </div>
                <div class="sort_row">
                    <span class="sort_title">二手产品新旧分类:</span>
                    <span class="sort_item" v-for="(item,index) in newtypelevels" :key="index"
                        @click="changetype('newtypelevel',item.value)">{{item.name}}</span>
                </div>
                <div class="sort_row">
                    <span class="sort_title">按价格区间分类:</span>
                    <span class="sort_item" v-for="(item,index) in price" :key="index"
                        @click="changetype('price',[item.maxmoney,item.minmoney])">{{item.maxmoney}}元-{{item.minmoney}}元</span>
                    <span class="sort_item">
                        自定义:
                        <input type="text" v-model="vmin" placeholder="￥" min="0" />-
                        <input type="text" v-model="vmax" placeholder="￥" min="0" />
                    </span>
                    <div class="sortbyprice" @click="changetype('price',[vmax,vmin])">确认</div>
                </div>
            </div>
            <div class="result">
                <div class="result_sort_bar">
                    <span class="sort_bar_item active">
                        销量
                        <i class="el-icon-bottom"></i>
                    </span>
                    <span class="sort_bar_item">
                        价格
                        <i class="el-icon-bottom"></i>
                    </span>
                    <span class="sort_bar_item">
                        评论数
                        <i class="el-icon-bottom"></i>
                    </span>
                </div>
                <div class='null' v-if='shopList.length <= 0'>暂无结果</div>
                <div class="resultitem" v-for='(item,index) in shopList' :value="item.shop_id" @click="todetail">
                    <div class="isold smallold" v-if='item.isold == 1'>
                    </div>
                    <div class="resultimg">
                        <img :src="item.shopimg" alt="" srcset="">
                    </div>
                    <span class="resultprice">{{item.price}}</span>
                    <span class="resultname">{{item.shopname}}</span>
                </div>
            </div>
            <el-pagination background layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
    </div>
</template>

<script>
    let that = ""
    import {
        searchresult
    } from '@/http/api'
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                vmax: "",
                vmin: "",
                shoptypes: [{
                        name: "手机",
                        value: "phone"
                    },
                    {
                        name: "电脑",
                        value: "computer"
                    },
                    {
                        name: "耳机",
                        value: "earphone"
                    }
                ],
                newtypes: [{
                        name: "全新",
                        value: "news",
                    },
                    {
                        name: "二手",
                        value: "old"
                    }
                ],
                newtypelevels: [{
                        name: "95新以上",
                        value: "high95",
                    },
                    {
                        name: "9新-95新",
                        value: "9to95"
                    },
                    {
                        name: "8新-9新",
                        value: "8to9"
                    },
                    {
                        name: "8新或以下",
                        value: "low8"
                    }
                ],
                price: [{
                        maxmoney: "0",
                        minmoney: "100",
                    },
                    {
                        maxmoney: "100",
                        minmoney: "1000",
                    },
                    {
                        maxmoney: "1000",
                        minmoney: "10000"
                    },
                ],
                shopList: []
            }
        },
        methods: {
            back() {
                if (JSON.stringify(this.$route.query) == "{}") {
                    this.$router.push({
                        name: "home"
                    })
                }
            },
            getSearch() {
                const qdata = {
                    key: this.$route.query.search, //搜索词
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    sort: this.$route.query.shoptype, //所属分类
                    isold: this.$route.query.newtype, //二手标识
                    oldtype: this.$route.query.newtypelevel, //二手状态
                    min_price: this.$route.query.maxmoney, //价格区间
                    max_price: this.$route.query.minmoney
                }
                searchresult(qdata)
                    .then(data => {
                        this.shopList = []
                        this.shopList = data.info
                    })
            },
            todetail(el) {
                console.dir(el.currentTarget.attributes[0].value)
                this.$router.push({
                    name: "shopdetail",
                    query: {
                        shopid: el.currentTarget.attributes[0].value
                    }
                })
            },
            changetype(type, value) {
                let nowsearch = this.$route.query;
                let newsearch = ""
                switch (type) {
                    case "shoptype":
                        newsearch = {
                            ...nowsearch,
                            shoptype: value
                        };
                        break;
                    case "newtype":
                        newsearch = {
                            ...nowsearch,
                            newtype: value
                        };
                        break;
                    case "newtypelevel":
                        newsearch = {
                            ...nowsearch,
                            newtypelevel: value
                        };
                        break;
                    case "price":
                        let temp = ""
                        if (value[0] > value[1]) {
                            temp = value[0];
                            value[0] = value[1];
                            value[1] = temp;
                        } else if (value[0].length == 0) {
                            value[0] = value[1]
                        } else if (value[1].length == 0) {
                            value[1] = value[0]
                        } else if (value[1].length == 0 && value[0].length == 0) {
                            this.$notify({
                                message: "请输入内容",
                                type: "error",
                                duration: 1500
                            })
                            return;
                        }
                        newsearch = {
                            ...nowsearch,
                            maxmoney: value[1],
                            minmoney: value[0]
                        };
                        break;
                }
                this.$router.push({
                    name: "search",
                    query: newsearch
                })
            },

        },
        filters: {
            shoptype(value) {
                let newval = "";
                for (var i of that.shoptypes) {
                    if (i.value == value) {
                        newval = i.name;
                    }
                }
                return newval;
            },
            newtype(val) {
                let newval = "";
                for (var i of that.newtypes) {
                    if (i.value == val) {
                        newval = i.name;
                    }
                }
                return newval;
            },
            newtypelevel(val) {
                let newval = "";
                for (var i of that.newtypelevels) {
                    if (i.value == val) {
                        newval = i.name;
                    }
                }
                return newval;
            }
        },
        watch: {
            vmin(val) {
                let reg = new RegExp(/^[1-9]\d*$/)
                if (Number(val) < 0 || !reg.test(val)) {
                    this.vmin = ""
                }
            },
            vmax(val) {
                let reg = new RegExp(/^[1-9]\d*$/)
                if (Number(val) < 0 || !reg.test(val)) {
                    this.max = ""
                }
            },
            $route(to, from) {
                this.$router.go(0)
            }
        },
        computed: {
            search() {
                return this.$route.query.search
            },
            shoptype() {
                return this.$route.query.shoptype
            },
            newtype() {
                return this.$route.query.newtype;
            },
            newtypelevel() {
                return this.$route.query.newtypelevel;
            },
            minmoney() {
                return this.$route.query.minmoney
            },
            maxmoney() {
                return this.$route.query.maxmoney
            }
        },
        beforeCreate() {
            that = this
        },
        mounted() {
            this.back();
            this.getSearch()
        }
    }
</script>

<style lang="scss">
    .searchhtml {
        width: 100%;
        height: auto;
    }

    .searchbreadcrumb {
        width: 100%;
        min-height: 20px;
        line-height: 20px;
        margin-top: 35px;
        padding-left: 10px;

        .searchresult {
            color: black;
            font-size: 1.1em;
            font-weight: bold;
            font-family: "微软雅黑";
            margin-left: 8px;
        }

    }

    .list_sort {
        width: 100%;
        min-height: 50px;
        margin-top: 15px;
        background: white;
        border-top: 1px solid #d2d2d2;
        border-bottom: 1px solid #d2d2d2;

        .sort_row:last-child {
            border-bottom: none;
        }

        .sort_row {
            width: 100%;
            min-height: 40px;
            display: flex;
            flex-flow: row wrap;
            border-bottom: 1px solid #d2d2d2;

            .sort_title {
                border-right: 1px solid #d2d2d2;
                min-width: 120px;
                text-align: left;
                padding-left: 10px;
                display: flex;
                align-items: center;
                font-size: 0.8em;
                background: #f3f3f3;
            }

            .sort_item {
                min-width: 0px;
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                margin-left: 15px;
                font-size: 0.8em;
                cursor: pointer;
                color: #005aa0;

                input {
                    width: 70px;
                    height: 20px;
                    margin-left: 3px;
                    outline: 0;
                    margin-right: 3px;
                }
            }

            ;

            .sortbyprice {
                width: 35px;
                height: 20px;
                background: #ff3333;
                color: white;
                font-size: 0.6em;
                position: relative;
                top: 10px;
                line-height: 20px;
                cursor: pointer;
            }

            .sort_item:hover {
                color: #ff3333;
            }
        }
    }

    .result {
        width: 100%;
        min-height: 350px;
        background: white;
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 50px;
        margin-top: 30px;

        //border:1px solid #d2d2d2;
        .result_sort_bar {
            width: 98%;
            height: 45px;
            background: #f1f1f1;
            border-top: 1px solid #d2d2d2;
            border-bottom: 1px solid #d2d2d2;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 0 20px;

            .sort_bar_item {
                width: 70px;
                height: 25px;
                line-height: 25px;
                border: 1px solid #d2d2d2;
                background: white;
                font-size: 0.7em;
                cursor: pointer;
                color: black;
            }

            .active {
                background: #ff3333;
                color: white;
            }
        }

        .resultitem {
            width: 256px;
            height: 350px;
            //border-left: 1px solid #d2d2d2;
            transition: .1s;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;

        }

        .resultitem:hover {
            //border:1px solid #d2d2d2;
            cursor: pointer;
            box-shadow: 0px 0px 5px #d2d2d2;
        }

        .resultimg {
            width: 100%;
            height: 220px;
            margin-top: 10px;

            img {
                width: 220px;
                height: 220px;
            }
        }

        .resultname {
            width: 90%;
            height: 35px;
            display: block;
            margin-top: 5px;
            font-size: 0.9em;
            text-overflow: ellipsis;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
        }

        .resultprice {
            width: 100%;
            height: 30px;
            color: red;
            display: block;
            font-size: 1.4em;
            margin-top: 20px;
            text-align: left;
            padding-left: 15px;
            font-family: "微软雅黑";
        }

        .resultprice:before {
            content: "\e6cb";
            font-family: iconfont !important;
            font-size: 0.5em;
        }
    }

    .isold {
        width: 70px;
        height: 15px;
        background: #ff3333;
        color: white;
        border-radius: 10px;
        float: left;
        margin-right: 5px;
        position: relative;
        top: 4px;
        ;
    }

    .isold::before {
        content: "二手优品";
        //position: absolute;
        width: 70px;
        height: 18px;
        line-height: 18px;
        border-radius: 10px;
        background: #ff3333;
        color: white;
        font-size: 0.2em;
        text-align: center;
        display: block;
    }

    .smallold {
        position: relative;
        top: 10px;
        right: -70px;
    }

    .null {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff3333 !important;
        color: #FFF;
    }

    .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #ff3333 !important;
    }
</style>