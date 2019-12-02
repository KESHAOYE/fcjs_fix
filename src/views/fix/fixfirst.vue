<template>
    <div class="fix">
        <personbar />
        <headers />
        <div class="content fixcontent">
            <div class="fix_step">
                <el-steps :active="0" align-center finish-status="success" process-status="success">
                    <el-step title="选择基本属性" icon="process_step"></el-step>
                    <el-step title="价格评估" icon="process_step"></el-step>
                    <el-step title="提交订单" icon="process_step"></el-step>
                    <el-step title="生成订单" icon="process_step"></el-step>
                </el-steps>
            </div>
            <div class="first">
                <div class="choosephone">
                    <div class="title"><span>选择您的机型</span>
                        <hr/>
                    </div>
                    <div class="choose">
                        <div class="null_phone" v-show="this.phonelist.length<=0">暂无可维修的机型</div>
                        <el-tabs v-model="activeName" @tab-click="handleClick" v-show="this.phonelist.length>0">
                            <el-tab-pane v-for="(item,index) in phonelist" :key="index" :label="item.name" :name="item.value">
                                <ul class="phone">
                                    <li v-for="(phone,index) in item.list" :key="index" @click="choosephone"
                                        :value="phone.phonename" :class="{active:fixedmodel.selectphone==phone.phonename}">{{phone.phonename}}</li>
                                </ul>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="chooseproblem" v-show="this.fixedmodel.selectphone.length>0">
                    <div class="title"><span>选择维修项目</span>
                        <hr />
                    </div>
                    <div class="problem">
                        <div class="null_problem" v-show="this.fixitem.length<=0">该机型暂无可维修项目</div>
                        <el-collapse v-model="activefix" v-if="this.fixitem.length>0">
                            <el-collapse-item v-for="(item,index) in fixitem" :key="index" :title="item.typename" :accordion="true" :name="item.name" >
                                <div class="problemitem">
                                    <div class="item" v-for="(fix,index) in item.typeitem" :key="index"
                                        @click="problemclick($event)" :name="fix.name" :price="fix.price" :value="fix.value" :class="{active:fixedmodel.selectitems.indexOf(fix.name)>=0}">
                                        <div class="title">
                                            <div class="title_top">
                                                <span>{{fix.name}}</span>
                                                <span>维修价格:{{fix.price}}元</span>
                                            </div>
                                            <hr/>
                                        </div>
                                        <div class="detail">
                                            <div class="row"><span>故障描述：</span><span>{{fix.des}}</span></div>
                                            <div class="row"><span>维修方式：</span><span>{{fix.methods}}</span></div>
                                        </div>
                                        <i class="success_tag">
                                            <i>&#xe714;</i>
                                        </i>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <div class="count" v-show="this.fixedmodel.selectphone.length>0">
                    <div class="infoshow">
                        <span>共选择了<span class="show">{{fixedmodel.selectitems.length}}</span>项,共计<span class="show">{{fixedmodel.totalprice}}</span>元</span>
                    </div>
                    <div class="next" @click="next()">下一步</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: "null",
                activefix: "",
                fixitem: [{
                    typename: "屏幕维修",
                    name: "screenfix",
                    typeitem: [{
                        name: "外屏更换",
                        value: "cos",
                        price: "300",
                        des: "外屏破碎(玻璃裂))",
                        methods: "更换外屏（质保180天）-旧屏回收 严选品质非原厂配件"
                    }]
                }],
                fixedmodel:{
                    selectphone: "",
                    selectitems: [],
                    totalprice: "0"
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.fixedmodel.selectphone = ""
                this.fixedmodel.selectitems=[]
                //关闭Collapse面板
                this.activefix=""
                localStorage.setItem("selectphone", "")
            },
            //机型选择
            choosephone(el) {
                this.fixedmodel.selectphone = el.srcElement.attributes.value.value
                //写入localstorage
                localStorage.setItem("selectphone", this.fixedmodel.selectphone)
                //清空问题表
                this.fixedmodel.selectitems=[];
            },
            //问题选择
            problemclick(el) {
                let fixinfo=el.currentTarget.attributes;
                let name=fixinfo.name.value;
                let price=fixinfo.price.value;
                let value=fixinfo.value.value;
                let active=this.fixedmodel.selectitems.indexOf(name)
                if(active<0){
                    this.fixedmodel.selectitems.push(name);
                    console.log(this.fixedmodel.selectitems);
                    this.fixedmodel.totalprice=Number(this.fixedmodel.totalprice)+Number(price);
                }else{
                    this.fixedmodel.selectitems.splice(active,1);
                    this.fixedmodel.totalprice=Number(this.fixedmodel.totalprice)-Number(price);
                }
            },
            //跳转至下一步
            next() {
                if (this.fixedmodel.selectitems.length <= 0 || this.fixedmodel.selectphone.length <= 0) {
                    this.$notify.error({
                        title: "错误",
                        message: "请选择要维修的内容",
                        position: "top-right",
                    })
                } else {
                    console.log(this.fixedmodel);
                    this.$store.commit("changefixedmodel",this.fixedmodel)
                    this.$router.push({
                        path: "/fixsecond"
                    })
                }
            }
        },
        computed: {
            phonelist() {
                return this.$store.state.fixmodel
            }
        },
        mounted() {
            this.activeName = this.$route.query.brand ? this.$route.query.brand : "Apple";
        },
        activated() {
            //根据路由参数决定品牌，默认为苹果。
            this.activeName = this.$route.query.brand ? this.$route.query.brand : "Apple";
        }
    }
