<template>
    <div class="header" :class="{'min-head':isscale,'search-min-head':issearch}">
        <div class="content">
            <div class="left logo">
                <router-link to="/">
                    <div class="logo_top">FCJS FIX</div>
                    <div class="logo_bottom">福城建设-手机维修</div>
                </router-link>
            </div>
            <div class="headright">
                <div class="right_top">
                    <div class="search">
                        <div class="searchinput">
                            <div class="hoticon" v-if="!isselect">
                                <i>&#xe6a6;</i>
                            </div>
                            <input type="text" v-model="search" placeholder="iPhone8 Plus" @keyup.enter="searchto"
                                @change="changeselect" @blur="changeselect" />
                            <div class="searchbutton" @click="searchto">
                                <i>&#xe623;</i>
                            </div>
                            <div class="hotsearch">
                                <ul>
                                    <router-link to="/fixfirst">
                                        <li style="color:#ff4d4d;">屏幕维修</li>
                                    </router-link>
                                    <router-link to="/fixfirst">
                                        <li>电池更换</li>
                                    </router-link>
                                    <router-link to="/search?search=iPhone 7 PLUS">
                                        <li>iPhone 7 PLUS</li>
                                    </router-link>
                                    <router-link to="/search?search=iPhone XR">
                                        <li>iPhone XR</li>
                                    </router-link>
                                    <router-link to="/search?search=小米9">
                                        <li>小米9</li>
                                    </router-link>
                                    <router-link to="/fixfirst">
                                        <li>进水</li>
                                    </router-link>
                                    <router-link to="/fixfirst">
                                        <li>死机</li>
                                    </router-link>
                                </ul>
                            </div>
                            <div class="searchresult" v-if="showresult"></div>
                        </div>
                    </div>
                    <div class="myshopcar">
                        <router-link to="/shopcar">
                            <div class="shopcarbutton" :class={shopcarbuttonhover:shopcarshow}
                                @mouseenter="changeshopcar" @mouseleave="changeshopcar" @blur="changeshopcar">
                                <i style="font-size:1.5em;font-weight:bolder;position:relative;left:-5px;"> &#xe635;</i>
                                <i style="font-size:0.7em;font-weight:bold;position:relative;top:-10px;left:-5px;margin-right:3px;font-family:'幼圆'">{{this.$store.state.shopcar.length}}</i>
                                <span style="position:relative;top:-3px;">我的购物车</span>
                            </div>
                        </router-link>
                        <div class="shopcarlist" v-show="shopcarshow" @mouseover="changeshopcar"
                            @mouseout="changeshopcar">
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
                                <div class="shopcar_count">共<span class="show">{{this.shopcar.length}}</span>件商品,总计<span
                                        class="show">{{this.shopprice}}</span>元</div>
                                <div class="toshopcar" @click="toshopcar">进入购物车</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right_bottom">
                    <ul>
                        <router-link to="/getcoupon">
                            <li class="hotmenu">优惠券</li>
                        </router-link>
                        <router-link to="#">
                            <li>回收</li>
                        </router-link>
                        <router-link to="/fixfirst">
                            <li>维修</li>
                        </router-link>
                        <span @click="$router.push({name:'search',query:{newtype:'old'}})">
                            <li>福城优品(优质二手商品)</li>
                        </span>
                        <router-link to="/more">
                            <li>更多</li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["searchs"],
        props: ["isopen"],
        data() {
            return {
                hotsearch: [

                ],
                search: this.searchs,
                showresult: false,
                isselect: false,
                shopcarshow: false,
                isscale: false,
                issearch: false,
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
        methods: {
            changeselect() {
                if (this.search.length == 0) {
                    this.isselect = false;
                } else {
                    this.isselect = true;
                }
            },
            searchto() {
                this.$router.push({
                    name: "search",
                    query: {
                        search: this.search
                    }
                })
                this.search=""
            },
            changeshopcar() {
                this.shopcarshow = this.shopcarshow == false ? true : false;
            },
            inithead() {
                this.search = this.$props.searchs && this.$props.searchs.length != 0 ? this.$props.searchs : ""
                if (this.$props.searchs && this.$props.searchs.length) {
                    this.isselect = true;
                    this.isscale = true
                    this.issearch = true
                }
            },
            toshopcar() {
                this.$router.push({
                    name: "shopcar"
                })
            }
        },
        watch: {
            search: function (value) {
                if (this.search.length == 0) {
                    this.isselect = false;
                    this.showresult = false;
                } else{
                    this.isselect = true;
                    this.showresult = true;
                }
            }
        },
        mounted() {
            this.inithead()
            window.onscroll = () => {
                if (!this.$props.searchs && document.documentElement.scrollTop >= 170 && document
                    .documentElement.scrollHeight >= 900 && this.$props.isopen) {
                    this.isscale = true;
                } else if (!this.$props.searchs && document.documentElement.scrollTop < 170) {
                    this.isscale = false;
                }
            }
            console.log(this.$route.name=="search");
        }
    }
</script>

<style lang="scss" scoped>
    $main-color:#00303c;

    .header {
        background: white;
        width: 100%;
        height: 180px;
        border-bottom: 1px solid #d2d2d2;
    }

    //  logo begin
    .logo {
        float: left;
        position: relative;
        top: 50%;
        height: 95px;
        margin-top: -40px;
        margin-left: 50px;
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        -webkit-background-clip: text;

        .logo_top {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 3em;
            color: transparent;
            font-weight: bolder;
        }

        .logo_bottom {
            font-family: '幼圆';
            font-size: 1.1em;
            color: transparent;
            margin-top: 5px;
            height: auto;
            font-weight: normal;
        }
    }

    //  logo end
    //search begin
    .search {
        width: 650px;
        min-height: 130px;
        float: left;
        position: relative;
        left: 90px;
    }

    .searchinput {
        width: 650px;
        border: 2px solid $main-color;
        height: 35px;
        position: absolute;
        top: 50%;
        margin-top: -17.5px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        .hoticon {
            width: 25px;
            height: 35px;
            color: #f02d63;
            transition: .5s;
        }

        i {
            font-size: 1em;
            display: block;
            height: 35px;
            line-height: 35px;
            margin-left: 5px;
            transition: .5s;
        }

        input {
            height: 35px;
            outline: 0;
            width: 580px;
            border: 0;
            font-size: 1em;
            font-family: '等线';
            color: #3b3b3b;
            padding-left: 5px;
        }

        .searchbutton {
            width: 35px;
            height: 35px;
            color: #fff;
            background: $main-color;
            position: absolute;
            right: 0;
            cursor: pointer;
            z-index: 999;
        }

        .searchbutton:hover {
            background: rgb(0, 63, 78);
        }

        .hotsearch {

            width: 650px;
            height: 30px;
            position: absolute;
            top: 40px;

            ul {
                width: 600px;
                height: 30px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                list-style-type: none;
            }

            li {
                cursor: pointer;
                font-size: 0.8em;
                color: #b2b2b2;
            }

            li:hover {
                color: #ff4d4d;
            }
        }

        .searchresult {
            width: 620px;
            min-height: 50px;
            background: #fff;
            z-index: 999;
            position: absolute;
            top: 37px;
            left: -3px;
            border: 1px solid #b2b2b2;
            border-top: 0;
        }
    }

    //search end
    //shopcar begin
    .myshopcar {
        min-width: 150px;
        min-height: 200px;
        float: left;
        position: relative;
        left: 140px;

        .shopcarbutton {
            width: 150px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            background: $main-color;
            cursor: pointer;
            margin-top: 48px;
            position: relative;
            z-index: 999;
        }

        .shopcarbuttonhover {
            background: white;
            color: $main-color;
            border: 1px solid $main-color;
            border-bottom: 0;

        }

        @keyframes buttonhover {}

        .shopcarlist {
            width: 350px;
            min-height: 80px;
            position: relative;
            left: -200px;
            top: -2px;
            z-index: 10;
            background: #fff;
            border: 1px solid $main-color;
            display: flex;
            flex-flow: column nowrap;

            .shopcar_item {
                width: 100%;
                min-height: 80px;
                border-bottom: 1px solid #d2d2d2;
                display: flex;
                align-items: center;

                img {
                    width: 60px;
                    height: 60px;
                    margin-left: 10px;
                    border: 1px solid #d2d2d2
                }

                .shopname {
                    width: 180px;
                    height: auto;
                    font-size: 0.7em;
                    text-align: left;
                    margin-left: 10px;
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
                background: #d2d2d2;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-size: 0.8em;
                justify-content: space-between;

                .shopcar_count {
                    margin-left: 15px;
                }

                .show {
                    color: #00303c;
                    font-size: 1.1em;
                    font-weight: bolder;
                }

                .toshopcar {
                    width: 80px;
                    height: 25px;
                    line-height: 25px;
                    color: white;
                    background: #00303c;
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
            background: url("../assets/shopempty.png");
            margin-left: 15px;
        }
    }

    // shopcar end
    //right begin
    .headright {
        float: left;
        height: 180px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        //align-items: center;
        margin-left: 20px;

        .right_top {
            height: 130px;
        }

        .right_bottom {
            width: 700px;
            height: 50px;
            margin-left: 50px;
            z-index: 1;

            ul {
                float: left;
                list-style: none;
                height: 50px;
                line-height: 50px;
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
            }

            li {
                height: 50px;
                cursor: pointer;
                font-size: 1em;
            }

            li:hover {
                color: #ff4d4d;
            }
        }
    }

    //right end
    .hotmenu {
        color: #ff4d4d;
    }

    // 缩放头部
    .min-head {
        height: 90px;
        border-bottom: 2px solid $main-color;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 1999;

        .left {
            line-height: 90px;

            .logo_top {
                font-size: 2.5em;
            }

            .logo_bottom {
                display: none;
            }
        }

        .headright {
            height: 90px;

            .right_top {
                height: 90px;
            }

            .search {
                min-height: 90px;
                line-height: 90px;
            }

            .hotsearch {
                display: none;
            }

            .myshopcar {
                min-height: 90px;
                line-height: 90px;

                .shopcarbutton {
                    margin-top: 28px;
                }
            }

            .right_bottom {
                display: none;
            }
        }
    }

    .search-min-head {
        position: relative;
    }
</style>