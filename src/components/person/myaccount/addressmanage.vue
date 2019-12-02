<template>
    <div class="addressmanage">
        <div class="person_head"><span>
                地址管理
            </span>
        </div>
        <div class="address_detail">
            <div class="address_title">我的地址</div>

            <div class="now_address">
                <div class="address_item">
                    <div class="address_row">
                        <span class="address_item_title">收货人:</span>
                        <span class="address_info"></span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">收货地区:</span>
                        <span class="address_info"></span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">收货地址:</span>
                        <span class="address_info"></span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">手机号码:</span>
                        <span class="address_info"></span>
                    </div>
                    <div class="address_tool">
                        <span class="address_tool_item">设为默认地址</span>
                        <span class="address_tool_item">编辑</span>
                        <span class="address_tool_item">删除</span>
                    </div>
                </div>
            </div>
            <div class="add_address" @click="add()">
                <i>&#xe61e;</i>
                <span>添加地址</span>
            </div>
        </div>
        <addaddress/>
    </div>
</template>

<script>
import addaddress from "../../../views/addaddress"
    export default {
        name:"addressmanage",
        data(){
            return{

            }
        },
        methods:{
            add(){
             this.$store.commit("ocaddress",true)
            }
        },
        components:{
            addaddress
        }
    }
</script>

<style lang="scss">
.person_head {
        width: 100%;
        height: 50px;
        background: white;
        text-align: left;
        line-height: 50px;
        margin-top: 20px;
        border-radius: 5px;

        span {
            margin-left: 25px;
        }
    }
    .address_detail {
        width: 100%;
        min-height: 300px;
        background: white;
        margin-top: 30px;
        border-radius: 5px;
        padding-top: 20px;

        .address_title {
            font-size: 1.2em;
            font-weight: bold;
            text-align: left;
            font-family: "等线";
            margin-left: 30px;
            height: 30px;
        }

        .now_address {
            border-top: 1px solid #f1f1f1;
            width: 100%;
            min-height: 0;
            margin-top: 10px;

            .address_item {
                width: 86%;
                min-height: 100px;
                border-bottom: 1px solid #f1f1f1;
                margin-left: 7%;
                margin-top: 20px;

                .address_row {
                    width: 100%;
                    height: 30px;
                    margin-top: 5px;
                    text-align: left;
                    font-size: 0.9em;
                }

                .address_tool {
                    text-align: right;
                    margin-bottom: 5px;

                    .address_tool_item {
                        margin-left: 10px;
                        font-size: 0.8em;
                        color: #0059ff;
                        cursor: pointer;
                    }
                }
            }

        }

        .add_address {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            height: 80px;
            width: 100%;
            cursor: pointer;

            i {
                font-size: 2.2em;
            }
        }
    }
</style>