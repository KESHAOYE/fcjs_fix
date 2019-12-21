<template>
    <div class="person">
        <div class="content">
            <div class="login_state_tool">
                <el-popover placement="bottom" width="200" trigger="hover">
                    <div class="personal_info">
                        <img src="../../assets/phone/iphone5s.png" alt="">
                        <div class="outlogin">退出登录</div>
                    </div>
                    <div class="person_info" slot="reference">
                        <span>KESHAOYE</span>
                    </div>
                </el-popover>
                <router-link to="/login"><span>登录</span></router-link>
                <router-link to="/register"><span class="red">免费注册</span></router-link>
                <router-link to="/personcenter"><span>个人中心</span></router-link>
                <router-link to="/myorder?mid=11"><span>我的订单</span></router-link>
                <router-link to="#"><span @mouseleave="showpilot=false" @mouseenter="showpilot=true"
                        :class="{select:showpilot}">网站导航</span></router-link>
                <router-link to="" class="myshopcar" v-if="isshowshopcar" :class={select:shopcarshow} @click.native="toshopcar">
                    <div class="shopcarbutton" @mouseenter="changeshopcar"
                        @mouseleave="changeshopcar" @blur="changeshopcar">
                        <span style="min-width:100px;display:flex;flex-flow:row nowrap">
                        <i style="font-size:1.5em;font-weight:bolder;position:relative;"> &#xe635;</i>
                        <i style="font-size:0.7em;font-weight:bold;position:relative;top:-5px;margin-right:3px;font-family:'幼圆'">{{this.$store.state.shopcar.length}}</i>
                        <span style="position:relative;left:-3px;">我的购物车</span>
                        </span>
                    </div>
                    </router-link>
                    <div class="shopcarlist" v-show="shopcarshow" @mouseover="changeshopcar" @mouseout="changeshopcar">
                    <div class="empty" v-if="this.$store.state.shopcar.length<=0">
                        <i class="shopempty"></i>
                        购物车中没有东西，赶紧下单选购吧！
                    </div>
                    <div class="shopcar_item" v-for="(item,index) in shopcar" :key="index">
                        <img :src="item.img" alt="">
                        <div class="shopname">
                            {{item.shopname}}
                        </div>
                        <div class="shopprice">
                            <span class="price">{{item.price}}*{{item.count}}</span>
                            <span class="delete" style="font-size:0.9em">删除</span>
                        </div>
                    </div>
                    <div class="shopcar_bottom">
                        <div class="shopcar_count">共<span class="showcount">{{this.shopcar.length}}</span>件商品,总计<span
                                class="showcount">{{this.shopprice}}</span>元</div>
                        <div class="toshopcar" @click="toshopcar">去购物车</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pilot" v-show="showpilot" @mouseleave="showpilot=false" @mouseenter="showpilot=true">
            <div class="pilot_item">
                <div class="pilot_title first">主题商城</div>
                <div class="pilot_content">
                    <router-link v-for="(item,index) in shopcenter" :key="index" to="item.router">{{item.name}}
                    </router-link>
                </div>
            </div>
            <div class="pilot_item">
                <div class="pilot_title second">维修中心</div>
                <div class="pilot_content">
                    <router-link v-for="(item,index) in fixcenter" :key="index" to="item.router">{{item.name}}
                    </router-link>
                </div>
            </div>
            <div class="pilot_item">
                <div class="pilot_title third">个人中心</div>
                <div class="pilot_content">
                    <router-link v-for="(item,index) in personcenter" :key="index" to="item.router">{{item.name}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "person",
        data() {
            return {
                showpilot: false,
                shopcarshow: false,
                isshowshopcar: true,
                shopcenter: [{
                        router: "",
                        name: "手机"
                    },
                    {
                        router: "",
                        name: "电脑"
                    },
                    {
                        router: "",
                        name: "电视"
                    },
                    {
                        router: "",
                        name: "耳机"
                    }
                ],
                fixcenter: [{
                        router: "",
                        name: "屏幕更换"
                    },
                    {
                        router: "",
                        name: "电池维修"
                    },
                    {
                        router: "",
                        name: "内存扩容"
                    },
                    {
                        router: "",
                        name: "声音问题"
                    }
                ],
                personcenter: [{
                        router: "",
                        name: "余额",
                    },
                    {
                        router: "",
                        name: "优惠券",
                    }
                ]
            }
        },
         computed: {
            shopcar() {
                return this.$store.state.shopcar;
            },
            shopprice() {
                return this.$store.getters.countshopcarprice;
            }
        },
        watch:{
            $route:{
                handler(val,oldval){
                    if(val.path=='/shopcar'){
                        this.isshowshopcar=false
                        console.log(this.isshowshopcar);
                    }else{
                        this.isshowshopcar=true
                    }
                }
            }
        },
        methods: {
           changeshopcar() {
                this.shopcarshow = this.shopcarshow == false ? true : false;
            },
           toshopcar() {
                this.$router.push({
                    name: "shopcar"
                })
                this.shopcarshow=false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{
      position: relative;
      z-index: 9999;
    }
    .personal_info {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;
        width: 200px;
        height: 80px;
        
        img {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            border: 3px double #c2c2c2;
        }

        .outlogin:hover {
            color: #ff4d4d;
            cursor: pointer;
        }
    }

    .person {
        width: 100%;
        height: 40px;
        background: #f2f2f2;
        transition: .5s;
        border: 0;
        color: #b2b2b2;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .select {
            background: white;
            height: 40px;
            line-height: 40px;
            display: inline-block;
            border: 1px solid #c2c2c2;
            border-bottom: 0;
            box-sizing: border-box;
            color: red;
        }

        .login_state_tool {
            min-width: 100px;
            min-height: 35px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            float: right;
            margin-right: 30px;

            .person_info {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                cursor: pointer;

                span {
                    margin-left: 7px;
                    font-size: 0.8em;
                    position: relative;
                    top: 1px;

                }
            }

            a {
                span {
                    margin-left: 5px;
                    font-size: 0.8em;
                    display: block;
                    box-sizing: border-box;
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                }

                span:hover {
                    color: red;
                }
            }
        }
        .myshopcar {
        min-width: 120px;
        min-height: 40px;
        float: left;
        .shopcarbutton {
            width: 150px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            position: relative;
            z-index: 999;
            display: flex;
            flex-flow: row nowrap;
        }

        .shopcarbuttonhover {
            background: white;
            color: #f2f2f2;
            border: 1px solid #f2f2f2;
            border-bottom: 0;
        }
        }
        .shopcarlist {
            width: 350px;
            min-height: 80px;
            position: absolute;
            top: 40px;
            z-index: 9998;
            background: #fff;
            display: flex;
            flex-flow: column nowrap;
            box-shadow:0px 2px 10px #c2c2c2;
            right: 0;
            

            .shopcar_item {
                width: 100%;
                min-height: 80px;
                border-bottom: 1px solid #c2c2c2;
                display: flex;
                color: rgb(19, 19, 19);
                align-items: center;

                img {
                    width: 60px;
                    height: 60px;
                    margin-left: 10px;
                    border: 1px solid #c2c2c2
                }

                .shopname {
                    width: 170px;
                    height: auto;
                    font-size: 0.7em;
                    text-align: left;
                    margin-left: 10px;
                    color: black;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .shopprice {
                    display: flex;
                    flex-flow: column nowrap;
                    height: 40px;
                    width: 70px;
                    margin-left: 5px;
                    justify-content: flex-start;

                    .price {
                        font-size: 0.9em;
                    }

                    .price::before {
                        content: "\e6cb";
                        font-family: iconfont !important;

                    }

                    .delete {
                        font-size: 0.9em;
                        cursor: pointer;
                    }

                    .delete:hover {
                        color: red;
                    }
                }
            }

            .shopcar_bottom {
                width: 100%;
                height: 40px;
                background: #c2c2c2;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-size: 0.8em;
                justify-content: space-between;

                .shopcar_count {
                    min-width: 200px;
                    justify-content: flex-start;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin-left: 15px;
                    color: white;
                }

                .showcount {
                    color: white;
                    font-size: 1.1em;
                    font-weight: bolder;
                    width: 35px;
                    line-height:41px; 
                }

                .toshopcar {
                    width: 85px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    color: white;
                    background: #ff3333;
                    font-weight: bolder;
                    margin-right: 20px;
                    cursor: pointer;
                }
            }
        }
        .empty {
            height: 80px;
            font-size: 1em;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            color: #a2a2a2;
        }

        .shopempty {
            width: 50px;
            height: 50px;
            background: url("../../assets/shopempty.png");
            margin-left: 15px;
        }
        .pilot {
            width: 1218px;
            min-height: 200px;
            background: white;
            position: absolute;
            top: 40px;
            z-index: 1200;
            border: 1px solid #c2c2c2;
            border-top: none;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            .pilot_item:last-child {
                border: 0;
            }

            .pilot_item {
                border-right: 1px solid #c2c2c2;
                min-height: 150px;
                width: 420px;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;

                .first {
                    color: #fc4200;
                }

                .second {
                    color: #9fb838;
                }

                .third {
                    color: #d75696;
                }

                .pilot_title {
                    font-size: 1.1em;
                    //color: black;
                    text-align: left;
                    margin-left: 55px;
                    width: 100%;
                }

                .pilot_content {
                    width: 360px;
                    min-height: 120px;
                    margin-top: 20px;
                    //background: black;
                    display: flex;
                    flex-flow: row wrap;

                    a {
                        width: 65px;
                        height: 20px;
                        font-size: 0.8em;
                        color: black;
                        margin-left: 5px;
                        cursor: pointer;
                    }

                    a:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>