<template>
    <div class="home">
        <personbar />
        <headers />
        <div class="content">
            <div class="topshow">
                <div class="selectmachine">
                    <ul>
                        <router-link v-for="(item,index) in sortList" :key="index" @mouseleave="showMenu('out',index)"
                            @mouseenter="showMenu('in',index)" to="#">
                            <template v-if="index<=6">
                                <li>{{item.name}}/{{item.value}}</li>
                                <div class='sortInfo' :class="'sort'+index">
                                  <ul>
                                      <li class="shopitem" v-for="(shopitem,index) in item.data" :data='shopitem.shopid' :key="index">
                                         <img :src="shopitem.shopimg" alt="加载失败">
                                         <span>{{shopitem.shopname}}</span>
                                      </li>
                                  </ul>
                                </div>
                            </template>
                        </router-link>
                    </ul>
                </div>
                <div class="showimg">
                    <swiper :options="swiperOption" ref="homeswipers">
                        <swiper-slide v-for="(items,index) in homeswiper" :key="index" :color="items.color">
                            <router-link :to="items.router"><img :src="items.src" alt="图片加载失败"></router-link>
                        </swiper-slide>
                    </swiper>
                    <div class="imgpagination"></div>
                    <div class="imgnext"></div>
                    <div class="imgprev"></div>
                </div>
                <div class="person_center_list">
                    <div class="person_center_head">
                        引导登录或个人中心
                    </div>
                    <div class="toLogin">
                        <!-- 预留未登录块 -->
                    </div>
                    <div class="functionList">
                        <ul>
                            <li v-for="(item, index) in elseFunction" :key="index" @click="unopen()">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href='item.icon'></use>
                                </svg>
                                <span>{{item.value}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shopshow_bar">
                <div class="shopshow_title">发现好货</div>
                <div class="controlpn">
                    <div class="control_prev"><i>&#xe656;</i></div>
                    <div class="control_next"><i>&#xe60a;</i></div>
                </div>
            </div>
            <div class="shopshow">
                <div class="shopshow_right">
                    <div class="wrapper" ref="wrapper">
                        <ul ref="scroll">
                            <swiper :options="shopshowoption" ref="shopshow">
                                <swiper-slide>
                                    <li>
                                        <img src="../assets/ryzhp.jpg" alt="" srcset="">
                                        <span class="shop_name">华为 鸿蒙系统 荣耀智慧屏</span>
                                        <span class="shopdes">国民电视！中国人自己的系统！</span>
                                        <span class="shopprice">3999</span>
                                    </li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>
                                        <img src="../assets/phone/mate30pro.png" alt="" srcset="">
                                        <span class="shop_name">华为Mate 30 Pro</span>
                                        <span class="shopdes">双模5G 快速到达</span>
                                        <span class="shopprice">4999</span>
                                    </li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>
                                        <img src="../assets/phone/oneplus7pro.jpg" alt="" srcset="">
                                        <span>一加7Pro</span>
                                    </li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>
                                        <img src="../assets/phone/xiaomi9pro.jpg" alt="" srcset="">
                                        <span>小米9Pro 5G版</span>
                                    </li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>5</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>6</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>7</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>8</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>9</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>10</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>11</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>12</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>13</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>14</li>
                                </swiper-slide>
                                <swiper-slide>
                                    <li>15</li>
                                </swiper-slide>
                            </swiper>

                        </ul>
                        <div class="swiper-scrollbar" ref="scrollbar"></div>
                    </div>
                </div>
            </div>
            <!-- 热门手机 -->
            <div class="hot_items">
                <div class="hot_floor_show phoneshow">
                    <div class="floor first_floor">1F 精品手机</div>
                </div>
                <div class="official_recommend">
                    <div class="topshop_swiper">
                        <swiper :options="topphoneOption" ref="topphoneswipers">
                            <swiper-slide v-for="(items,index) in homeswiper" :key="index">
                                <router-link :to="items.router"><img :src="items.src" alt="图片加载失败"></router-link>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="topshop_items">

                    </div>
                </div>
                <div class="official_recommend_second">
                    <div class="topshop_items">

                    </div>
                    <div class="topshop_items">

                    </div>
                    <div class="topshop_items">

                    </div>
                </div>
                <div class="topshop_show">
                    <div class="topshop_head">
                        TOP榜单
                    </div>
                    <router-link to="#">
                        <div class="topshop_items">
                            <div class="topcount">1</div>
                            <div class="topcontent">
                                <el-image style="width:120px;height:90px;" src="../assets/battery.png" fit="cover">
                                </el-image>
                                <div class="topshop_content">
                                    <div class="shop_name">testtesttesttesttesttesttesttesttesttesttesttesttesttest
                                    </div>
                                    <div class="shop_des">test test</div>
                                    <div class="shop_price">1230</div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="#">
                        <div class="topshop_items">
                            <div class="topcount">2</div>
                            <div class="topcontent"></div>
                        </div>
                    </router-link>
                    <router-link to="#">
                        <div class="topshop_items">
                            <div class="topcount">3</div>
                            <div class="topcontent"></div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="shopshow_bar">
                <div class="shopshow_title">热门维修项目</div>
            </div>
            <div class="fixshow">
                <div class="fixshow_bottom">
                    <router-link to="/fixfirst" style="background:#c2c4b6">
                        <div class="fixsort">
                            <div class="fixsort_top">
                                <span class="subtitle">
                                    更持久
                                </span>
                                <span class="title">
                                    电池维修/升级
                                </span>
                            </div>
                            <img src="../assets/battery.png" alt="">
                        </div>
                    </router-link>
                    <router-link to="/fixfirst" style="background:#abb6c8">
                        <div class="fixsort">
                            <div class="fixsort_top">
                                <span class="subtitle">
                                    救救手机
                                </span>
                                <span class="title">
                                    屏幕更换/内外屏维修
                                </span>
                            </div>
                            <img src="../assets/screen.png" alt="">
                        </div>
                    </router-link>
                    <router-link to="/fixfirst" style="background:#dadada">
                        <div class="fixsort">
                            <div class="fixsort_top">
                                <span class="subtitle">
                                    更大
                                </span>
                                <span class="title">
                                    内存更换/扩容
                                </span>
                            </div>
                            <img src="../assets/add-neicun.png" alt="">
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="recommend">
                <div class="loadtitle">为你推荐</div>
                <div class="shopshow commend_shop" ref="commend_shop">

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "home",
        data() {
            var myvue = this
            return {
                homeswiper: [{
                        src: require("../assets/index_background/1.jpg"),
                        color: "#0c1124",
                        router: "#"
                    },
                    {
                        src: require("../assets/index_background/2.webp"),
                        color: "#c5e3ed",
                        router: "#"
                    },
                    {
                        src: require("../assets/index_background/3.webp"),
                        color: "#bedde0",
                        router: "#"
                    }
                ],
                elseFunction: [{
                        icon: '#icon-fuzhouditie',
                        value: '地铁',
                    },
                    {
                        icon: '#icon-chengshi',
                        value: '城市',
                    },
                    {
                        icon: '#icon-tianqi',
                        value: '天气',
                    },
                    {
                        icon: '#icon-database',
                        value: '数据库',
                    },
                    {
                        icon: '#icon-luntanxuanze',
                        value: '论坛',
                    },
                    {
                        icon: '#icon-huoche',
                        value: '高铁',
                    },
                    {
                        icon: '#icon-remen1',
                        value: '福城热搜'
                    },
                ],
                swiperOption: { //swiper3
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    keyboard: true,
                    speed: 1000,
                    loop: true,
                    pagination: {
                        el: '.imgpagination',
                    },
                    navigation: {
                        nextEl: '.imgnext',
                        prevEl: '.imgprev',
                    }
                },
                topphoneOption: {
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    speed: 1500,
                },
                topshopOption: {
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    speed: 1500,
                },
                shopshowoption: {
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: '.control_next',
                        prevEl: '.control_prev',
                        hideOnClick: true
                    },
                    speed: 1200,
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                },
                swipercolor: [
                    "#e53935", //红
                    "#00c0a5", //薄荷绿
                    "#ffac13", //橙色
                    "#2196f3", //蓝色
                    "#83c44e", //绿色
                ]
            }
        },
        methods: {
            //懒加载函数
            load() {
                let arr = this.loadingcommends();
                arr.forEach((proxy, index) => {
                    this.getdata(function (data) {
                        proxy.set(data[index].url, data[index].title)
                    })
                })
            },
            //获取数据的方法
            getdata(callback) {
                this.$http.get("http://jsonplaceholder.typicode.com/photos")
                    .then((data) => {
                        callback(data.data)
                    })
            },
            // 展示目前的分类信息
            showMenu(type, key) {
                if (type === 'in') {
                    document.getElementsByClassName(`sort${key}`)[0].style.display = 'block'
                } else if (type === 'out') {
                    document.getElementsByClassName(`sort${key}`)[0].style.display = 'none'
                }
            },
            //创建加载图片
            loadingcommends() {
                let arr = []
                for (let index = 0; index < 10; index++) {
                    let cdiv = document.createElement('div');
                    cdiv.innerHTML =
                        `<div class="commend_top">
                    </div>
                    `;
                    let i = Math.floor(this.$refs.commend_shop.childNodes.length / 10) * 10 + index;
                    i = (i + 1) % 10 == 0 && i != 0 ? i -= 10 : i;
                    let parendNode = document.getElementsByClassName("commend_top");
                    if (this.$refs.commend_shop.childNodes.length <= 50) {
                        this.$refs.commend_shop.appendChild(cdiv)
                        //插入图片对象
                        let init = this.virtual.init(parendNode, i);
                        arr.push(init);
                    } else {
                        if (document.getElementsByClassName("commend_over")[0] == undefined) {
                            cdiv.innerHTML =
                                `<div class="commend_over">
                        已经到底啦~
                    </div>`;
                            this.animate.stoploading();
                            this.$refs.commend_shop.appendChild(cdiv);
                        }
                    }
                }
                return arr;
            },
            getnews() {
                window.onscroll = () => {
                    let sh = document.documentElement.scrollHeight || document.body.scrollHeight
                    let bh = document.documentElement.scrollTop || document.body.scrollTop;
                    let ch = document.documentElement.clientHeight || document.body.clientHeight;
                    if (sh == bh + ch && document.getElementsByClassName("loadinganimate")[0] == undefined && window
                        .navigator.onLine && this.$route.path == '/') {
                        if (document.getElementsByClassName("commend_over")[0] == undefined) {
                            this.animate.loading("commend_shop")
                            setTimeout(() => {
                                this.load();
                            }, 500);
                            setTimeout(() => {
                                this.animate.stoploading()
                            }, 500);
                        }
                    } else if (sh == bh + ch && !window.navigator.onLine) {
                        this.$message({
                            type: "error",
                            message: "无网络,请连接网络后再试",
                            duration: 2000
                        })
                    }
                }
            },
            /**用于循环美化轮播板块 */
            beautiswiper() {
                let i = 0;
                this.$refs.scroll.childNodes[0].childNodes[1].childNodes.forEach(e => {
                    if (i > this.swipercolor.length) i = 0;
                    e.childNodes[0].style.borderTop = "1px solid" + this.swipercolor[i++];
                })
            },
            unopen () {
              this.$message({
                message: '该功能暂未开放,稍后福城建设将为您提供更多服务',
                duration: 1500,
                type: 'error'
              })
            }
        },
        computed: {
            sortList() {
                return this.$store.state.sortList
            }
        },
        mounted() {
            this.getnews();
            this.beautiswiper();
        },
        activated() {
            this.getnews();
        }
    }
