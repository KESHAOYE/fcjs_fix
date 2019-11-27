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
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
         .personal_info{
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-around;
                width: 200px;
                height: 80px;
                img{
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    border: 3px double #c2c2c2;
                }
                .outlogin:hover{
                  color: #ff4d4d;
                  cursor: pointer;
                }
            }
    .person {
        width: 100%;
        min-height: 40px;
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
            width: 80px;
            display: block;
            border: 1px solid #d2d2d2;
            border-bottom: 0;
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

        .pilot {
            width: 1280px;
            min-height: 200px;
            background: white;
            position: absolute;
            top: 40px;
            z-index: 1200;
            border: 1px solid #d2d2d2;
            border-top: none;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            .pilot_item:last-child {
                border: 0;
            }

            .pilot_item {
                border-right: 1px solid #d2d2d2;
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