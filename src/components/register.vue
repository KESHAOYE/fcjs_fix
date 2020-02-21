<template>
    <div class="register">
        <personbar />
        <headers />
        <div class="content">
            <div class="r_title">你好，朋友，欢迎注册福城建设平台账号</div>
            <div class="info_detail">
                <el-form :inline="true" :model="userinfo" ref="userinfo" :label-width="labelwidth"
                    :label-position="labelposition" status-icon :rules="userinforule">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="userinfo.name" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="userinfo.phone" ref='phone' placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input v-model="userinfo.code" maxlength='4' :placeholder="codeplaceholder" class="code">
                        </el-input>
                        <el-button class="sendmessage" @click="sendmessage" :disabled="buttoninfo.disable">
                            {{buttoninfo.message}}
                        </el-button>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input v-model="userinfo.password" type='password' placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="spassword">
                        <el-input v-model="userinfo.spassword" type='password' placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register('userinfo')" style="margin-left:80px;"
                            :disabled='buttonUse'>{{buttonText}}</el-button>
                        <el-button type="info" @click="cancel" :disabled='buttonUse'>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :visible.sync=bookVisiable :append-to-body="true" :lock-scroll="true">
            <div class="book_title" slot="title">福城建设商城注册协议</div>
            <div class="book_content" v-loading="loading" :data="book_content" width="80%">
                <span>{{book_content.title}}</span>
                <div class="book_row" v-for="(book,index) in book_content.content_detail" :key="index">
                    <div class="row_b_title">{{book.name}}</div>
                    <div class="row_detail" v-for="(details,index) in book.children" :key="index">
                        <span class="row_s_title">{{details.name}}</span>
                        <span class="row_detail_content">{{details.content}}</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        register,
        fullinfo,
        login,
        getuserinfo,
        getphonevalidator,
        checkphonevalidator
    } from '../http/api'
    let that;
    export default {
        data() {
            let checkspassword = (rule, value, callback) => {
                if (value.length <= 0) {
                    callback("确认密码不能为空")
                    return false;
                }
                if (this.userinfo.password.length <= 0) {
                    callback('请先输入新密码');
                    return false;
                } else if (value != this.userinfo.password) {
                    callback('两次密码不一致');
                    return false;
                } else {
                    callback();
                    return true
                }
            }
            return {
                labelwidth: "120px",
                labelposition: "right",
                userinfo: {
                    name: "",
                    phone: "",
                    code: "",
                    password: "",
                    spassword: ""
                },
                loading: "",
                buttonText: "注册",
                buttonUse: false,
                bookVisiable: true,
                book_content: {
                    title: "感谢您注册福城建设,福城建设注册协议（'以下简称本协议'）由福城建设平台（包括商城在内的所有项目通用账号）与您签订。",
                    content_detail: [{
                            name: "1.协议的确认",
                            children: [{
                                    name: "1.1",
                                    content: "请您先仔细阅读本协议内容，尤其是字体加粗部分（包括但不限于免除或限制本公司的责任，限制您的权利，规定争议解决方式和法律使用的相关条款）。如您对本协议内容或页面提示信息有疑问，请不要进行后续操作。您可通过本公司网站（见下文定义）的在线客服进行咨询，以便本公司为您解释和说明。"
                                },
                                {
                                    name: "1.2",
                                    content: "您通过网络页面点击确认或以其他方式（包括但不限于签字或签章确认等方式）接受本协议或开通，使用本服务，即表示您与本公司已达成协议并同意接受本协议及附属协议的全部约定内容。"
                                },
                                {
                                    name: "1.3",
                                    content: "如您为无民事行为能力人或为限制民事行为能力人，请告知您的监护人，在您监护人的指导下阅读本协议，并在取得您监护人同意的前提下使用本服务。"
                                },
                                {
                                    name: "1.4",
                                    content: '本协议不具备法律效应,本项目为毕业设计。'
                                },
                            ],
                        },
                        {
                            name: "2.内测特别提醒",
                            children: [{
                                    name: "2.1",
                                    content: "感谢您参与福城建设商城内测活动，目前协议不完善，待正式版上线后将完善本协议,注册账号即为同意本公司所有协议(包括后期),谢谢!"
                                },
                                {
                                    name: "2.2",
                                    content: "注册时建议使用真实信息,以免后续带来不便"
                                },
                                {
                                    name: "2.3",
                                    content: '本项目于2019年9月开工'
                                }
                            ]
                        }
                    ],
                },
                buttoninfo: {
                    message: "发送验证码",
                    disable: false,
                    time: 60
                },
                codeplaceholder: "请输入验证码",
                size: "large",
                userinforule: {
                    name: [{
                        trigger: 'blur',
                        validator: this.reg.checkusername
                    }],
                    phone: [{
                        trigger: 'blur',
                        validator: this.reg.checkphonenumber
                    }],
                    code: [{
                        trigger: 'blur',
                        validator: this.reg.checkreg
                    }],
                    password: [{
                        trigger: "blur",
                        validator: this.reg.checkpassword
                    }],
                    spassword: [{
                        validator: checkspassword,
                        trigger: "blur",
                    }]
                }
            }
        },
        methods: {
            register(val) {
                this.$refs[val].validate((valid)=>{
                    if (valid) {
                        that.buttonText = '注册中...'
                        that.buttonUse = true
                        checkphonevalidator({phone: this.userinfo.phone,v:this.userinfo.code})
                        .then(data=>{
                            if(data.code == 200){
                        register(that.userinfo)
                            .then(data => {
                                if (data.code === 200) {
                                    that.$message({
                                        message: '注册成功',
                                        type: 'success',
                                        duration: 1500
                                    })
                                    return data.userId
                                } else {
                                    that.$message({
                                        message: `注册失败:${data.message}`,
                                        type: 'error',
                                        duration: 1500
                                    })
                                }
                                that.buttonText = '注册'
                                that.buttonUse = false
                            })
                            .then(data => {
                                const qs = {
                                    phone: that.userinfo.phone,
                                    password: that.userinfo.password
                                }
                                login(qs).then(datas => {
                                    if (datas.code === 200) {
                                        window.localStorage.setItem('_T_', datas._T_)
                                        const qss = {
                                            id: data
                                        }
                                        getuserinfo(qss).then(datass => {
                                            that.$store.commit('changeUserInfo', datass
                                                .info)
                                        })
                                        that.$router.push({
                                            name: "fullinfo"
                                        })
                                    }
                                })
                            })
                            }
                        })
                        .catch(err=>{
                            this.$message({
                                message: err,
                                type:'error'
                            })
                        })
                    } else {
                        console.log("验证失败");
                    }
                })
            },
            cancel() {
                this.$router.go(-1)
            },
            sendmessage() {
                 this.$refs['userinfo'].validateField('phone',(validate) => {
                    if (!validate) {
                        getphonevalidator({
                                phone: this.userinfo.phone
                            })
                            .then(data => {
                                this.buttoninfo.disable = true
                                let interval = setInterval(() => {
                                    let time = this.buttoninfo.time--;
                                    this.buttoninfo.message = time + "秒后发送";
                                    if (time <= 0) {
                                        this.buttoninfo = {
                                            message: "重新发送码",
                                            time: "60",
                                            disable: false
                                        }
                                        clearInterval(interval)
                                    }
                                }, 1000);
                            })
                    }
                })
            }
        },
        mounted() {
            that = this;
        },
    }
