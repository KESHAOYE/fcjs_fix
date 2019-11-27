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
                    <el-tag v-for="(item,index) in selectitem" :key="index">{{item}}</el-tag>
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
        <div class="man_address">
            <div class="title">
                <span>请选择寄回的地址</span>
                <hr>
            </div>
            <div class="choose_address">
                <div class="address" @click="choose">
                    <i>&#xe611;</i>
                    <div class="row">
                        <span>李柯伟</span>&nbsp;&nbsp;
                        <span>15359639480</span>
                    </div>
                    <span class="address_detail">福建省福州市台江区交通路红庆里20座603</span>
                </div>
                <div class="address" @click="choose">
                    <i>&#xe611;</i>
                    <div class="row">
                        <span>李柯伟</span>&nbsp;&nbsp;
                        <span>15359639480</span>
                    </div>
                    <span class="address_detail">福建省福州市仓山区林浦路闽江世纪城临江苑29号楼2701福建省福州市仓山区林浦路闽江世纪城临江苑29号楼2701</span>
                </div>
               <div class="address add_address" @click="add()">
                   <i>&#xe61e;</i>
                   <span>添加地址</span>
               </div>
            </div>
        </div>
            <div class="count">
                    <div class="next" @click="next()">提交订单</div>
            </div>
        </div>
        <addaddress/>
    </div>
    
</template>

<script>
import addaddress from "../addaddress"
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
        add(){
             this.$store.commit("ocaddress",true)
        },
        choose(el){
            let arr = Array.from(el.currentTarget.parentNode.children);
            console.log(el.currentTarget)
                arr.forEach(function (e) {
                    if(e){
                     e.classList.remove("active")
                    }
                })
         el.currentTarget.classList.add('active')
        }
    },
    components:{
        addaddress
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
    .man_address{
        width: 1098px;
        min-height:300px;
        background: white;
        margin-top: 30px;
        .choose_address{
            width: 100%;
            height: 200px;
            margin-top: 10px;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            padding:0 50px;
            .address{
                width: 200px;
                height: 100px;
                border: 1px solid #d2d2d2;
                border-radius: 8px;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-around;
                align-items: center;
                cursor: pointer;
                margin-left: 10px;
                span{
                    font-size: 0.7em;
                }
                .address_detail{
                    width: 180px;
                    height: 30px;
                    display: -webkit-box;
                    -webkit-line-clamp:2;
                     -webkit-box-orient: vertical;
                     overflow: hidden;
                }
                i{
                    font-size: 1.5em;
                }
            }
            .active{
                    border:1px solid #23a96f;
                    color: #23a96f;
                }
                i{
                    font-size: 2em;
                    background: none;
                }
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