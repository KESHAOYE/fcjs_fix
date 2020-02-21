<template>
    <div class="changepasswords">
        <div class="person_head">
            <span>修改密码</span>
        </div>
        <el-form :model="passwords" class="changepassword" ref="passwords" :label-width="labelwidth"
            :label-position="labelposition" status-icon :rules="passwordrules">
            <el-form-item label="新密码" prop="newpassword">
                <el-input v-model="passwords.newpassword" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newspassword">
                <el-input v-model="passwords.newspassword" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="passwords.code" :placeholder="codeplaceholder" class="code">
                </el-input>
                <el-button class="sendmessage" @click="sendmessage" :disabled="buttoninfo.disable">
                    {{buttoninfo.message}}
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changepassword('passwords')">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "changepassword",
        data() {
            let checkpassword = (rule, value, callback) => {
                if (value.length <= 0) {
                    callback(new Error("不能为空"))
                }
                if (this.passwords.newpassword.length <= 0) {
                    callback(new Error('请先输入新密码'));
                } else if (value != this.passwords.newpassword) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            }
            return {
                labelwidth: "120px",
                labelposition: "right",
                buttoninfo: {
                    message: "发送验证码",
                    disable: false,
                    time: 60
                },
                codeplaceholder: "",
                passwords: {
                    newpassword: "",
                    newspassword: "",
                    code: "",
                },
                passwordrules: {
                    newpassword: [{
                        trigger: "blur",
                        required: true,
                        message: "新密码不能为空"
                    }],
                    newspassword: [{
                        validator: checkpassword,
                        trigger: "blur",
                    }]
                }
            }
        },
        methods: {
            changepassword(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                    }
                })
            },
            sendmessage() {
                this.buttoninfo.disable = true
                let interval = setInterval(() => {
                    let time = this.buttoninfo.time--;
                    this.buttoninfo.message = time + "秒后发送";
                    if (time <= 0) {
                        this.buttoninfo = {
                            message: "重新发送",
                            time: "60",
                            disable: false
                        }
                        clearInterval(interval)
                    }
                }, 1000);
            }
        }
    }
</script>

<style lang="scss">
.person_head {
        width: 100%;
        height: 50px;
        background: white;
        text-align: left;
        line-height: 50px;
        margin-top: 20px;
        border-radius: 5px;

        span {
            margin-left: 25px;
        }
    }
    .changepassword {
        width: 100%;
        min-height: 500px;
        background: white;
        margin-top: 30px;
        padding-top: 50px;
        border-radius: 5px;
    }

    .el-form-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        margin-top: 35px;

        .el-form-item__content {
            margin-left: 20px !important;
        }
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
    }

    .code {
        width: 185px;
    }

    .sendmessage {
        margin-left: 5px;
        width: 115px;
        font-size: 1em;
    }
</style>