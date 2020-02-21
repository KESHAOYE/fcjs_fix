<template>
    <div class="man_address">
        <div class="title">
            <span>请选择订单地址</span>
            <hr>
        </div>
        <div class="choose_address">
            <div class="address" :class="{active:addressid == item.addressid,default:item.isDefault}"
                v-for="(item,index) in myaddress" :key="index" @click="choose(item.addressid)">
                <i>&#xe611;</i>
                <div class="row">
                    <span>{{item.name}}</span>&nbsp;&nbsp;
                    <span>{{item.phone}}</span>
                </div>
                <span class="address_detail">{{item.area|address}}{{item.address}}</span>
            </div>
            <div class="address add_address" @click="add()">
                <i>&#xe61e;</i>
                <span>添加地址</span>
            </div>
        </div>
        <addaddress @addsuccess='get()' />
    </div>
</template>

<script>
    import addaddress from "../views/addaddress"
    import {
        getaddress,
        updateaddress,
        deleteaddress
    } from '@/http/api'
    export default {
        // props: ["addressid"],
        data() {
            return {
                myaddress: [],
                addressid: ''
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
        watch: {
            $route(val) {
                this.$router.go(-1)
            }
        },
        methods: {
            add() {
                this.$store.commit("ocaddress", true)
            },
            choose(eld) {
                 this.addressid = eld
                let index = this.myaddress.findIndex(el => {
                    return el.addressid == eld
                })
                let val = this.myaddress[index].area
                val = JSON.parse(val)
                let str = ''
                for (let i in val) {
                    if (val[i] != null) {
                        str += val[i].value
                    }
                }

                this.$emit('orderaddress', {
                    ...this.myaddress[index],
                    str: str
                })
            },
            get() {
                if (Object.keys(this.$store.state.userinfo).length > 0) {
                    getaddress({
                            userid: this.$store.state.userinfo.userid
                        })
                        .then(data => {
                            this.myaddress = data.info
                            this.myaddress.forEach((el, index) => {
                                if (el.isDefault == 1) {
                                    this.addressid = el.addressid
                                    let val = this.myaddress[index].area
                                    val = JSON.parse(val)
                                    let str = ''
                                    for (let i in val) {
                                        if (val[i] != null) {
                                            str += val[i].value
                                        }
                                    }
                                    this.$emit('orderaddress', {
                                        ...this.myaddress[index],
                                        str: str
                                    })
                                }
                            })
                        })
                }
            }
        },
        created() {
            this.get()
        },
        components: {
            addaddress
        }
    }
</script>

<style lang="scss" scoped>
    .default::after {
        content: "默认";
        color: white;
        padding: 1px 5px;
        border-radius: 12px;
        background: rgb(255, 77, 77);
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 0.6em;
        font-family: "等线";
        //border-top-right-radius: 8px;
    }

    .man_address {
        width: 100%;
        min-height: 120px;
        background: white;
        margin-top: 30px;

        .title {
            width: 95%;
        }

        .choose_address {
            width: 100%;
            height: 120px;
            margin-top: 10px;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0 50px;

            .address {
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
                position: relative;

                span {
                    font-size: 0.7em;
                }

                .address_detail {
                    width: 180px;
                    height: 30px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;

                }

                i {
                    font-size: 1.5em;
                }
            }

            .active {
                border: 1px solid #23a96f;
                color: #23a96f;
            }

            i {
                font-size: 2em;
                background: none;
            }
        }
    }
</style>