</script>
<style lang="scss">
    .fix {
        width: 100%;
        height: auto;
    }

    .fixcontent {
        width: 1098px;
    }

    .process_step {
        width: 18px;
        height: 18px;
        background: #d2d2d2;
        border-radius: 50%;
    }

    .fix_step {
        height: 100px;
        background: white;
        margin: 30px auto;
        text-align: center;

        .el-steps {
            height: 100px;
            align-items: center;

            .is-icon {
                width: 30px;
            }

            .is-success {
                color: #23a96f;

                .el-step__line {
                    background: #23a96f;
                }
            }

            .el-icon-check:before {
                content: "";
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #23a96f;
                position: absolute;
                top: -12px;
                left: -10px;
            }
        }
    }

    .title {
        width: 1000px;
        height: 70px;
        margin: auto;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: flex-start;

        span {
            font-size: 1.3em;
            margin-top: 5px;
            font-family: "等线";
        }

        hr {
            width: 100%;
            background: #d2d2d2;
            border: 0;
            height: 1px;
        }
    }

    // 选择机型
    .choosephone {
        width: 100%;
        min-height: 80px;
        background: #fff;

        .choose {
            width: 1000px;
            min-height: 50px;
            background: #fff;
            margin: auto;

            .phone {
                width: 1000px;
                min-height: 60px;
                list-style: none;
                display: flex;
                flex-flow: row wrap;
                margin-top: 10px;
                margin-bottom: 20px;

                li {
                    width: 180px;
                    margin: 8px 8px;
                    border: 1px solid #d2d2d2;
                    height: 45px;
                    line-height: 45px;
                    cursor: pointer;
                }

                li:hover {
                    border: 1px solid #23a96f;
                }

                .active {
                    background: #23a96f;
                    color: white;
                    border: 0;
                }

                .active:hover {
                    border: 0;
                }
            }
        }

        //
        .el-tabs__nav-wrap::after {
            background: none;
        }

        .el-tabs__active-bar {
            background-color: #23a96f;

        }

        .el-tabs__item:hover {
            color: #23a96f;
        }

        .el-tabs__item {
            font-size: 1em;
            width: 80px;
        }

        .el-tabs__item.is-active {
            color: #23a96f;
        }
    }

    // 选择机型结束
    //选择问题开始
    .chooseproblem {
        width: 1098px;
        height: auto;
        background: white;
        margin: 30px 0;

        .problem {
            width: 1000px;
            margin: auto;
        }

        .el-collapse {
            border-top: 0;
        }

        .el-collapse-item__header {
            height: 80px;
            font-size: 1em;
        }

        .problemitem {
            width: 800px;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            height: auto;
            margin: auto;
            position: relative;

            .item:hover {
                border: 1px solid #23a96f;
            }

            .item_null {
                width: 100%;
                height: 100px;

                line-height: 100px;
            }

            .item_null::before {
                content: "此类型无法维修";
                width: 100%;
                height: 100px;
                font-size: 1.3em;
            }

            .item {
                width: 100%;
                min-height: 100px;
                border: 1px solid #f2f2f2;
                cursor: pointer;
                margin-top: 20px;
                position: relative;

                .title {
                    width: 92%;
                    height: 40px;
                    margin-top: 15px;

                    .title_top {
                        width: 100%;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;

                        span {
                            font-size: 1.2em;
                            display: block;
                        }
                    }
                }

                .detail {
                    width: 92%;
                    height: auto;
                    margin: auto;
                    margin-bottom: 10px;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    .row {
                        margin-top: 5px;
                    }
                }

                .success_tag {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0;
                    height: 0;
                    color: black;
                    line-height: 2px;
                    font-weight: bolder;
                    text-align: center;
                    border-width: 15px;
                    border-style: solid;
                    border-color: #23a96f #23a96f transparent transparent;
                    display: none;
                    i{
                        color: white;
                        position: relative;
                        top: -5px;
                        left: 1px;
                        font-weight: bolder;
                    }
                }

            }

            .active {
                border: 1px solid #23a96f;

                .success_tag {
                    display: block;
                }
            }
        }
    }

    //选择问题结束
    // 结算台开始
    .count {
        width: 1098px;
        height: 100px;
        margin-top: 30px;
        margin-bottom: 70px;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .infoshow {
            width: 350px;
            height: 100px;
            line-height: 100px;
            text-align: left;
            margin-left: 50px;
            font-size: 1.1em;
            font-family: "等线";

            .show {
                color: #23a96f;
                font-size: 1.1em;
                margin: 0 5px;
            }
        }

        .next {
            width: 150px;
            height: 50px;
            background: #00303c;
            color: #fff;
            line-height: 50px;
            margin-right: 50px;
            cursor: pointer;
        }
    }

    // 结算台结束
</style>