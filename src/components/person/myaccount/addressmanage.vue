<template>
    <div class="addressmanage">
        <div class="person_head"><span>
                地址管理
            </span>
        </div>
        <div class="address_detail">
            <div class="address_title">我的地址</div>

            <div class="now_address">
                <div class="address_item" v-for='(item,index) in addressList' :key='index'>
                    <div class="address_row">
                        <span class="address_item_title">收货人:</span>
                        <span class="address_info">{{item.name}}</span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">收货地区:</span>
                        <span class="address_info">{{item.area|address}}</span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">收货地址:</span>
                        <span class="address_info">{{item.address}}</span>
                    </div>
                    <div class="address_row">
                        <span class="address_item_title">手机号码:</span>
                        <span class="address_info">{{item.phone}}</span>
                    </div>
                    <div class="address_tool">
                        <span class="address_tool_item" :class="{active: item.isDefault == 1}" @click='update(item)'>设为默认地址</span>
                        <span class="address_tool_item">编辑</span>
                        <span class="address_tool_item" @click='deletes(item.addressid)'>删除</span>
                    </div>
                </div>
            </div>
            <div class="add_address" @click="add()">
                <i>&#xe61e;</i>
                <span>添加地址</span>
            </div>
        </div>
        <addaddress @addsuccess='get()' />
    </div>
</template>

<script>
    import addaddress from "../../../views/addaddress"
    import {
        getaddress,
        updateaddress,
        deleteaddress
    } from '@/http/api'
    export default {
        name: "addressmanage",
        data() {
            return {
                addressList: []
            }
        },
        filters: {
            address(val) {
                val = JSON.parse(val)
                let str = ''
                for (let i in val) {
                    if (val[i] != null) {
                        str += val[i].value
                    }
                }
                return str
            }
        },
        methods: {
            add() {
                this.$store.commit("ocaddress", true)
            },
            get() {
                if (Object.keys(this.$store.state.userinfo).length > 0) {
                    getaddress({
                            userid: this.$store.state.userinfo.userid
                        })
                        .then(data => {
                            this.addressList = data.info
                            console.log(this.addressList)
                        })
                }
            },
            update(el) {
                el.isDefault = 1
                updateaddress(el)
                .then(data=>{
                  if(data.code == 200){
                      this.$message({
                          message: '设置成功',
                          type: 'success'
                      })
                      this.get()
                  }else if(data.code == 600){
                      this.$message({
                          message: '设置失败',
                          type: 'error'
                      })
                  }
                })
            },
            deletes(el){
              deleteaddress({addressid: el})
              .then(data=>{
                  if(data.code == 200){
                      this.$message({
                          message: '删除成功',
                          type: 'success'
                      })
                      this.get()
                  } else {
                     this.$message({
                          message: '删除失败',
                          type: 'error'
                      }) 
                  }
              })
            }
        },
        components: {
            addaddress
        },
        created() {
            this.get()
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
        min-height: 125px;
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

                    .active {
                        pointer-events: none;
                        color: #d2d2d2 !important;
                    }

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