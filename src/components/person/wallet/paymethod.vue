<template>
    <div class="paymethod">
        <div class="person_head"><span>我的支付方式</span></div>
        <div class="paymethod_detail">
            <div class="pay_item alipay">
                <i class="close" @click="deletepay()">&#xe612;</i>
                <i>&#xe647;</i>
                <span>柯少爷-</span>
            </div>
            <div class="pay_item wechat">
                <i class="close" @click="deletepay()">&#xe612;</i>
                <i>&#xe7e5;</i>
                <span>柯少爷-</span>
            </div>
            <div class="pay_item zsbank">
                <i class="close" @click="deletepay()">&#xe612;</i>
                <i>&#xe659;</i>
                <span>{{number|account}}</span>
            </div>
            <div class="pay_item jsbank">
                <i class="close" @click="deletepay()">&#xe612;</i>
                <i>&#xe651;</i>
                <span>6222 **** **** 1002</span>
            </div>
            <div class="pay_item nybank">
                <i class="close" @click="deletepay()">&#xe612;</i>
                <i>&#xe628;</i>
                <span>6222 **** **** 1002</span>
            </div>
            <div class="pay_item addnew" @click="toaddbank">
                <i>&#xe61e;</i>
                <span>添加支付方式</span>
            </div>
        </div>
        <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
            <span>是否要删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import addbank from '../wallet/addbank'
    export default {
        name: "paymethod",
        data() {
            return {
                number: "6222600260001072444",
                dialogVisible: false
            }
        },
        methods: {
            toaddbank() {
                this.$router.push({
                    name: "addbank",
                    query: {
                        mid: this.$route.query.mid
                    }
                })
            },
            deletepay() {
                this.$confirm('确认要删除？')
                    .then(()=> {
                        
                    })
            }
        },
        components: {
            addbank
        },
        filters: {
            account(val) {
                let arr = null;
                if (val.length > 15) {
                    arr = Array.from(val)
                    for (let i = 0; i < arr.length; i++) {
                        if (i == 4 || i == 9 || i == 14 || i == 19) {
                            if (arr[i] != " ") {
                                arr.splice(i, 0, " ");
                                continue
                            }
                        }
                        if (i >= 5 && i <= 13) {
                            if (i != 9) {
                                arr.splice(i, 1, "*")
                            }
                        }
                    }
                    val = arr.join("");

                }
                return val
            }
        },
        mounted() {}
    }
</script>

<style lang="scss" scoped>
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

    .paymethod {
        width: 100%;

        .paymethod_detail {
            width: 100%;
            min-height: 0px;
            background: #fff;
            margin-top: 1.875rem;
            display: flex;
            flex-flow: row wrap;
            padding: 20px 0;
        }
        .pay_item:hover{
            .close{
                display: block;
            }
        }
        .pay_item {
            min-width: 150px;
            height: 110px;
            padding: 0 10px;
            border: .0625rem solid #d5d5d5;
            margin-left: 1.25rem;
            margin-top: 1.25rem;
            border-radius: .3125rem;
            cursor: pointer;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: space-around;
            color: white;
            transition: .5s;
            position: relative;
            .close{
                font-size: 0.5em;
                clear: both;
                width: 100%;
                height: 10px;
                position: absolute;
                top: 3px;
                right: -40%;
                display: none;
            }
            i {
                font-size: 2.3em;
                line-height: 30px;
                text-align: center;
                position: relative;
                top: 5px;
            }

            span {
                font-family: "等线";
                font-size: 1em;
                position: relative;
                top: -3px;
                font-weight: bold;
            }
        }

        .alipay {
            background: #00a0e9;
            border: 0;
        }

        .wechat {
            border: 0;
            background: #44b549;
        }

        .zsbank {
            border: 0;
            background: #b1120d;
        }

        .jsbank {
            border: 0;
            background: #0066b3;
        }

        .nybank {
            border: 0;
            background: #319c8b;
        }

        .addnew {
            color: black;
        }
    }
</style>