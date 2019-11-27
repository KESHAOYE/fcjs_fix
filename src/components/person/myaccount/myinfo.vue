<template>
    <div class="myinfo">
        <div class="person_head">
            <span>个人信息</span>
        </div>
        <div class="info_detail">
            <el-alert title="您还未完成实名认证" type="warning" show-icon description="请按下方提示完成实名认证">
            </el-alert>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <el-avatar :size="70" :src="userinfo.head" class="userhead"></el-avatar>
            </el-upload>
            <el-form  :inline="true" :model="userinfo" ref="userinfo" :label-width="labelwidth" :label-position="labelposition"
                status-icon :rules="userinforule">
                <el-form-item label="真实姓名" prop="username">
                    <el-input v-model="userinfo.username" placeholder="请输入真实姓名"
                        :disabled="this.userinfo.username.length>0"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="manid">
                    <el-input v-model="userinfo.manid" placeholder="请输入身份证号" :disabled="this.userinfo.manid.length>0">
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="userinfo.name" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="userinfo.birth" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phonenumber">
                    <el-input v-model="userinfo.phonenumber" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeuserinfo('userinfo')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myinfo",
        data() {
            return {
                labelwidth: "120px",
                labelposition: "right",
                userinfo: {
                    head: "",
                    username: "",
                    name: "",
                    manid: "",
                    phonenumber: "",
                    birth: ""
                },
                size: "large",
                userinforule: {
                    username: [{
                        validator: this.reg.checkname,
                        trigger: 'blur'
                    }],
                    manid: [{
                        validator: this.reg.checkmanid,
                        trigger: 'blur'
                    }],
                    name: [{
                        trigger: 'blur',
                        message: "昵称不能为空",
                        required: "true"
                    }],
                    birth: [{
                        trigger: 'blur',
                        message: "请选择生日",
                        required: "true"
                    }],
                    phonenumber: [{
                        validator: this.reg.checkphonenumber,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            changeuserinfo(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        console.log("success");
                    } else {

                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.userinfo.head = URL.createObjectURL(file.raw);
                console.log(this.userinfo.head);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        }
    }
</script>

<style lang="scss" scoped>
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

    .myinfo {

        .info_detail {
            width: 100%;
            padding-top: 50px;
            min-height: 650px;
            background: white;
            margin-top: 30px;
            border-radius: 5px;

            .el-form-item {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 35px;
            }
            .el-form-item__content{
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
        }
    }
</style>