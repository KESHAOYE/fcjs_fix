<template>
    <div class="addbank">
        <div class="person_head">
            <span>添加支付方式</span>
        </div>
        <div class="addbank_content">
            <el-form :model="bankform" :label-width="labelwidth" :label-position="labelposition" ref="bankform"
                status-icon :rules="rules">
                <el-form-item label="真实姓名" prop="cname">
                    <el-input v-model="bankform.cname" type="text" placeholder="请输入姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="manid">
                    <el-input v-model="bankform.manid" placeholder="请输入身份证号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付方式" prop="cbank">
                    <el-select v-model="bankform.cbank" placeholder="请选择">
                        <el-option v-for="(bank,index) in banks" :key="index" :value="bank.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="methodtitle" prop="methodaccount" v-if="this.methodtitle.length>0">
                    <el-input v-model="bankform.methodaccount" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankid" v-show="isbank">
                    <el-input v-model="bankform.bankid" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phonenumber">
                    <el-input v-model="bankform.phonenumber" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="isaccess">
                    <el-checkbox v-model="bankform.isaccess"><span class="book"
                            @click.prevent="bookVisiable=true">我同意《福城建设商城支付服务协议》</span></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addbank('bankform')">添加支付方式</el-button>
                </el-form-item>
            </el-form>
            <el-dialog :visible.sync=bookVisiable :append-to-body="true" :lock-scroll="true">
                <div class="book_title" slot="title">福城建设商城支付服务协议</div>
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
    </div>
</template>
<script>
    export default {
        name: "addbank",
        data() {
            return {
                radio: "",
                bookVisiable: false,
                labelposition: "right",
                labelwidth: "120px",
                book_content: {
                    title: "感谢您选择福城建设商城支付服务,福城建设商城支付服务协议（'以下简称本协议'）由福城建设商城平台与您签订。",
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
                        ]
                    }]
                },
                loading: false,
                bankform: {
                    cname: "",
                    manid: "",
                    methodaccount: "",
                    bankid: "",
                    cbank: "",
                    phonenumber: "",
                    isaccess: "",
                },
                methodtitle: "",
                isbank: false,
                banks: [{
                        value: "支付宝"
                    },
                    {
                        value: "微信支付"
                    },
                    {
                        value: "中国建设银行"
                    },
                    {
                        value: "中国农业银行"
                    },
                    {
                        value: "招商银行"
                    },
                ],
                rules: {
                    cname: [{
                        validator: this.reg.checkname,
                        trigger: 'blur'
                    }],
                    manid: [{
                        validator: this.reg.checkmanid,
                        trigger: 'blur'
                    }],
                    bankid: [{
                        validator: this.reg.checkbankid,
                        trigger: "blur"
                    }],
                    phonenumber: [{
                        validator: this.reg.checkphonenumber,
                        trigger: 'blur'
                    }],
                    cbank: [{
                        message: "请选择",
                        trigger: 'change',
                        required: 'true'
                    }],
                    isaccess: [{
                        message: "请勾选协议",
                        trigger: 'change',
                        required: 'true'
                    }],
                    methodaccount: [{
                        message: "请输入账号",
                        trigger: 'blur',
                        required: 'true'
                    }]
                }
            }
        },
        computed: {
            cbank() {
                return this.bankform.cbank
            }
        },
        watch: {
            cbank(val) {
                this.methodtitle = val == "支付宝" ? "支付宝账号" : val == "微信支付" ? "微信账号" : "";
                this.isbank = val.indexOf("银行") != -1 ? true : false;
            },
            book_content(val) {
                if (val.length > 0) {
                    this.loading = false
                }
            }
        },
        methods: {
            addbank(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        console.log("success");
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
    .addbank {
        .person_head {
            width: 100%;
            height: 3.125rem;
            background: white;
            text-align: left;
            line-height: 3.125rem;
            margin-top: 1.25rem;

            span {
                margin-left: 1.5625rem;
            }
        }

        .addbank_content {
            width: 100%;
            padding-top: 30px;
            height: 550px;
            background: white;
            margin-top: 30px;

            .el-form-item {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin-top: 35px;

                .el-form-item__content {
                    margin-left: 20px !important;
                }
            }

            .el-form-item__error {
                margin: 2px 0px 0 25px;
            }

            .el-input {
                width: 300px;
                //margin-left: 20px;
            }

            .el-dialog {
                min-height: 300px;
            }

            .book {
                color: #4d94ff;
                cursor: pointer;
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