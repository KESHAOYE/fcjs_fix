<template>
    <div class="body">
        <div class="chat">
            <div class="chat_head">
                <div class="back">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href='#icon-houtui'></use>
                    </svg>
                </div>
                <div class="userstatus" :class="{connectsuccess: status}">
                </div>
                <div @click='connect'>{{chathead}}</div>
            </div>
            <!-- 聊天室主体 -->
            <div class="chat_content">
                <div class="row" v-for='(item,index) in chatInfo' :key="index">
                    <div :class="{my: item.type == 'USER', other: item.type == 'ADMIN'}">
                        <img :src="adminInfo.userHead" alt="">
                        <div class="dialog" v-if='item.msg.length >0 '>{{item.msg}}</div>
                        <div class="dialog" v-if='item.img.length >0 '>
                            <el-image :src='item.img' style="width: 100px;height: 100px;" alt="图片加载失败"
                                :preview-src-list="item.img|bigimg" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="input_block">
                <input type="text" v-model="text" @keyup.enter='send'>
                <el-popover ref="popover" placement="top" title="标题" width="200" trigger="click">
                    <div class="emoji">

                    </div>
                    <div class="expression" slot="reference">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href='#icon-biaoqing'></use>
                        </svg>
                    </div>
                </el-popover>
                <div class="expression">
                    <el-upload class="avatar-uploader" :show-file-list="false"
                        action='https://jsonplaceholder.typicode.com/posts' :before-upload="beforeAvatarUpload">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href='#icon-tupian'></use>
                        </svg>
                    </el-upload>
                </div>
                <div class="button" @click='send'>发送</div>
            </div>
        </div>
        <div class="order">
            <div class="order_head">最近订单</div>
            <div class="order_content">
                <div class="null" v-if='orderInfo.length <= 0'>暂无订单</div>
                <div class="order_item" v-for='(item,index) in orderInfo' @click='sendOrder(item.order_id)' title="点击发送具体信息给客服">
                    <div class="order_item_head">
                        <span class="order_id">订单号:{{item.order_id}}</span>
                        <span class="order_date">{{item.order_date|date}}</span>
                    </div>
                    <div class="order_contents">
                        <div class="order_content_item" v-for='(items,index) in item.shop'>
                            <el-image :src='items.shopimg' alt='加载失败' style="width: 80px; height: 80px;"></el-image>
                            <span class="shopname">{{items.shopname}}</span>
                        </div>
                    </div>
                    <div class="order_item_footer">
                        <span class="totalprice">总价:￥{{item.order_money}}</span>
                        <span class="order_state">{{item.order_state|state}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getuserorder
    } from '@/http/api'
    export default {
        data() {
            return {
                text: '',
                username: '',
                touser: '',
                chathead: '连接中..',
                status: false,
                chatInfo: [],
                oldchatInfo: [],
                adminInfo: [],
                orderInfo: []
            }
        },
        computed: {
            userinfo() {
                return this.$store.state.userinfo
            }
        },
        filters: {
            bigimg(val) {
                let img = []
                img.push(val)
                return img
            },
            date(val) {
                let reg = new RegExp(/^\d+-\d+-\d+/)
                return reg.exec(val)[0]
            },
            state(val){
                return {
                1:'待付款',
                2:'待维修',
                3:'维修中',
                41:'待商家发货',
                42:'待用户发货(维修)',
                5:'待收货',
                6:'待评价',
                7:'已完成',
                8:'售后退货中',
                9:'售后换货中',
                10:'售后维修中',
                11:'售后完成',
            }[val]
            }
        },
        methods: {
            /**
             * 连接
             */
            connect() {
                this.chathead = '连接中...'
                this.username = this.userinfo.username
                if (this.username && this.username.length > 0 && this.status == false) {
                    this.$socket.emit('connection')
                    this.$socket.emit('storeClientInfo', {
                        userid: this.userinfo.userid,
                        customId: this.username,
                        type: 'USER'
                    })
                    getuserorder({
                            userid: this.userinfo.userid
                        })
                        .then(data => {
                            if (data.code == 200) {
                                this.orderInfo = data.info
                            }
                        })
                    this.$socket.emit('findAdmin')
                }
            },
            send() {
                if (this.status) {
                    const data = {
                        data: this.adminInfo,
                        type: 'USER',
                        msg: this.text,
                        img: '',
                        order:''
                    }
                    this.text = ''
                    this.$socket.emit('sayto', data)
                    this.chatInfo.push(data)
                } else {
                    this.$message({
                        message: '暂未连接成功,不可发送',
                        type: 'error'
                    })
                }
            },
            sendOrder(id){
                if (this.status) {
                    const data = {
                        data: this.adminInfo,
                        type: 'USER',
                        msg: `已发送订单信息给客服`,
                        img:'',
                        order: id
                    }
                    this.text = ''
                    this.$socket.emit('sendorder', data)
                    this.chatInfo.push(data)
                } else {
                    this.$message({
                        message: '暂未连接成功,不可发送',
                        type: 'error'
                    })
                }
            },
            sendimage(img) {
                if (this.status) {
                    const data = {
                        data: this.adminInfo,
                        type: 'USER',
                        msg: '',
                        img: img,
                        order:''
                    }
                    this.text = ''
                    this.$socket.emit('sayto', data)
                    this.chatInfo.push(data)
                } else {
                    this.$message({
                        message: '暂未连接成功,不可发送',
                        type: 'error'
                    })
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                } else {
                    let files = new FileReader();
                    files.readAsDataURL(file)
                    files.onload = e => {
                        let imgFile = e.target.result;
                        this.sendimage(imgFile)
                    }
                }
            }
        },
        sockets: {
            newconnect(data) {
                // this.connect()
            },
            disconnect() {
                this.chathead = '断开连接'
                this.status = false
                console.log("与服务器断开连接");
                this.connect()
            },
            sayto(data) {
                this.chatInfo.push(data)
            },
            userDisconnect(data) {
                if (data.clientId == this.adminInfo.clientId) {
                    this.chathead = '客服掉线,等待重连'
                    this.status = false
                    this.connect()
                }
            },
            finedAdmin(data) {
                if (data.status) {
                    this.adminInfo = data.adminInfo
                    this.chathead = this.adminInfo.customId
                    this.status = true
                    this.$notify({
                        title: '提示',
                        message: '连接成功,目前聊天系统不稳定,仅用于测试，BY:KESHAOYE',
                        type: 'success'
                    })
                } else {
                    this.chathead = '当前无客服在线'
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.connect()
            }, 500)
        },
    }
