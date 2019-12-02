<template>
    <div class="fixsecond">
        <personbar/>
        <headers/>
        <div class="content fixcontent">
        <div class="fix_step">
                <el-steps :active="1" align-center finish-status="success" process-status="success">
                    <el-step title="选择基本属性" icon="process_step"></el-step>
                    <el-step title="价格评估" icon="process_step"></el-step>
                    <el-step title="提交订单" icon="process_step"></el-step>
                    <el-step title="生成订单" icon="process_step"></el-step>
                </el-steps>
            </div>
        <div class="second_detail">
            <div class="second_detail_left">
                <img :src="phoneimg" alt="图片加载失败">
            </div>
            <div class="second_detail_right">
                <div class="brand">{{phone}}</div>
                <div class="row">
                    <span class="row_title">维修价格：</span>
                    <span class="row_price">{{totalprice}}元</span>
                </div>
                <div class="row">
                    <div class="row_title">
                        说明:以上价格仅为估价,工程师仔细检查后，将给出新的报价。
                    </div>
                </div>
                <div class="row fix_detail">
                    <span class="row_title">维修项目：</span>
                    <el-tag v-for="(item,index) in selectitem" :key="index">{{item}}</el-tag>
                </div>
            </div>
        </div>
        <div class="count">
                     <div class="pre" @click="prev">上一步</div>
                    <div class="next" @click="next()">确认维修</div>
                </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
          phoneimg:""
        }
    },
    methods:{
        prev(){
        this.$router.back(-1)
        },
        next(){
          this.$router.push("/fixthird")
        },
        checkparams(){
           if(!this.phone||!this.selectitem||this.phone.length==0||this.selectitem.length==0){
               this.$notify.error({
                       title:"错误",
                       message:"无参数",
                       position:"top-right",
                   })
                 this.$router.push({name:"fixfirst"})
           }
        },
        getphoneimg(){

        }
    },
    computed:{
        phone(){
            return this.$store.state.fixedmodel.selectphone;
        },
        totalprice(){
            return this.$store.state.fixedmodel.totalprice;
        },
        selectitem(){
            return this.$store.state.fixedmodel.selectitems;
        }
    },
    mounted(){
        this.checkparams();
    }
}
</script>

<style lang="scss">
    .second_detail{
        width: 1098px;
        height: 300px;
        background: white;
        margin-top: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .second_detail_left{
            width: 300px;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 190px;
            height: 200px;
            }
        }
        .second_detail_right{
            width: 700px;
            height: 200px;
            display: flex;
            flex-flow: column nowrap;
            justify-content:space-around;
            align-items: flex-start;
            .brand{
                font-size: 1.3em;
            }
            .row{
                .row_price{
                    font-size: 1.2em;
                    color:#23a96f; 
                }
                .row_title{
                    color: #d2d2d2;
                }
            }
        }
    }
    .pre{
            width: 150px;
            height: 50px;
            background: #00303c;
            color: #fff;
            line-height: 50px;
            margin-right: 50px;
            cursor: pointer;
        margin-left: 650px;
        margin-right: 0;
    }
</style>