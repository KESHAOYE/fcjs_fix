<template>
    <div class="balance">
        <div class="my_balance">
            <div class="my_balance_top">
                <span class="top_title">余额</span>
                <countTo class="countto" :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
            </div>
            <div class="transaction_record">
                <div class="person_title">交易记录</div>
                <div class="record_item">
                    <span class="record_name">支出</span>
                    <div class="right">
                        <span class="record_price bottom">-200.00</span>
                        <span class="record_time">2019-09-11</span>
                    </div>
                </div>
                <div class="record_item">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "balance",
        data() {
            return {
                startVal: 0,
                endVal: 2017
            }
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

    .balance {
        width: 100%;
        border-radius: 5px;

        .person_title {
            width: 97%;
            height: 50px;
            border-bottom: 1px solid #d9d9d9;
            line-height: 50px;
            text-align: left;
            padding-left: 3%;
            font-family: "等线";
            font-size: 1em;
        }

        .my_balance {
            width: 100%;

            .my_balance_top {
                width: 100%;
                height: 100px;
                background: white;
                margin-top: 20px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                border-radius: 5px;

                .top_title {
                    margin-left: 30px;
                    font-size: 1.2em;
                    font-family: "等线";
                    position: relative;
                    top: 2.5px;
                }

                .countto {
                    margin-left: 15px;
                    font-size: 2.3em;
                    font-family: "等线";
                }

                .countto:before {
                    content: "\e6cb";
                    font-family: iconfont !important;
                    position: relative;
                    //   left: -3px;
                    font-size: 20px;
                }
            }

            .transaction_record {
                width: 100%;
                min-height: 250px;
                background: white;
                margin-top: 30px;
                border-radius: 5px;

                .record_item {
                    width: 94%;
                    height: 80px;
                    border-bottom: 1px solid #f2f2f2;
                    margin-left: 3%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;

                    .record_name {
                        margin-left: 30px;
                        font-size: 1.3em;
                        font-family: "等线";
                    }

                    .right {
                        display: flex;
                        flex-flow: column nowrap;
                        margin-right: 50px;

                        .record_price {
                            font-size: 1.3em;
                            font-family: "等线";
                        }

                        .bottom {
                            color: #47d147;
                        }

                        .top {
                            color: red;
                        }

                        .record_time {
                            color: #b2b2b2;
                            margin-top: 15px;
                            font-size: 0.8em;
                        }
                    }
                }
            }
        }
    }
</style>