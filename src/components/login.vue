<template>
    <div class="login">
        <headers></headers>
        <div class="back">
            <i @click="back()">&#xe656;</i>
        </div>
        <div class="login_content">
            <div class="logindialog">

                <div class="loginleft">
                </div>
                <div class="loginright">
                    <p class="l_title">登录</p>
                    <span class="ftitle">登录福城建设账号,即刻享受更多服务</span>
                    <div class="username">
                        <i>&#xe629;</i>
                        <input type="text" id="username" v-model="username" placeholder="手机号"
                            @blur="reg.checkphonenumber(null,username,checkok)" autocomplete="off" />
                    </div>
                    <div class="password">
                        <i>&#xe64e;</i>
                        <input type="password" id="userpassword" v-model="password" placeholder="请输入密码"
                            @blur="reg.checkpassword(null,password,checkok)" />
                    </div>
                    <!-- <div class="reg">
             <i>&#xe6a0;</i>
             <input type="text" @blur="reg.checkreg(null,regnum,checkok)" id="regnum" maxlength="4" v-model="regnum"  placeholder="请输入验证码" />
             <img src="http://localhost:3033/news/api/regnum.php" ref="regimg" alt="加载失败" srcset="">
             </div> -->
                    <div class="errormsg" v-show="errormsg.length>0">{{errormsg}}</div>
                    <el-button class="btn_login" ref="btnLogin" @click="initValidator">登录</el-button>
                    <span class="toreg">还没注册?<router-link to="/register">账号注册</router-link></span>
                    <span class="intro">Copyright © 2016-2019 FCJS KESHAOYE</span>
                    <div class="validator_img" v-if="show_validator">
                        <div class="validator_top">
                            <span>请完成拼图验证</span>
                            <div>
                                <span class="validator_refresh" @click="initValidator"><i class="el-icon-refresh"></i>换一张</span>
                                <span class="close" @click="show_validator = false"><i class="el-icon-close"></i></span>
                            </div>
                        </div>
                        <div class="validator_img_content" ref="mainValidator">
                            <img :src="mainValidator" alt="加载失败" >
                            <img :src=" slideValidator" alt="" ref="slide_block" class="slide_block"
                                :style="{top: slide_top + 'px', left:slide_left + 'px', width:slideWidth + 'px', height:slideWidth + 'px'}">
                        </div>
                        <div class="slide_bar">
                            <span>向右滑动完成拼图</span>
                            <div class="slide_round" @mousedown="drapSlide" ref="slideRound"
                                :style="{left:slide_left + 'px'}"><i class="el-icon-arrow-right"></i></div>
                            <div class="is_slide" ref="isSlide" :style="{width:is_slide + 'px'}"></div>
                            <!-- <el-slider v-model="slide_left" :show-tooltip=false :min=0 :max=260 height='50' @change="validatorimg"></el-slider> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import reg from '../utils/reg'
    import {getImgValidator,checkImgValidator,login,getuserinfo} from '../http/api'
    let that
    export default {
        name: "login",
        data() {
            return {
                username: "",
                password: "",
                regnum: "",
                errormsg: "",
                slide_top: 0,
                slide_left: 0,
                slideWidth: 0,
                imgWidth: 0,
                imgHeight: 0,
                // 拼图主图
                mainValidator: '',
                // 拼图验证
                slideValidator: '',
                show_validator: false,
                // 拼图验证成功后可登录
                canLogin: false
            }
        },
        computed: {
            is_slide() {
                return this.slide_left === 0 ? 0 : this.slide_left + 10
            }
        },
        methods: {
            checkok(err) {
                this.errormsg = err != undefined ? err : "";
            },
            back() {
                this.$router.go(-1)
            },
            Login () {
              if(reg.checkphonenumber(null,this.username,this.checkok)&&reg.checkpassword(null,this.password,this.checkok)){
                  // 验证成功
                  const data= {
                      phone: this.username,
                      password: this.password
                  }
                  login(data).then(data=>{
                        if(data.code === 200){
                            console.log('111')
                            window.localStorage.setItem('_T_',data._T_)
                            const qss = {
                              id:null,
                              phone: that.username
                            }
                            getuserinfo(qss).then(datas=>{
                              console.log(datas)
                              that.$store.commit('changeUserInfo', datas.info)
                              that.$message({
                                  message: '登录成功',
                                  type: 'success',
                                  duration: 1500
                              })
                              that.username = ''
                              that.password = ''
                              this.canLogin = false
                              that.$router.push({name:"home"})    
                            })
                            }else{
                                this.$message({
                                    message: `登录失败:${data.message}`,
                                    type: 'error',
                                    duration:1500
                                })
                                this.canLogin =false
                            }
                        })
              }
            },
            drapSlide(el) {
                let slideRound = this.$refs.slideRound
                let diffX = event.clientX - slideRound.offsetLeft
                slideRound.onmousemove = (event) => {
                    var moveX = event.clientX - diffX
                    if (moveX < 0) {
                        moveX = 0
                    } else if (moveX > window.innerWidth - slideRound.offsetWidth) {
                        moveX = window.innerWidth - slideRound.offsetWidth
                    }
                    this.slide_left = moveX
                }
                slideRound.onmouseleave = (event) => {
                    slideRound.onmousemove = null
                    slideRound.onmouseleave = null
                    slideRound.onmouseup =null
                    this.validatorimg()
                }
                slideRound.onmouseup = (event) => {
                    slideRound.onmousemove = null
                    slideRound.onmouseup = null
                    slideRound.onmouseleave = null
                    this.validatorimg()
                }
            },
            initValidator () {
              if(!this.canLogin&&reg.checkphonenumber(null,this.username,this.checkok)&&reg.checkpassword(null,this.password,this.checkok)){
              this.show_validator = true
              this.slide_left =0
              this.$nextTick(function(){
               let {offsetWidth, offsetHeight} = this.$refs.mainValidator
               this.imgWidth = offsetWidth
               this.imgHeight = offsetHeight
               this.$refs.isSlide.style.background = 'linear-gradient(90deg, rgba(62, 192, 251, 1) 18%, rgba(0, 212, 255, 1) 63%)'
               const data = {
                   width: this.imgWidth,
                   height: this.imgHeight,
                   phone: this.username
               }
               getImgValidator(data).then(data=>{
                  this.mainValidator = data.data.bg
                  this.slideValidator = data.data.patch
                  this.slide_top = data.data.y
                  this.slideWidth = data.data.valwidth
               })
              })
              }else{
                  this.Login()
              }
            },
            /**
             * 验证拼图验证码
             */
            validatorimg() {
                if (!this.canLogin) {
                    const data ={
                        x: this.slide_left,
                        phone: this.username
                    }
                    checkImgValidator(data)
                        .then(data => {
                            if (data.code === 200) {
                                this.canLogin = true
                                this.$refs.isSlide.style.background = '#66ff33'
                                setTimeout(()=>{
                                that.Login()                                
                                this.show_validator = false
                                this.slide_left = 0
                                },500)
                                return 
                            } else {
                                this.$refs.isSlide.style.background = '#e31515'
                                setTimeout(()=>{
                                this.initValidator()
                                console.log(1)
                                },500)
                                return
                            }
                        })
                        .catch(err => {
                            this.$refs.isSlide.style.background = '#e31515'
                            setTimeout(()=>{
                                this.initValidator()
                                },500)
                                return
                        })
                }
            },
        },
        watch: {
            slide_left: function (val) {
                this.slide_left = val > this.imgWidth - this.slideWidth ? this.imgWidth - this.slideWidth : val
            },
        },
        mounted() {
            that = this
        }
    }
