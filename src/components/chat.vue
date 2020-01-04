<template>
    <div class="chat">
        <div class="chat_head">
            <div class="back">
              <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-houtui'></use>
              </svg>
            </div> 
            <div class="userstatus">
            </div>
            <div>{{chathead}}</div>
        </div>
        <!-- 聊天室主体 -->
        <div class="chat_content">

        </div>
        <div class="input_block">
            <input type="text" v-model="text">
            <div class="expression">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href='#icon-biaoqing'></use>
                </svg>
            </div>
            <div class="expression">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href='#icon-tupian'></use>
                </svg>
            </div>
            <div class="button">发送</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '',
                username: '',
                touser: '',
                chathead: '连接中..',
                status: false,
                chatInfo: [],
                oldchatInfo: []
            }
        },
        methods: {
            /**
             * 连接
             */
            connect() {
                if (this.username.length > 0) {
                    this.$socket.emit('connection')
                    this.$socket.emit('storeClientInfo', {
                        customId: this.username
                    })
                }
            },
            send() {
                this.$socket.emit('sayto', {
                    id: this.touser,
                    msg: this.text
                })
            }
        },
        sockets: {
            newconnect(data) {
                console.log(data)
            },
            disconnect() {
                console.log("与服务器断开连接");
            },
            sayto(data) {
                console.log(`用户${data.user}向您发送了:${data.msg}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chat {
        background: white;
        height: 700px;
        margin: 20px 0 10px 0;
        border-radius: 10px;
        border: 1px solid #f1f1f1;

        .chat_head {
            width: 100%;
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
                margin-right: 10px;
                border-radius: 50%;
            }
        }

        .chat_content {
            width: 100%;
            height: 600px;
            background: white;
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
                width: 75%;
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
</style>