</script>

<style lang="scss" scoped>
    .body {
        width: 100vw;
        height: 100vh;
        background: #2e2f3d;
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .chat {
        background: white;
        height: 600px;
        border-radius: 10px;
        border: 1px solid #f1f1f1;
        width: 830px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        .chat_head {
            width: 830px;
            height: 50px;
            font-family: '微软雅黑';
            font-size: 1.2em;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            position: relative;
            border-bottom: 1px solid #f2f2f2;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            .back {
                position: absolute;
                left: 10px;
                font-size: 1.8em;
            }

            .userstatus {
                width: 10px;
                height: 10px;
                background: red;
                position: relative;
                left: -10px;
                border-radius: 50%;
            }

            .connectsuccess {
                background: #59fc18;
            }
        }

        .chat_content {
            width: 830px;
            height: 460px;
            padding: 20px 0;
            background: white;
            overflow-y: auto;

            .my,
            .other {
                width: 100%;
                color: white;
                clear: both;
                font-family: '微软雅黑';

                img {
                    float: right;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-top: 30px;
                    margin-right: 10px;
                }

                .dialog {
                    padding: 10px;
                    min-height: 20px;
                    max-width: 600px;
                    margin-top: 35px;
                    margin-right: 10px;
                    text-align: left;
                    height: auto;
                    background: #0084ff;
                    white-space: normal;
                    word-break: break-all;
                    word-wrap: break-word;
                    border-radius: 10px;
                    float: right;
                }
            }

            .other {
                img {
                    float: left;
                    margin-top: 30px;
                    margin-left: 10px;
                }

                .dialog {
                    background: #d2d2d2;
                    color: black;
                    float: left;
                    margin-left: 10px;
                }
            }
        }

        .input_block {
            height: 50px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #f2f2f2;

            input {
                height: 35px;
                width: 550px;
                background: #f2f2f2;
                border-radius: 25px;
                border: 0;
                outline: 0;
                font-size: 1.1em;
                padding-left: 10px;
            }

            .expression {
                width: 35px;
                height: 35px;
                font-size: 1.8em;
                cursor: pointer;
            }

            .button {
                width: 80px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                background: #409EFF
            }
        }
    }

    .order {
        width: 300px;
        height: 600px;
        background: #FAF9F9;
        border: 1px solid #f1f1f1;
        border-left: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        .order_head {
            width: 300px;
            height: 50px;
            border-bottom: 1px solid #f2f2f2;
            font-family: '微软雅黑';
            font-size: 1.2em;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border-top-right-radius: 10px;
        }

        .order_content {
            width: 95%;
            margin: auto;
            height: 550px;
            overflow-y: auto;

            .null {
                font: {
                    family: '微软雅黑';
                }

                color: #000;
                margin-top: 10px;
                background: #FAF9F9;;
            }
            .order_item{
                margin-top: 15px;
                background: #fff;
                margin-bottom: 7.5px;
            }
            .order_item_head {
                width: 100%;
                height: 30px;
                padding: 3px 0;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f2f2f2;
                
                .order_id {
                    width: 65%;
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 0.9em;
                    margin-left: 10px;
                }

                .order_date {
                    width: 30%;
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 0.9em;
                }
            }

            .order_contents {
                width: 100%;
                min-height: 80px;

                .order_content_item {
                    display: flex;
                    width: 100%;
                    height: 80px;
                    padding: 8px 0;
                    border-bottom: 1px solid #f2f2f2;

                    .shopname {
                        width: 180px;
                        font-size: 0.9em;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        text-align: left;
                        height: 36px;
                    }
                }
            }
            .order_item_footer{
                width: 100%;
                height: 35px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .order_state{
                    min-width: 55px;
                    height: 20px;
                    line-height: 20px;
                    background: #ffeded;
                    color: #ff3333;
                    border-radius:6px ;
                    display: block;
                    margin-right: 25px;
                    font-size: 0.9em;
                }
            }
        }
    }
</style>