</script>

<style lang="scss" scoped>
    .login_content {
        width: 100%;
        height: calc(100vh - 200px);
        overflow: hidden;
        // background: linear-gradient(#2362b6 65%, #fff);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
    }

    .back {
        text-align: left;
        width: 100%;
        margin-left: 30px;
        margin-top: 10px;
        font-size: 1.5em;
        color: #b2b2b2;
        cursor: pointer;

        i {
            color: #000;
        }
    }

    .logindialog {
        width: 1200px;
        height: 480px;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        transition: .2s;
    }

    .loginleft {
        width: 70%;
        height: 100%;
        border-right: 1px solid #f2f2f2;
        background: #ff6666 url('../assets/login_bg.png') fixed no-repeat;
        background-position: 0px;
    }

    .loginleft img {
        width: 100%;
        height: 525px;
    }

    .loginright {
        width: 30%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .l_title {
        margin-top: 40px !important;
        margin-bottom: 5px;
        font-size: 1.8em;
        font-family: "等线";
    }

    .ftitle {
        font-size: 1em;
        font-family: "等线";
    }

    .intro {
        display: block;
        font-size: 0.7em;
        color: #d2d2d2;
        position: absolute;
        bottom: 20px;
    }

    .username,
    .password,
    .reg {
        width: 85%;
        margin: 0 auto;
        border-bottom: 1px solid #d2d2d2;
        transition: .5s;
        margin-top: 20px;
    }

    .username {
        margin-top: 25px;
    }

    #regnum {
        width: 100px;
    }

    .focus {
        border-bottom: 1px solid #b2b2b2;
    }

    input {
        margin-top: 25px;
        border: 0 !important;
        width: 80%;
        outline: 0;
        font-family: "等线";
        font-size: 1em;
        padding-left: 10px;
        margin-bottom: 5px;
    }

    i {
        font-family: iconfont !important;
        font-style: normal;
        font-size: 1.2em;
        color: #a2a2a2;
    }

    .toreg {
        margin-top: 30px;
        font-family: "等线";
        color: #a2a2a2;
        font-size: 0.7em;
    }

    .toreg a {
        text-decoration: none;
        color: #2362b6;
        font-size: 0.5em;
    }

    .btn_login {
        margin-top: 55px;
        border: 0;
        width: 85%;
        height: 50px;
        font-size: 1.1em;
        font-family: "微软雅黑";
        cursor: pointer;
        outline: none;
        color: white;
        background: linear-gradient(to right, #ff6666 5%, #ff3333);
    }

    .errormsg {
        width: 290px;
        height: 20px;
        float: left;
        margin-top: 20px;
        font-size: 0.8em;
        color: red;
        text-align: left;
        line-height: 20px;
        transition: .2s;
    }

    .errormsg::before {
        content: "\e60e";
        font-family: iconfont !important;
        margin-right: 5px;
    }

    .validator_img {
        width: 30%;
        height: 260px;
        background: white;
        z-index: 999;
        position: absolute;
        top: 60px;
        right: 0;
        padding: 10px;
        box-shadow: 0 0 15px #d2d2d2;
        border-radius: 10px;
        i{
          font-family: 'element-icons' !important;
        }
        .validator_top {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            .validator_refresh {
                color: #06c;
                cursor: pointer;
            }

            .close {
                cursor: pointer;

                &:hover {
                    color: #06c;
                }
            }
        }

        .validator_img_content {
            width: 100%;
            height: 160px;
            background: white;
            margin-top: 10px;
            position: relative;
            border-radius: 6px;

            img {
                width: 100%;
                height: 160px;
            }

            .slide_block {
                z-index: 9999;
                position: absolute;
                top: 0;
                left: 0;
                border:1px solid #fff;
            }
        }

        .slide_bar {
            width: 90%;
            margin: auto;
            height: 45px;
            background: white;
            box-shadow: inset 0px 0px 15px #41c2fc;
            margin-top: 18px;
            border-radius: 25px;
            text-align: center;
            line-height: 45px;
            position: relative;
            color: #41c2fc;

            .slide_round {
                width: 50px;
                height: 50px;
                z-index: 9999;
                position: absolute;
                background: white;
                top: -3px;
                border-radius: 50%;
                cursor: pointer;
                line-height: 50px;
                text-align: center;
                font-size: 1.6em;
                box-shadow: 0em 0em 10px #41c2fc;
                color: #41c2fc;

                i {
                    font-weight: bolder;
                }
            }

            .is_slide {
                background: rgb(62, 192, 251);
                background: linear-gradient(90deg, rgba(62, 192, 251, 1) 18%, rgba(0, 212, 255, 1) 63%);
                position: absolute;
                left: 0;
                top: 0;
                height: 45px;
                border-radius: 25px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }

    @media screen and (max-width:1440px) {
        .logindialog {
            width: 1000px;
            height: 450px;
        }

        .loginleft img {
            width: 100%;
            height: 425px;
        }

        .loginleft {
            width: 70%;
        }

        .loginright {
            width: 40%;
        }

        .title {
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        input {
            margin-top: 20px;
        }

        .btn_login {
            margin-top: 42px;
            height: 40px;
            transition: .5s;
        }

        .toreg {
            margin-top: 20px;
            transition: .5s;
        }
    }
</style>