<template>
    <div class="fix_third">
        <personbar/>
        <headers/>
        <!-- <scaleimg/> -->
                <div class="content fixcontent">
            <div class="fix_step">
                <el-steps :active="2" align-center finish-status="success" process-status="success">
                    <el-step title="选择基本属性" icon="process_step"></el-step>
                    <el-step title="价格评估" icon="process_step"></el-step>
                    <el-step title="提交订单" icon="process_step"></el-step>
                    <el-step title="生成订单" icon="process_step"></el-step>
                </el-steps>
            </div>
            <div class="second_detail">
            <div class="second_detail_left">
                <img src="../../assets/phone/iphone5s.png" alt="">
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
                    <el-tag v-for="(item,index) in selectitem" :key="index">{{item.name}}</el-tag>
                </div>
            </div>
        </div>
        <div class="input_imei">
            <div class="title">
                <span>输入您的设备标识码</span>
                <hr>
            </div>
            <input type="text" v-model="imei" placeholder="请输入您设备的唯一标示码">
            <div class="row_title">
                说明：请认真核对。IMEI码输入错误可能导致错误维修他人机器。
            </div>
        </div>
        <myaddress/>
            <div class="count">
                    <div class="next" @click="next()">提交订单</div>
            </div>
        </div>
    </div>
    
</template>

<script>
import myaddress from '../../components/myaddress'
export default {
    data(){
        return{
            imei:""
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
    methods:{
    },
    components:{
        myaddress
    }
}
</script>

<style lang="scss">
.input_imei{
    width: 1098px;
    height: 200px;
    background: white;
    margin-top: 30px;
    input{
        width: 1000px;
        height: 30px;
        line-height: 30px;
        outline: 0;
        margin: auto;
        font-family: "等线";
        font-size: 1em;
        margin-top: 15px;
        padding-left: 10px;
    }
    .row_title{
        width: 1000px;
        text-align: left;
        margin:auto;
        margin-top:15px;
        color: #c2c2c2;
    }
}
    .count{
        position: relative;
        .next{
            position: absolute;
            right: 50px;
        }
    }
</style>