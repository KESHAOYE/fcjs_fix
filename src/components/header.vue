<template>
    <div class="header" :class="{'min-head':isscale,'search-min-head':issearch}">
        <div class="content">
            <div class="left logo">
                <router-link to="/">
                    <img src="" alt="logo制作中">
                </router-link>
            </div>
            <div class="headright">
                <div class="search">
                    <div class="searchinput">
                        <input type="text" v-model="search" placeholder="iPhone8 Plus" @keyup.enter="searchto"
                            @input="changeselect" @blur="changeselect" />
                        <div class="searchbutton" @click="searchto">
                            <i class="searchicon">&#xe623;</i>
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
                            <div class="searchresult" v-if="searchList.length > 0">
                                <div v-for='(item,index) in searchList'>
                                    <span class='results'>{{item.key}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- 头部广告 -->
            <div class="head_ad">

            </div>
        </div>
    </div>
</template>

<script>
    import {
        searchlist
    } from '@/http/api'
    export default {
        props: ["searchs"],
        props: ["isopen"],
        data() {
            return {
                hotsearch: [

                ],
                searchList: [],
                search: this.searchs,
                showresult: false,
                isselect: false,
                isscale: false,
                issearch: false,
            }
        },
        methods: {
            changeselect() {
                this.searchList = []
                if (this.search.length == 0) {
                    this.isselect = false;
                } else {
                    const qdata = {
                        key: this.search,
                        count: 10
                    }
                    searchlist(qdata)
                        .then(data => {
                            this.$nextTick(() => {
                                this.searchList = data.info
                            })
                        })
                    this.isselect = true;
                }
            },
            searchto() {
                if(this.search.length != 0){
                this.$router.push({
                    name: "search",
                    query: {
                        search: this.search
                    }
                })
                this.searchList =[]
                }else {
                    this.$message({
                        message: '搜索词不可为空',
                        type: 'error'
                    })
                }
            },
            inithead() {
                this.search = this.$props.searchs && this.$props.searchs.length != 0 ? this.$props.searchs : ""
                if (this.$props.searchs && this.$props.searchs.length) {
                    this.isselect = true;
                    this.isscale = true
                    this.issearch = true
                }
            },
        },
        watch: {
            search: function (value) {
                if (this.search.length == 0) {
                    this.isselect = false;
                    this.showresult = false;
                } else {
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
        }
    }
</script>

<style lang="scss" scoped>
    $main-color:#ff3333;

    .header {
        background: white;
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #c9c9c9;

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    //  logo begin
    .logo {
        height: 95px;
        background: black;
        margin-left: 25px;

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
        min-width: 650px;
        min-height: 100px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        position: relative;
        top: -5px;
    }

    .searchinput {
        width: 680px;
        border: 2px solid $main-color;
        height: 35px;
        position: absolute;
        padding-left: 15px;
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
            width: 610px;
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
            background: red;
        }

        .searchicon {
            color: white;
            font-weight: bolder;
        }

        .hotsearch {

            width: 680px;
            height: 30px;
            position: absolute;
            top: 40px;

            ul {
                width: 630px;
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
            width: 660px;
            min-height: 30px;
            background: #fff;
            z-index: 999;
            position: absolute;
            top: 0;
            left: -16px;
            border: 1px solid #b2b2b2;
            border-top: 0;

            div {
                cursor: pointer;

                &:hover {
                    background: rgb(180, 180, 180)
                }
            }

            .results {
                height: 40px;
                width: 90%;
                line-height: 40px;
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-left: 25px;
            }
        }
    }

    //search end
    //right begin
    .headright {
        float: left;
        height: 120px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        //align-items: center;
        margin-left: 35px;
        min-width: 500px;

        .right_top {
            height: 120px;
        }

        .right_bottom {
            width: 700px;
            height: 40px;
            margin-left: 50px;
            z-index: 1;

            ul {
                float: left;
                list-style: none;
                height: 40px;
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

    .head_ad {
        width: 230px;
        height: 120px;
        background: black;
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
                    margin-top: 33px;
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