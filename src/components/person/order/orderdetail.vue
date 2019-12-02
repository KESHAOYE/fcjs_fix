<template>
    <div class="orderdetail">
        <div class="order_type">
            <div class="now_type">
                <span class="order_id">1234567890</span>
                <span class="status">
                    <!-- <i>&#xe714;</i> -->
                    <i>&#xe6af;</i>
                    提交订单
                </span>
                <span class="order_time">2019-10-9 11:06</span>
            </div>
            <div class="type_detail">
                <el-steps :active="1" align-center finish-status="success" process-status="wait">
                    <el-step title="提交订单">
                        <i slot="icon">&#xe60e;</i>
                        <span slot="description">2019-10-9 11:06</span>
                    </el-step>
                </el-steps>
            </div>
        </div>
        <div class="express_detail">
            <div class="shop_express">
                <div class="shop_img">
                    <img src="../../../assets/phone/iphone5s.png" alt="" srcset="">
                </div>
                <div class="shop_express_info">
                    <div class="express_row">
                        <span class="express_title">送货方式</span>
                        <span class="express_content">商家发货</span>
                    </div>
                    <div class="express_row">
                        <span class="express_title">承运快递</span>
                        <span class="express_content">顺丰快递</span>
                    </div>
                    <div class="express_row">
                        <span class="express_title">快递单号</span>
                        <span class="express_content">0000000000</span>
                    </div>
                </div>
            </div>
            <div class="express">
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top" type="success">
                        <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                         <span class="express_info_detail">您的订单在京东【福州分拨中心】分拣完成</span>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="order_info">
           <div class="man_info">
               <span class="info_title">收货人信息</span>
               <div class="detail_info">
                  <div class="detail_info_row">
                        <span class="detail_title">收货人:</span>
                        <span class="detail_content">李柯伟</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">收货电话:</span>
                        <span class="detail_content">15359639480</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">收货地址:</span>
                        <span class="detail_content">福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城福建省福州市仓山区林浦路闽江世纪城</span>
                    </div>
               </div>
           </div>
           <div class="pay_info">
               <span class="info_title">支付信息</span>
               <div class="detail_info">
                  <div class="detail_info">
                  <div class="detail_info_row">
                        <span class="detail_title">付款方式:</span>
                        <span class="detail_content">在线支付</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">付款时间:</span>
                        <span class="detail_content">2019-10-9 11：06</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">商品金额:</span>
                        <span class="detail_content price">50.00</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">优惠金额:</span>
                        <span class="detail_content price">0.00</span>
                    </div>
                    <div class="detail_info_row">
                        <span class="detail_title">应付金额:</span>
                        <span class="detail_content price">50.00</span>
                    </div>
               </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderdetail",
        data() {
            return {

            }
        },
        methods: {

        },

    }
</script>

<style lang="scss" scoped>
    .order_type {
        width: 100%;
        height: 250px;
        background: white;
        border-top: 4px solid #00303c;
        margin-top: 20px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .now_type {
            width: 30%;
            height: 200px;
            border-right: 1px solid #d2d2d2;
            display: flex;
            flex-flow: column nowrap;

            .order_id {
                color: #c2c2c2;
                font-family: "等线";
            }

            .order_id::before {
                content: "订单号:";
                position: relative;
                color: #c2c2c2;
                font-family: "等线";
            }

            .status {
                font-weight: bolder;
                color: #00303c;
                font-size: 2em;
                font-family: "等线";
                margin-top: 45px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;

                i {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid #00303c;
                    font-size: 0.7em;
                    margin-right: 10px;
                    display: block;
                    line-height: 35px;
                    text-align: center;
                }
            }

            .order_time {
                color: #c2c2c2;
                font-size: 0.8em;
                margin-top: 30px;
            }

            .order_time::before {
                content: "时间:";
                color: #c2c2c2;
                font-size: 0.8em;
            }
        }

        .type_detail {
            width: 60%;
            height: 200px;
            margin-left: 5%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;

            .el-steps--horizontal {
                width: 100%;
            }
        }
    }

    .express_detail {
        width: 100%;
        height: 300px;
        background: white;
        margin-top: 30px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .shop_express {
            width: 30%;
            height: 200px;
            border-right: 1px solid #d2d2d2;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;

            .shop_img {
                width: 90px;
                height: 90px;
                border: 1px solid #d2d2d2;

                img {
                    width: 90px;
                    height: 90px;
                }
            }

            .shop_express_info {
                height: 120px;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-around;

                .express_row {
                    display: flex;

                    .express_title {
                        font-size: 0.8em;
                        font-family: "等线";
                        color: #c2c2c2;
                    }

                    .express_content {
                        font-size: 0.8em;
                        font-family: "等线";
                        margin-left: 5px;
                        color: #3b3b3b;
                    }
                }
            }
        }
        .express{
            width: 60%;
                height: 230px;
                overflow: auto;
                padding:0 5%;
                text-align: left;
            }
    }
    .order_info{
        width: 100%;
        height: 250px;
        background: white;
        margin-top: 30px;
        margin-bottom: 30px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .man_info{
            min-width: 50%;
            height: 200px;
        }
        .pay_info{
            height: 200px;
            border-left: 1px solid #d2d2d2;
            .price::before{
                content:"￥";
            }
        }
        .info_title{
            font-size: 1.2em;
            color: #000;
            text-align: left;
            width: 90%;
            display: block;
            margin-left: 30px;
            font-weight: bolder;
        }
        .detail_info{
            margin-top: 10px;
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            .detail_info_row{
               width: 400px;
               text-align: left;
               margin-left: 30px;
               display: -webkit-box;
               -webkit-box-orient: vertical;
               -webkit-line-clamp: 3;
               text-overflow: ellipsis;
               overflow: hidden;
               margin-top: 5px;
               letter-spacing: 1px;
               .detail_content{
                   margin-left: 5px;
               }
            }
        }
    }
</style>