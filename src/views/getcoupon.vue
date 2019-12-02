<template>
    <div class="getcoupon">
        <personbar/>
        <headers/>
        <div class="coupon_items">
           <div class="content">
               <div class="coupon_mtitle">领券中心</div>
               <div class="coupon_collect">
                   <div class="null_coupon" v-if="this.couponlist.length<=0">
                       这里没有优惠券啦~
                   </div>
                   <div class="coupon_item" v-for="(item,index) in couponlist" :key="index" :id="item.couponid">
                       <div class="coupon_tip_left"></div>
                    <div class="coupon_item_detail">
                        <div class="issget" v-if="item.isget">
                            <img src="../assets/geted.png" alt="">
                        </div>
                        <span class="coupon_title">
                            {{item.type}}
                        </span>
                        <span class="coupon_price">
                            {{item.money}}
                        </span>
                        <span class="coupon_time">
                            {{item.time}}
                        </span>
                    </div>
                    <div class="coupon_tip_right"></div>
                    <div class="coupon_item_bottom">
                        <span class="coupon_trandition">
                            {{item.condition}}
                        </span>
                    </div>
                     <div class="get_coupon" @click="getcoupon()">
                        <span v-if="!item.isget">立即领券</span>
                        <span v-if="item.isget">立即使用</span>
                     </div>
                   </div>
                   
               </div>
           </div>
        </div>
        <el-dialog title="领券成功" :visible.sync="dialogVisible" width="30%">
            <span>是否要使用？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="success" @click="dialogVisible = false">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"getcoupon",
    data(){
        return{
            dialogVisible: false,
            couponlist:[
                {
                    couponid:"1",
                    type:"限维修使用",
                    money:"5",
                    time:"2019年10月30日过期",
                    condition:"满40可用",
                    isget:false
                }
            ]
        }
    },
    methods:{
        getcoupon(){
            this.$confirm('领券成功,是否要使用？')
                    .then(()=> {
                        this.$router.push({name:"coupon",query:{mid:"22"}})
                    })
        }
    }
}
</script>

<style lang="scss" scoped>
    .coupon_items{
        margin-top: 50px;
        .coupon_mtitle{
           font-size: 1.3em;
           font-family: "等线";
        }
        .coupon_mtitle::before {
            content: "";
            width: 25px;
            height: 25px;
            position: absolute;
            margin-left: -40px;
            background: url("../assets/tuijian.png") no-repeat;
        }

        .coupon_mtitle::after {
            content: "";
            width: 25px;
            height: 25px;
            position: absolute;
            margin-left: 15px;
            background: url("../assets/tuijian.png") no-repeat;
            background-position: right;
        }
        .coupon_collect{
            width: 100%;
            min-height:100px;
            display: flex;
            flex-flow: row wrap;
            margin-top: 20px;
            .null_coupon{
                width: 100%;
                height: 50px;
                margin-top: 25px;
                text-align: center;
                line-height: 50px;
                font-family: "等线";
                font-size: 1.5em;
            }
        }
        .coupon_item {
                    width: 200px;
                    height: 195px;
                    background: #f4ca3a;
                    margin-left: 35px;
                    position: relative;
                    color: #303c30;
                    cursor: pointer;
                    margin-top: 15px;
                    margin-bottom: 15px;
                    
                    .coupon_tip_left {
                        width: 20px;
                        height: 20px;
                        float: left;
                        background: #f4f4f4;
                        border-radius: 50%;
                        position: relative;
                        left: -10px;
                        top: 50%;
                        margin-top: -35px;
                    }

                    .coupon_tip_right {
                        width: 20px;
                        height: 20px;
                        float: right;
                        background: #f4f4f4;
                        border-radius: 50%;
                        position: relative;
                        right: -10px;
                        top: 50%;
                        margin-top: -35px;
                    }
                    .get_coupon{
                        width: 200px;
                        height: 30px;
                        position: absolute;
                        bottom: 0px;
                        line-height: 30px;
                        font-family: "等线";
                        font-size: 0.8em;
                    }
        }
        .coupon_item_detail {
                        float: left;
                        width: 150px;
                        text-align: center;
                        margin-left: 25px;
                       .issget{
                        z-index: 1000;
                        position: absolute;
                        top: 30px;
                        left: 120px;
                    }
                        .coupon_title {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 15px;
                            position: relative;
                            font-size: 0.8em;
                        }

                        .coupon_price {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 30px;
                            position: relative;
                            font-size: 2.5em;
                            font-weight: bolder;
                        }

                        .coupon_price:before {
                            content: "\e6cb";
                            font-family: iconfont !important;
                            font-size: 24px;
                            margin-right: -12px;
                        }

                        .coupon_time {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            top: 35px;
                            position: relative;
                            font-size: 0.8em;
                        }

                    }

                    .coupon_item_bottom {
                        width: 100%;
                        height: 30px;
                        background: #303c30;
                        position: absolute;
                        bottom: 30px;

                        .coupon_trandition {
                            width: 100%;
                            display: block;
                            text-align: center;
                            font-family: "等线";
                            // top:55px;
                            height: 30px;
                            line-height: 30px;
                            position: relative;
                            font-size: 0.9em;
                            color: white;
                        }
                    }

                .coupon_item:after {
                    position: absolute;
                    content: "";
                    width: 200px;
                    bottom: 0;
                    left: 0;
                    border-bottom: 1px dashed white;
                    display: block;
                }
    }
</style>