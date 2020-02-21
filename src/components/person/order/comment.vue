<!-- 富文本 -->
<template>
    <div class="comment">
        <div class="person_head">
            <span>评论</span>
        </div>
        <div class="comment_item" v-for='(item,index) in comment'>
            <div class="shoplist_content">
                <div class="shoplist_items" :key="index">
                    <el-image style="width:90px;height:90px;" :src='item.path'></el-image>
                    <div class="shop_info">
                        <span class="shop_name">{{item.shopname}}</span>
                        <div class="shop_choose">
                            <span class="specs">{{item.sku|sku}}</span>
                        </div>
                    </div>
                    <div class="shop_price">
                        <span class="price">{{item.price}}</span>
                    </div>
                    <div class="shop_count">
                        <span class="scount">{{item.count}}</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <span>商品评价</span>
                <el-rate v-model="comment[index].rate" :colors="colors">
                </el-rate>
            </div>
            <div class="editor" ref="editor"></div>
            <div class="photo">
                <template v-for="(sl,indexs) in item.shopimg" v-if="item.shopimg.length > 0">
                    <img :src="sl" class="avatar" @click="deleteimg(index,indexs)">
                </template>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" :on-change="(file,fileList)=>{return changeIndex(index)}"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div class="footer">
            <div class="button" @click='send'>确认提交</div>
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import {
        getordershop,
        addcomment
    } from '@/http/api'
    export default {
        data() {
            return {
                editos: [],
                comment: [],
                shopList: [],
                index: 0,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
        },
        methods: {
            init() {
                getordershop({
                        orderid: this.$route.query.orderid
                    })
                    .then(data => {
                        this.shopList = data.info
                        this.shopList.forEach((el, index) => {
                            const data = {
                                shop_id: el.shop_id,
                                shopname: el.shopname,
                                sku: el.sku,
                                sku_id: el.sku_id,
                                path: el.path,
                                price: el.price,
                                count: el.count,
                                editor: '',
                                rate: 0,
                                content: '',
                                shopimg: []
                            }
                            this.comment.push(data)
                            setTimeout(() => {
                                data.editor = new E(this.$refs.editor[index])
                                data.editor.customConfig.menus = [ // 菜单配置
                                    'head', // 标题
                                    'bold', // 粗体
                                    'fontSize', // 字号
                                    'fontName', // 字体
                                    'italic', // 斜体
                                    'underline', // 下划线
                                    'strikeThrough', // 删除线
                                    'foreColor', // 文字颜色
                                    'backColor', // 背景颜色
                                    'link', // 插入链接
                                    'justify', // 对齐方式
                                    'quote', // 引用
                                    'undo', // 撤销
                                    'redo' // 重复
                                ]
                                data.editor.customConfig.onchange = (html) => {
                                    data.content = html
                                }
                                data.editor.create()
                            }, 100)
                        })
                    });
            },
            changeIndex(index) {
                this.index = index
            },
            send(){
                this.$loading({
                  lock: true,
                  text: '提交中...'
                })
                const data = {
                    userid: this.$store.state.userinfo.userid,
                    orderid: this.$route.query.orderid,
                    info:[]
                }
                this.comment.forEach(el=>{
                    const a = {
                        shop_id: el.shop_id,
                        sku_id: el.sku_id,
                        content: el.content,
                        rate: el.rate,
                        shopimg: el.shopimg
                    }
                    data.info.push(a)
                })
                addcomment(data)
                .then(data=>{
                    if(data.code == 200){
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        })
                        this.$router.push({name:'myorder'})
                    }
                })
            },
            deleteimg(el,els) {
                    this.comment[el].shopimg.splice(els, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
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
                        this.comment[this.index].shopimg.push(imgFile)
                    }
                }
                return isLt2M;
            }
        },
        mounted() {
            this.init()
        },
    }
</script>

<style lang="scss" scoped>
    .photo {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        margin-top: 15px;

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
            float: left;
            margin-right: 15px;
            border: 1px solid #d2d2d2;
            position: relative;
            top: 0;
            animation: photoshow .2s linear;
            margin-top: 5px;
            cursor: pointer;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-flow: row wrap;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            border: 1px dashed #d9d9d9;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
            margin-top: 5px;
        }
    }

    .comment {
        width: 100%;
        min-height: 250px;
        margin-top: 20px;

        .person_head {
            width: 100%;
            height: 50px;
            background: white;
            text-align: left;
            line-height: 50px;
            margin-top: 20px;
            border-radius: 5px;
            font-size: 1.3em;
            font-family: "等线";
            font-weight: bolder;

            span {
                margin-left: 25px;
            }
        }
    }

    .comment_item {
        width: calc(100% - 40px);
        padding: 20px;
        margin-top: 20px;
        background: white;

        .row {
            padding: 20px 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;

            span {
                margin: 0 8px;
            }
        }

        .editor {
            width: 100%;
            text-align: left;
        }
    }

    .shoplist_content {
        .shoplist_items {
            width: 100%;
            min-height: 150px;
            border: 1px solid #f2f2f2;
            padding: 15px 0;
            background: #fcfcfc;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            .el-image {
                width: 150px !important;
                height: 150px !important;
                margin-left: 25px;
            }

            .shop_info {
                width: 500px;
                height: 150px;
                display: flex;
                flex-flow: column wrap;

                .shop_name {
                    width: 430px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    word-break: break-all;
                    -webkit-line-clamp: 3;
                    margin-left: 30px;
                    text-align: left;
                    margin-top: 25px;
                }

                .shop_choose {
                    margin-top: 25px;
                    display: flex;
                    flex-flow: row wrap;
                    font-size: 0.8em;
                    margin-left: 30px;
                    justify-content: space-between;

                    .specs {
                        font-weight: bolder;

                        .data {
                            font-weight: normal;
                        }
                    }
                }
            }

            .shop_price {
                width: auto;
                flex: 1;
                height: 125px;
                padding-top: 25px;
                color: rgb(255, 68, 68);
                font-size: 1.3em;
                font-weight: bolder;

                .price::before {
                    content: "￥";
                    position: relative;
                }
            }

            .shop_count {
                width: auto;
                flex: 1;
                height: 120px;
                font-size: 1.1em;
                padding-top: 30px;

                .scount::before {
                    content: "x";
                    position: relative;
                }
            }
        }
    }

    .footer {
        width: 100%;
        height: 60px;
        margin-top: 20px;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;

        .button {
            width: 120px;
            height: 50px;
            line-height: 50px;
            margin-right: 25px;
            background: #ff3333;
            color: #fff;
            cursor: pointer;
        }
    }
</style>