</script>

<style lang="scss" scoped>
    .register {
        background: url("../assets/customer-head-bg.svg") no-repeat bottom;
        height: 100vh;
        overflow: hidden;
    }

    .content {
        margin: 50px auto;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .r_title {
            font-size: 1.5em;
            font-family: "等线";
            width: 100%;
            text-align: center;
        }

        .info_detail {
            width: 100%;
            padding-top: 10px;
            min-height: auto;
            border-radius: 5px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            margin-right: 65px;

            .el-form-item {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 35px;
            }

            .el-form-item__content {
                margin-left: 20px !important;
            }

            .el-alert {
                width: 80%;
                margin-left: 10%;
            }

            .el-alert__title {
                font-size: 0.9em;
            }

            .el-alert__description {
                position: relative;
                left: 8px;
            }

            .el-form-item__error {
                margin: 2px 0px 0 5px;
            }

            .el-input {
                width: 300px;
                //margin-left: 20px;
            }

            .userhead {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: #d2d2d2;
                margin-top: 15px;
                cursor: pointer;
            }

            .code {
                width: 185px;
            }
        }
    }

    .el-dialog__wrapper {
        .el-dialog {
            height: 500px;
            overflow: auto;

            .book_content {
                width: 100%;
                font-size: 1em;
                letter-spacing: 2px;
                height: 360px;
                overflow: auto;

                .book_row {

                    .row_b_title {
                        font-weight: bolder;
                        font-size: 1.3em;
                        margin-top: 10px;
                    }

                    .row_detail {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>