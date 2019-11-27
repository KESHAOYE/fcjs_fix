<template>
        <el-dialog width="650px" :before-close="close" :visible.sync="addressvisiable" :append-to-body="true" :lock-scroll="true">
        <div slot="title" class="address_main_top">
                填写您的地址
            </div>
        <div class="address_main">
            <div class="row">
                <div class="row_title">姓名</div>
                <input type="text" v-model="name" placeholder="姓名" @blur="checkname"/>
            </div>
            <div class="row">
                <div class="row_title">电话</div>
                <input type="text" v-model="phone" placeholder="电话" @blur="checknumber"/>
            </div>
            <div class="row">
                <div class="row_title">地区</div>
                <v-region class="pick_address" v-model="area"></v-region>
            </div>
            <div class="row">
                <div class="row_title">详细地址</div>
                <input type="text" placeholder="详细地址" v-model="address" />
            </div>
            <div class="row">
                <el-switch v-model="isdefault" active-color="#00303c" inactive-color="#d2d2d2">
                </el-switch><span style="position:relative;top:-10px;left:10px;">是否为默认地址</span>
            </div>
            <div class="row">
                <div class="next">确认</div>
            </div>
        </div>
        </el-dialog>
</template>

<script>
import reg from '../utils/reg'
    export default {
        data() {
            return {
                isdefault: false,
                name:"",
                phone:"",
                area:"",
                address:"",
            }
        },
        methods:{
          close(){
              this.$store.commit("ocaddress",false)
          },
          checkname(){
            this.reg.checkname(null,this.name,this.errormsg)
          },
          checknumber(){
              this.reg.checkphonenumber(null,this.phone,this.errormsg)
          },
          errormsg(val){
              this.$message({
                  message:val,
                  type:"error",
                  duration:1500
              })
          }
        },
        computed:{
           addressvisiable(){
               return this.$store.state.isopenaddress
           }
        }
    }
</script>

<style lang="scss">
    .el-dialog__body{
        .address_main {
            // width: 600px;
            // height: 400px;
            // position: relative;
            // top: 50%;
            // margin: auto;
            // margin-top: -200px;
            // background: white;

            .address_main_top {
                width: 100%;
                height: 50px;
                background: #d2d2d2;
                color: black;
                line-height: 50px;
            }

            .row {
                height: 40px;
                line-height: 40px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                margin-top: 20px;
                padding-left: 50px;
                .next{
                    width: 120px;
                    height: 35px;
                    line-height: 35px;
                    cursor: pointer;
                    background: #00303c;
                    color: #fff;
                    position: relative;
                    top: -20px;
                    left: 45%;
                    margin-left: -60px;
                    text-align: center;
                }
                .row_title {
                    margin-right: 15px;
                    width: 70px;
                }

                input {
                    width: 250px;
                    height: 30px;
                    outline: 0;
                    padding-left: 5px;
                    font-size: 14px;
                }

                div.rg-select div.rg-select__el {
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                    cursor: pointer;
                    color: #666;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }

                div.rg-select div.rg-select__el div.rg-select__content {
                    /* padding: 6px 30px 6px 15px; */
                    font-size: 14px;
                    display: inline-block;
                    min-width: 100px;
                    height: 30px;
                    line-height: 20px;
                }
            }
        }
    }
</style>