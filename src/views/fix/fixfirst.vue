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
                </el-steps>
            </div>
            <div class="first">
                <div class="choosephone">
                    <div class="title"><span>选择您的机型</span>
                        <hr />
                    </div>
                    <div class="choose">
                        <div class="null_phone" v-show="this.phoneList.length<=0">暂无可维修的机型</div>
                        <el-tabs v-model="activeName" @tab-click="handleClick" v-show="this.phoneList.length>0">
                            <el-tab-pane v-for="(item,index) in phoneList" :key="index"
                                :label="`${item.brandname}/${item.brandename}`" :name="item.value">
                                <ul class="phone">
                                    <div class="null_problem" v-show="item.list.length<=0">该品牌暂无可维修机型</div>
                                    <li v-for="(phone,index) in item.list" :key="index" @click="choosephone(phone)"
                                        :class="{active:fixedmodel.selectphone==phone.model_id}">
                                        <el-image :src='phone.model_img' style="width: 60px; height: 60px;"></el-image>
                                        <span>{{phone.model_name}}</span>
                                    </li>
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
                        <div class="null_problem" v-show="this.fixitems.length<=0">该机型暂无可维修项目</div>
                        <el-collapse v-model="activefix" v-if="this.fixitems.length>0">
                            <el-collapse-item v-for="(item,index) in fixitems" :key="index" :name='item.sort_name' :title="item.sort_name" :accordion="true">
                                <div class="problemitem">
                                    <div class="item" v-for="(fix,indexs) in item.info" :key="indexs"
                                        @click="problemclick(fix)" :class="{active:ischoose(fix)!=-1}">
                                        <div class="title">
                                            <div class="title_top">
                                                <span>{{fix.item_name}}</span>
                                                <span>维修价格:{{fix.price}}元</span>
                                            </div>
                                            <hr />
                                        </div>
                                        <div class="detail">
                                            <div class="row"><span>故障描述：</span><span>{{fix.des}}</span></div>
                                            <div class="row"><span>维修方式：</span><span>{{fix.method}}</span></div>
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
                        <span>共选择了<span class="show">{{fixedmodel.selectitems.length}}</span>项,共计<span
                                class="show">{{fixedmodel.totalprice}}</span>元</span>
                    </div>
                    <div class="next" @click="next()">下一步</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        ugetfixbrand,
        getfixmodelbyid
    } from '@/http/api'
    export default {
        data() {
            return {
                activeName: "null",
                activefix: "",
                phoneList: [],
                fixitems: [],
                fixedmodel: {
                    selectphone: "",
                    phonename:'',
                    selectitems: [],
                    totalprice: "0"
                }
            }
        },
        computed: {
          ischoose(val) {
            return function (val) {
              return this.fixedmodel.selectitems.findIndex(el=>{
                return el.id == val.item_id
              })
            }
          }
        },
        methods: {
            handleClick(tab, event) {
                this.fixedmodel.selectphone = ""
                this.fixedmodel.selectitems = []
                //关闭Collapse面板
                this.activefix = ""
            },
            //机型选择
            choosephone(el) {
                this.fixedmodel.selectphone = el.model_id
                this.fixedmodel.phonename = el.model_name
                this.fixedmodel.img = el.model_img
                //清空问题表
                this.fixedmodel.selectitems = [];
                getfixmodelbyid({
                        model_id: el.model_id
                    })
                    .then(data => {
                        this.fixitems = data.info
                        let result = []
                        this.fixitems[0].item.forEach((item) => {
                            let index = result.findIndex(el => {
                                return el.sort_name == item.sort_name
                            })
                            if (index == -1) {
                                result.push({
                                    sort_name: item.sort_name,
                                    info: [{
                                        item_id: item.item_id,
                                        item_name: item.item_name,
                                        price: item.price,
                                        des: item.des,
                                        method: item.method,
                                    }]
                                })
                            } else {
                                result[index].info.push({
                                    item_id: item.item_id,
                                    item_name: item.item_name,
                                    price: item.price,
                                    des: item.des,
                                    method: item.method,
                                })
                            }
                        })
                        this.fixitems = result
                    })
            },
            //问题选择
            problemclick(item) {
              this.ischoose(item) == -1 ? this.fixedmodel.selectitems.push({id: item.item_id,name:item.item_name,price: item.price}) : this.fixedmodel.selectitems.splice(this.ischoose(item),1)
              this.fixedmodel.totalprice = 0
              this.fixedmodel.selectitems.forEach(el=>{
                  this.fixedmodel.totalprice = parseInt(this.fixedmodel.totalprice) + parseInt(el.price)
              })
            }, 
            get() {
                let load = this.$loading({
                  lock: true,
                  text: '加载中..'
                })
                ugetfixbrand()
                    .then(data => {
                        this.phoneList = data.info
                        load.close()
                    })
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
                    this.$store.commit("changefixedmodel", this.fixedmodel)
                    this.$router.push({
                        path: "/fixsecond"
                    })
                }
            }
        },
        mounted() {
            this.get()
            this.activeName = ''
        },
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
                color: #ff3333;

                .el-step__line {
                    background: #ff3333;
                }
            }

            .el-icon-check:before {
                content: "";
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #ff3333;
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

    .null_problem {
        height: 50px;
        padding: 15px 0;
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
                    height: auto;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-around;
                    cursor: pointer;
                    padding: 5px;
                    transition: .3s;

                    span {
                        width: auto;
                        height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                li:hover {
                    border: 2px solid #ff3333;
                }

                .active {
                    border: 2px solid #ff3333;
                }
            }
        }

        .el-tabs__nav {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: flex-start;
        }

        .el-tabs__nav-wrap::after {
            background: none;
        }

        .el-tabs__active-bar {
            background-color: #ff3333;

        }

        .el-tabs__item:hover {
            color: #ff3333;
        }

        .el-tabs__item.is-active {
            color: #ff3333;
        }
    }

    /* 选择机型结束
    选择问题开始 */
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
                border: 1px solid #ff3333;
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
                    border-color: #ff3333 #ff3333 transparent transparent;
                    display: none;

                    i {
                        color: white;
                        position: relative;
                        top: -5px;
                        left: 1px;
                        font-weight: bolder;
                    }
                }

            }

            .active {
                border: 1px solid #ff3333;

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
                color: #ff3333;
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