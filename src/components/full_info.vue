<template>
    <div class="full_info">
        <personbar />
        <headers />
        <div class="content">
            <div class="r_title">接下来,请完善您的账户信息</div>
            <div class="info_detail">
                <el-upload class="avatar-uploader" :show-file-list="false" action='https://jsonplaceholder.typicode.com/posts' :before-upload="beforeAvatarUpload">
                    <el-avatar :size="70" :src="userinfo.headimg" class="userhead"></el-avatar>
                </el-upload>
                <el-form :inline="true" :model="userinfo" ref="userinfo" :label-width="labelwidth"
                    :label-position="labelposition" status-icon :rules="userinforule">
                    <el-form-item label="真实姓名" prop="name">
                        <el-input v-model="userinfo.name" placeholder="请输入真实姓名"
                            :disabled="userinfo.isname"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="id">
                        <el-input v-model="userinfo.id" placeholder="请输入身份证号"
                            :disabled="userinfo.isname">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker v-model="userinfo.birth" type="date" placeholder="选择日期"
                            :picker-options="pickerOptions" :editable='false' value-format='yyyy-MM-dd'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="userinfo.sex" placeholder="请选择">
                            <el-option value='男'>
                                男
                            </el-option>
                            <el-option value='女'>
                                女
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changeuserinfo('userinfo')" style="margin-left:65px;"
                            :disabled='buttonUse'>{{buttonText}}</el-button>
                        <el-button type="info" @click="jumpstep()" :disabled='buttonUse'>跳过</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {fullinfo,getuserinfo} from '../http/api'
    let that;
    export default {
        name: "full_info",
        data() {
            return {
                labelwidth: "120px",
                labelposition: "right",
                userinfos:{},
                buttonText: '确认',
                buttonUse: false,
                size: "large",
                userinforule: {
                    name: [{
                        validator: this.reg.checkname,
                        trigger: 'blur'
                    }],
                    manid: [{
                        validator: this.reg.checkmanid,
                        trigger: 'blur'
                    }],
                    birth: [{
                        trigger: 'blur',
                        message: "请选择生日",
                        required: "true"
                    }],
                    sex: [{
                        trigger: 'change',
                        message: "请选择性别",
                        required: "true"
                    }],
                },
                pickerOptions: {
                    disabledDate(time) {
                        let _now = Date.now()
                        return time.getTime() > _now;
                        //大于当前的禁止，小于7天前的禁止
                    }
                }
            }
        },
        methods: {
            changeuserinfo(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                       fullinfo(this.userinfo)
                       .then(data=>{
                           if(data.code == 200){
                               this.$message({
                                   message:'成功！',
                                   type:'success',
                                   duration:1500
                               })
                             this.$router.push({name: "home"})
                           }else{
                               this.$message({
                                   message: data.message,
                                   type:'error',
                                   duration: 1500
                               })
                           }
                       })
                       .then(()=>{
                          getuserinfo(that.userinfo.userid).then(data=>{
                            that.$store.commit('changeUserInfo', datass.info)
                          })
                       })
                    } else {

                    }
                })
            },
            jumpstep() {
                this.$router.push({
                    name: "home"
                })
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                } else {
                    let files = new FileReader();
                    files.readAsDataURL(file)
                    files.onload = e => {
                        let imgFile = e.target.result;
                        this.userinfo.headimg = imgFile
                    }
                }
            }
        },
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            }
        },
        mounted(){
            that = this
        }
    }
</script>

<style lang="scss" scoped>
    .full_info {
        background: url("../assets/customer-head-bg.svg") no-repeat bottom;
        height: 100vh;
        overflow: hidden;

        .content {
            margin: 50px auto;

            .r_title {
                font-size: 1.5em;
                font-family: "等线";
                margin-left: 55px;
            }

            .info_detail {
                width: 100%;
                padding-top: 10px;
                min-height: 300px;
                border-radius: 5px;
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

                .el-input,
                .el-select {
                    width: 300px;
                    //margin-left: 20px;
                }

                .userhead {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #d2d2d2;
                    margin-top: 15px;
                    margin-left: 40px;
                    cursor: pointer;
                }
            }
        }
    }
</style>