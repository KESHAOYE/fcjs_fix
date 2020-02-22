<template>
    <div class="home">
        <personbar />
        <headers />
        <div class="content">
            <div class="topshow">
                <div class="selectmachine">
                    <ul>
                        <a v-for="(item,index) in sortList" :key="index" @mouseleave="showMenu('out',index)"
                            @mouseenter="showMenu('in',index)">
                            <template v-if="index<=6">
                                <li>{{item.sortname}}/{{item.sortename}}</li>
                                <div class='sortInfo' :class="'sort'+index">
                                    <ul>
                                        <li class="shopitem" v-for="(shopitem,indexs) in item.data" :key="indexs"
                                            @click="toshop(shopitem)">
                                            <img :src="shopitem.shopimg" alt="加载失败">
                                            <span>{{shopitem.shopname}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </a>
                    </ul>
                </div>
                <div class="showimg">
                    <swiper :options="swiperOption" ref="homeswipers">
                        <swiper-slide v-for="(items,index) in homeswiper" :key="index">
                            <img :src="items.adimg" alt="图片加载失败">
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
                                <swiper-slide v-for='(item,index) in recomment' :key='index'>
                                    <li @click="toshop(item)">
                                        <img :src="item.adimg" alt="图片加载失败" srcset="">
                                        <span class="shop_name">{{item.shopname}}</span>
                                        <span class="shopdes">{{item.shopdes}}</span>
                                        <span class="shopprice">3999</span>
                                    </li>
                                </swiper-slide>
                            </swiper>

                        </ul>
                        <div class="swiper-scrollbar" ref="scrollbar"></div>
                    </div>
                </div>
            </div>
            <!-- 热门手机 -->
            <div class="hot_items">
                <div class="topshop_show">
                    <div class="topshop_head">
                        排行榜
                        <i class="el-icon-right"></i>
                    </div>
                    <a>
                        <div class="topshop_items" v-for="(item,index) in saleList" :key="index">
                            <div class="topcount" :class="['topcount' + (index+1)]">TOP{{index+1}}</div>
                            <div class="topcontent">
                                <el-image style="width:80px;height:80px;" :src="`http://localhost:3000${item.shopimg}`" fit="cover">
                                </el-image>
                                <div class="topshop_content">
                                    <span
                                        class="shopname">{{item.shopname}}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="coupon_center">
                    <div class="topshop_head">
                        优惠券中心
                        <i class="el-icon-right"></i>
                    </div>
                    <div class="coupon_content">
                        <div class="null" v-if="couponList.length == 0">暂无优惠券</div>
                        <div class="coupon_item" v-for="(item,index) in couponList" :key="index" @click="getcoupons(item.coupon_id)">
                            <div class="coupon_left">
                                <div class="price">{{item.amount}}</div>
                                <div class="min_price">满{{item.min_price}}元可使用</div>
                                <div class="condition">{{item.note}}</div>
                            </div>
                            <div class="coupon_right">
                                {{item.over_time|date}}过期
                            </div>
                        </div>
                    </div>
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
    import {
        getsort,
        getad,
        getcoupons,
        getsale
    } from '@/http/api'
    export default {
        name: "home",
        data() {
            var myvue = this
            return {
                homeswiper: [],
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
                ],
                recomment: [],
                couponList: [],
                saleList:[]
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
            getcoupons(el) {
                if (Object.keys(this.$store.state.userinfo).length > 0) {
                    getcoupon({
                            id: el
                        })
                        .then(data => {
                            if (data.code == 200) {
                                this.$message({
                                    message: '领取成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    message: '领取失败' + data.message,
                                    type: 'error'
                                })
                            }
                        })
                } else {
                  this.$message({
                     message: '请先登录',
                     type: 'warning'
                  })
                  this.$router.push({
                      name: 'login'
                  })
                }
            },
            //创建加载图片
            loadingcommends() {
                let arr = []
                for (let index = 0; index < 12; index++) {
                    let cdiv = document.createElement('div');
                    cdiv.innerHTML =
                        `<div class="commend_top">
                    </div>
                    `;
                    let i = Math.floor(this.$refs.commend_shop.childNodes.length / 12) * 12 + index;
                    i = (i + 1) % 12 == 0 && i != 0 ? i -= 12 : i;
                    let parendNode = document.getElementsByClassName("commend_top");
                    if (this.$refs.commend_shop.childNodes.length <= 60) {
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
            getallcoupon() {
                getcoupons({
                        count: 9
                    })
                    .then(data => {
                        this.couponList = data.info
                    })
            },
            getsales () {
              getsale()
              .then(data=>{
                this.saleList = data.info
              })
            },
            /**用于循环美化轮播板块 */
            beautiswiper() {
                let i = 0;
                this.$refs.scroll.childNodes[0].childNodes[1].childNodes.forEach(e => {
                    if (i > this.swipercolor.length) i = 0;
                    e.childNodes[0].style.borderTop = "1px solid" + this.swipercolor[i++];
                })
            },
            unopen() {
                this.$message({
                    message: '该功能暂未开放,稍后福城建设将为您提供更多服务',
                    duration: 1500,
                    type: 'error'
                })
            },
            getsorts() {
                const qdata = {
                    page: 1,
                    pageSize: 8,
                    sortname: ''
                }
                getsort(qdata).then(data => {
                        this.$store.commit('changesort', data.info)
                    })
                    .catch(err => {
                        this.$message({
                            message: '分类获取失败',
                            type: 'error'
                        })
                    })
            },
            getads(adid) {
                const qdata = {
                    adid: adid
                }
                getad(qdata).then(data => {
                        if (adid == 1) {
                            this.homeswiper = data.info
                        } else {
                            this.recomment = data.info
                            setTimeout(() => {
                                this.beautiswiper();
                            }, 0)
                        }
                    })
                    .catch(err => {
                        this.$message({
                            message: '分类获取失败',
                            type: 'error'
                        })
                    })
            },
            toshop(item) {
                console.log(item.shopid);
                this.$router.push({
                    name: "shopdetail",
                    query: {
                        shopid: item.shopid
                    }
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
            this.getsorts()
            this.getads(1);
            this.getads(2);
            this.getallcoupon()
            this.getsales()
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
            width: 100% !important;
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

                ul {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;

                    .shopitem {
                        width: 130px;
                        height: 130px;
                        background: white;
                        margin-left: 8px;
                        margin-top: 8px;

                        img {
                            width: 110px;
                            height: 110px;
                        }

                        span {
                            width: 120px;
                            margin: auto;
                            position: relative;
                            top: -35px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #000;
                            display: block;
                        }
                    }
                }
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

                    li {
                        margin-left: 10px;
                        width: 60px;
                        height: 70px;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-around;
                        align-items: center;
                        font-size: 0.8em;
                        cursor: pointer;

                        .icon {
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
        justify-content: space-between;

        .topshop_head {
            width: calc(100%-20px);
            height: 50px;
            font-size: 1.2em;
            font-weight: bolder;
            line-height: 50px;
            text-align: left;
            padding-left: 20px;
            font-family: '微软雅黑';
            border-bottom: 1px solid #f2f2f2;
            cursor: pointer;

            i {
                border: 2px solid #ff3333;
                border-radius: 100%;
                color: #ff3333;
                font-weight: bolder;

            }
        }

        .topshop_show {
            width: 380px;
            height: 350px;
            background: white;

            .topshop_items {
                width: 100%;
                height: 99px;
                border: 1px solid #f2f2f2;
                border-left: 0;
                border-right: 0;
                margin-top: -1px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;

                .topcount {
                    width: 40px;
                    height: 40px;
                    color: #fff;
                    margin-left: 10px;
                    font-weight: bolder;
                    font-size: 0.9em;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                }

                .topcontent {
                    width: 350px;
                    height: 100px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-around;
                    align-items: center;

                    .topshop_content {
                        width: 180px;
                        height: 100px;

                        .shopname {
                            width: 100%;
                            height: 100px;
                            font-size: 0.8em;
                            line-height: 100px;
                            overflow: hidden;
                            display: block;
                        }
                    }
                }
            }

            .topcount2 {
                    background: #ff7e5f;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #feb47b, #ff7e5f);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }

            .topcount1 {
                    background: #e58b8b;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #e58b8b, #db4c4c);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #e58b8b, #db4c4c);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }

            .topcount3 {
                    background: #fad17e;
                    /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #fad17e, #f3b639);
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #fad17e, #f3b639);
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
        }

        .coupon_center {
            width: 850px;
            height: 350px;
            background: white;

            .coupon_content {
                width: 850px;
                height: 300px;
                display: flex;
                flex-flow: row wrap;

                .coupon_item {
                    width: 260px;
                    height: 85px;
                    margin: 7px 0 0 15px;
                    border-radius: 3px;
                    display: flex;
                    cursor: pointer;

                    .coupon_left {
                        width: 160px;
                        height: 85px;
                        background: #f6f6f6;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;

                        .price,
                        .min_price,
                        .condition {
                            color: #ff3333;
                            font-weight: 900;
                            font-size: 1.8em;
                            font-family: '幼圆';
                            float: left;
                            margin: 0 0 0 20px;
                        }

                        .price::before {
                            content: '¥';
                            font-size: 0.5em;
                        }

                        .min_price {
                            color: #999;
                            font-size: 0.8em;
                        }

                        .condition {
                            color: #111;
                            font-size: 0.85em;
                            margin-top: 3px;
                            width: 110px;
                            font-weight: lighter;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: left;
                        }
                    }

                    .coupon_right {
                        flex: 1;
                        height: 85px;
                        background: #ff3333;
                        position: relative;
                        color: #fff;
                        font-weight: bold;
                        font-size: 0.8em;
                        line-height: 85px;

                        &::before {
                            content: '';
                            width: 0px;
                            height: 85px;
                            border: 1px dashed #fff;
                            position: absolute;
                            top: 0;
                            left: 0px;
                        }
                    }
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
                width: 100% !important;
                height: 300px;
                background: #fff;

                .swiper-container {
                    width: 100%;
                }

                ul {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                    list-style-type: none;
                    height: 300px;
                    background: #f4f4f4;
                    width: 100%;

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
                            width: 90%;
                            z-index: 999;
                            color: #000;
                            height: 35px;
                            font-family: "等线";
                            font-size: 1em;
                            margin: 6px auto 0px auto;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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