</script>

<style lang="scss">
    .home {
        width: 100%;
        height: auto;
        z-index: 2;
    }

    img:hover {
        filter: grayscale(2px)
    }

    //  topshow start
    .topshow {
        width: 100%;
        height: 420px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 35px;
        position: relative;

        .top_show_left {
            background: #0084ff;
            width: calc(100% - 1080px);
        }

        .swiper-container {
            height: 420px;
        }

        .selectmachine {
            width: 170px;
            height: 420px;
            background: rgba(255, 255, 255, 1);

            ul {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                list-style: none;
                height: 450px;
            }

            .sortInfo {
                width: calc(100% - 170px);
                min-height: 420px;
                background: white;
                position: absolute;
                right: 0;
                top: 0;
                display: none;
                box-shadow: 1px 5px 10px #d2d2d2;
                z-index: 9999;
            }

            a {
                width: 100%;
                height: 55px;
                line-height: 55px;

                &:hover {
                    li {
                        background: #ff3333;
                        color: white;
                        font-weight: bold;
                    }

                    .sortInfo {
                        display: block;
                    }
                }
            }

            li {
                cursor: pointer;
                width: 100%;
                display: inline-block;
                transition: .2s;
                font-family: "微软雅黑";
                color: #000;
                font-size: 0.9em;
            }
        }

        .showimg {
            width: calc(100% - 420px);
            height: 420px;
            background: white;
            position: relative;
            //top: 0;
            z-index: 1;

            img {
                width: 100%;
                height: 420px;
            }
        }

        .person_center_list {
            width: 230px;
            height: 420px;
            background: white;

            .title {
                height: auto;
                padding: 5px 0;
            }

            .person_center_head {
                margin: auto;
                width: 215px;
                height: 120px;
                border-bottom: 1px solid #f2f2f2;
            }

            .functionList {
                width: 215px;
                margin: auto;
                margin: 10px 0;
                height: 310px;

                ul {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    list-style: none;
                    li{
                        margin-left: 10px;
                        width: 60px;
                        height: 70px;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-around;
                        align-items: center;
                        font-size:0.8em;
                        cursor: pointer;
                        .icon{
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }

        .imgnext,
        .imgprev {
            width: 30px;
            height: 35px;
            background: rgba(0, 0, 0, 0.3);
            z-index: 999;
            position: absolute;
            top: 220px;
            float: left;
            cursor: pointer;
            outline: 0;
        }

        .imgnext:hover,
        .imgprev:hover {
            background: rgba(0, 0, 0, 0.6);
        }

        .imgnext::before {
            content: "\e633";
            font-family: iconfont !important;
            position: absolute;
            width: 30px;
            height: 35px;
            left: 0;
            line-height: 35px;
            font-size: 1.5em;
            font-weight: bold;
            color: white;
        }

        .imgprev::before {
            content: "\e710";
            font-family: iconfont !important;
            position: absolute;
            width: 30px;
            height: 35px;
            left: 0;
            line-height: 35px;
            font-size: 1.5em;
            font-weight: bold;
            color: white;
        }

        .imgnext {
            right: 0px;
            border-top-left-radius: 45%;
            border-bottom-left-radius: 45%;
        }

        .imgprev {
            border-top-right-radius: 45%;
            border-bottom-right-radius: 45%;
        }

        .imgpagination {
            position: relative;
            top: -35px;
            left: 35px;
            z-index: 999;

            span {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba($color: black, $alpha: 0.8);
                float: left;
                margin-left: 8px;
                border: 2px solid #d2d2d2;
            }

            .swiper-pagination-bullet-active {
                background: white;
                border: 1px solid rgba($color: #a2a2a2, $alpha: 0.3);
                position: relative;
                top: 1px;
            }
        }
    }

    //topshop end
    //hotitem begin
    .hot_items {
        width: 100%;
        height: 350px;
        border: 1px solid #f2f2f2;
        margin-top: 25px;
        display: flex;
        flex-flow: row nowrap;
        background: white;

        .hot_floor_show {
            width: 235px;
            height: 350px;
            border-right: 1px solid #f2f2f2;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;

            .floor {
                width: 150px;
                height: 45px;
                font-weight: bolder;
                color: white;
                line-height: 45px;
                font-size: 1.1em;
            }

            .first_floor {
                background: #05948e;
            }

            .second_floor {
                background: #dca20a;
            }
        }

        .phoneshow {
            background: #06beb6;
            /* fallback for old browsers */
            background: -webkit-linear-gradient(to bottom, #48b1bf, #06beb6);
            background: linear-gradient(to bottom, #48b1bf, #06beb6);
        }

        .shopshow {
            background: #fceabb;
            /* fallback for old browsers */
            background: -webkit-linear-gradient(to bottom, #f8b500 60%, #fef7e7);
            /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to bottom, #f8b500 60%, #fef7e7);
            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            margin: 0;
        }

        .official_recommend {
            width: 390px;
            height: 350px;
            border-right: 1px solid #f2f2f2;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            align-items: center;

            .topshop_swiper {
                width: 380px;
                height: 200px;
                margin: 8px;

                .swiper-slide {
                    height: 200px;

                    img {
                        width: 380px;
                        height: 200px;
                    }
                }
            }

            .topshop_items {
                width: 390px;
                height: 125px;
                border: 1px solid #f2f2f2;
                margin-top: -10px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                align-items: center;
                cursor: pointer;
                border-left: 0;
                border-right: 0;
                border-bottom: 0;

                .topshop_content {
                    width: 180px;
                    height: 125px;

                    .shop_name {
                        width: 90%;
                        height: 25px;
                        text-overflow: ellipsis;
                        white-space: none;
                        overflow: hidden;
                        padding-top: 10px;
                        font-size: 1.2em;
                        line-height: 25px;
                        text-align: left;
                    }

                    .shop_des {
                        font-size: 1em;
                        width: 90%;
                        height: 25px;
                        line-height: 25px;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: none;
                        overflow: hidden;
                    }

                    .shop_price {
                        width: 90%;
                        height: 30px;
                        font-size: 1.3em;
                        color: red;
                        text-align: left;
                        margin-top: 15px;
                    }

                    .shop_price::before {
                        content: "¥";
                    }
                }
            }
        }

        .official_recommend_second {
            width: 275px;
            height: 350px;
            border-right: 1px solid #f2f2f2;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

            .topshop_items {
                width: 275px;
                border: 1px solid #f2f2f2;
                border-left: 0;
                border-right: 0;
                height: 115px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                align-items: center;

                .topshop_content {
                    width: 150px;
                    height: 115px;

                    .shop_name {
                        width: 90%;
                        height: 25px;
                        text-overflow: ellipsis;
                        white-space: none;
                        overflow: hidden;
                        padding-top: 10px;
                        font-size: 1.1em;
                        line-height: 25px;
                        text-align: left;
                    }

                    .shop_des {
                        font-size: 0.9em;
                        width: 90%;
                        height: 25px;
                        line-height: 25px;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: none;
                        overflow: hidden;
                    }

                    .shop_price {
                        width: 90%;
                        height: 30px;
                        font-size: 1.2em;
                        color: red;
                        text-align: left;
                        margin-top: 15px;
                    }

                    .shop_price::before {
                        content: "¥";
                    }
                }
            }

            .topshop_items:nth-child(1) {
                border-top: 0;
                border-bottom: 0;
            }

            .topshop_items:nth-child(3) {
                border-top: 0;
                border-bottom: 0;
            }
        }

        .topshop_show {
            width: 380px;
            height: 350px;

            .topshop_head {
                width: calc(100%-20px);
                height: 50px;
                font-size: 1.2em;
                color: red;
                line-height: 50px;
                text-align: left;
                padding-left: 20px;
                border-bottom: 1px solid #f2f2f2;
            }

            .topshop_items {
                width: 100%;
                height: 99px;
                border: 1px solid #f2f2f2;
                border-left: 0;
                border-right: 0;
                margin-top: -1px;
                display: flex;
                flex-flow: row nowrap;

                .topcount {
                    width: 80px;
                    height: 100px;
                    line-height: 100px;
                    font-size: 2.5em;
                    font-weight: bolder;
                    color: transparent;
                    background: #06beb6;
                    -webkit-background-clip: text !important;
                    position: relative;
                }

                .topcontent {
                    width: 300px;
                    height: 100px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-around;
                    align-items: center;

                    .topshop_content {
                        width: 150px;
                        height: 115px;

                        .shop_name {
                            width: 90%;
                            height: 25px;
                            text-overflow: ellipsis;
                            white-space: none;
                            overflow: hidden;
                            padding-top: 10px;
                            font-size: 1.2em;
                            line-height: 25px;
                            text-align: left;
                        }

                        .shop_des {
                            font-size: 1em;
                            width: 90%;
                            height: 25px;
                            line-height: 25px;
                            text-align: left;
                            text-overflow: ellipsis;
                            white-space: none;
                            overflow: hidden;
                        }

                        .shop_price {
                            width: 90%;
                            height: 30px;
                            font-size: 1.3em;
                            color: red;
                            text-align: left;
                            margin-top: 15px;
                        }

                        .shop_price::before {
                            content: "¥";
                        }
                    }
                }
            }

            a:nth-child(2) {
                border-top: 0;

                .topcount {
                    background: #ff7e5f;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #feb47b, #ff7e5f);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                }

                .topcount::before {
                    content: "\e6b1";
                    font-family: "iconfont" !important;
                    font-size: 0.6em !important;
                    color: #fad530;
                    position: absolute;
                    top: -20px;
                    left: 5px;
                    font-weight: lighter;
                }
            }

            a:nth-child(3) {
                .topcount {
                    font-size: 2.2em;
                    background: #00c3ff;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #ffff1c, #00c3ff);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #ffff1c, #00c3ff);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                }
            }

            a:nth-child(4) {
                border-top: 0;
                border-bottom: 0;

                .topcount {
                    font-size: 1.8em;
                    background: #bdc3c7;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #2c3e50, #bdc3c7);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                }
            }
        }
    }

    //hotitem end
    .shopshow_bar {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
        .shopshow_title {
            float: left;
            width: 150px;
            height: 25px;
            margin-bottom: 10px;
            font-size: 1.3em;
            text-align: left;
        }
    }

    .controlpn {
        display: flex;
        flex-flow: row nowrap;
        width: 60px;
        height: 25px;
        float: right;
        background: #fff;
        margin-right: 30px;

        .control_prev,
        .control_next {
            width: 30px;
            height: 25px;
            border: 1px solid #f2f2f2;
            line-height: 25px;
            text-align: center;
            cursor: pointer;
            outline: 0;

            i {
                color: #d2d2d2;
                transition: .2s;
            }
        }

        .control_prev:hover,
        .control_next:hover {
            i {
                color: #000;
            }
        }

    }

    // shopshow start
    .shopshow {
        width: 100%;
        height: 320px;
        //margin-bottom: 30px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .shopshow_left {
            width: 215px;
            height: 300px;
            background-size: 100% 100%;
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            display: flex;
            flex-flow: column nowrap;

            .decorator {
                width: 80px;
                height: 80px;
                border: 2px solid #fff;
                margin-left: 68.5px;
                border-color: transparent transparent #fff transparent;
                position: relative;
                top: -50px;
                border-radius: 50%;
            }

            .title {
                width: 100px;
                height: 50px;
                color: #fff;
                font-size: 1.5em;
                font-weight: bolder;
                position: relative;
                top: -50px;
                font-family: "等线";
            }
        }

        .shopshow_right {
            width: 100%;
            height: 320px;
            overflow: hidden;
            background: #f4f4f4;

            .swiper-slide {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
            }

            .wrapper {
                width: 100%;
                height: 300px;
                background: #fff;

                ul {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                    list-style-type: none;
                    height: 300px;
                    background: #f4f4f4;

                    //     .swiper-slide:first-child{
                    //         li{
                    //             margin-left: 0;
                    //         }
                    //     }
                    // .swiper-slide:nth-of-type(6n){
                    //     li{
                    //         margin-left: 0;
                    //     }
                    //}
                    li {
                        background: white;
                        width: 235px;
                        height: 300px;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                        align-items: center;
                        //margin-left: 15px;
                        border-top: 1px solid #0084ff;
                        cursor: pointer;

                        img {
                            width: 150px;
                            height: 150px;
                        }

                        .shop_name {
                            z-index: 999;
                            color: #000;
                            height: 30px;
                            font-family: "等线";
                            font-size: 1em;
                            margin-top: 6px;
                        }

                        .shopdes {
                            z-index: 999;
                            color: #00303c;
                            font-family: "等线";
                            height: 30px;
                            font-size: 0.8em;
                            margin-top: 6px;
                        }

                        .shopprice {
                            height: 30px;
                            font-size: 1.1em;
                            margin-top: 3px;
                        }

                        .shopprice::before {
                            content: "¥";
                        }
                    }


                }
            }
        }
    }

    // shopshow end
    //fixshow start
    .fixshow {
        width: 1280px;
        height: 300px;
        margin-bottom: 30px;
        display: flex;
        flex-flow: column nowrap;

        .fixshow_top {
            width: 100%;
            height: 60px;
            background: #fff;

            .title {
                width: 100px;
                height: 60px;
                font-size: 1.5em;
                font-weight: lighter;
                color: black;
                font-family: "等线";
                line-height: 60px;
                float: left;
                margin-left: 35px;
            }
        }

        .fixshow_bottom {
            width: 100%;
            height: 360px;
            display: flex;
            flex-flow: row nowrap;

            a {
                flex: 1;
                height: 300px;

                .fixsort_top {
                    width: 100%;
                    height: 80px;
                    margin-top: 50px;

                    .subtitle {
                        color: #767f90;
                        font-size: 1.1em;
                        display: block;
                        width: 100%;
                        text-align: center;
                        font-family: "等线";
                    }

                    .title {
                        color: black;
                        font-size: 1.3em;
                        display: block;
                        width: 100%;
                        text-align: center;
                        margin-top: 10px;
                        font-family: "等线";
                        width: 100pz;
                        height: auto;

                    }
                }

                img {
                    width: 60px;
                    height: 120px;
                }
            }
        }
    }

    .homebutton {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        border: 1px solid red;
        float: left;
        margin-left: 15px;
        position: relative;
        top: 50%;
        margin-top: -10px;
    }

    .homebutton::before {
        content: "\e633";
        font-family: iconfont !important;
        position: absolute;
        color: red;
        top: -8px;
        left: -1px;
    }

    //fixshow end
    // recommend start
    .recommend {
        height: auto;
        width: 1280px;
        margin: 30px auto;

        .loadtitle {
            font-size: 1.5em;
            font-weight: light;
            font-family: "等线";
            margin-top: 60px;
        }

        .loadtitle::before {
            content: "";
            width: 25px;
            height: 25px;
            position: absolute;
            margin-left: -35px;
            background: url("../assets/tuijian.png") no-repeat;
        }

        .loadtitle::after {
            content: "";
            width: 25px;
            height: 25px;
            position: absolute;
            margin-left: 15px;
            background: url("../assets/tuijian.png") no-repeat;
            background-position: right;
        }

        .shopshow {
            width: 100%;
            margin: auto;
            height: auto;
            margin-top: 25px;
            //background: #767f90;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: center;

            div:nth-of-type(6n-5) {
                .commend_top {
                    margin-left: 0px;
                }
            }

            div:first-child {
                .commend_top {
                    margin-left: 0px;
                }
            }

            .commend_top {
                width: 190px;
                height: 266px;
                background: white;
                margin-top: 10px;
                margin-left: 17px;
                transition: .3s;
                cursor: pointer;
                position: relative;
                top: 0;

                img {
                    width: 150px;
                    height: 150px;
                    margin: auto;
                    margin-top: 10px;
                    background: #f2f2f2;
                    border: 0;
                }

                .commend_bottom {
                    width: 160px;
                    height: 60px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    background: #f2f2f2;
                    margin: auto;
                    margin-top: 20px;
                    cursor: pointer;

                }
            }

            .commend_top:hover {
                box-shadow: 0px 0px 20px #d2d2d2;
                top: -2px;
            }

            .commend_over {
                width: 1280px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 10px;
                color: #b2b2b2;
            }
        }
    }

    // recommend end
    .loadinganimate {
        width: 100%;
        height: 35px;
        background: url("../assets/loading/loading.gif") no-repeat center;
        background-size: contain;
        margin-top: 10px;
    }
</style>