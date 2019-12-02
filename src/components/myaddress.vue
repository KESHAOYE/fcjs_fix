<template>
    <div class="man_address">
        <div class="title">
            <span>请选择订单地址</span>
            <hr>
        </div>
        <div class="choose_address">
            <div class="address" :class="{active:chooseaddress==address.address_id,default:address.isdefault}" v-for="(address,index) in myaddress" :key="index" :id="address.address_id" @click="choose">
                <i>&#xe611;</i>
                <div class="row">
                    <span>{{address.address_name}}</span>&nbsp;&nbsp;
                    <span>{{address.address_phone}}</span>
                </div>
                <span class="address_detail">{{address.address_content}}</span>
            </div>
            <div class="address add_address" @click="add()">
                <i>&#xe61e;</i>
                <span>添加地址</span>
            </div>
        </div>
        <addaddress/>
    </div>
</template>

<script>
import addaddress from "../views/addaddress"
    export default {
      props:["addressid"],  
      data(){
          return{
              myaddress:[
                  {
                      address_id:"01238",
                      address_name:"李柯伟",
                      address_phone:"15359639480",
                      address_content:"福建省福州市台江区交通路红庆里20座603",
                      isdefault:false
                  },
                  {
                      address_id:"01239",
                      address_name:"李柯伟",
                      address_phone:"15359639480",
                      address_content:"福建省福州市仓山区林浦路闽江世纪城临江苑29号楼2701",
                      isdefault:true
                  }
              ],
              chooseaddress:this.addressid,
          }
      },
      methods:{
          add(){
             this.$store.commit("ocaddress",true)
          },
          choose(el){
             let addressid=el.currentTarget.attributes[1].value;
             this.chooseaddress=addressid
             this.$emit('orderaddress',this.chooseaddress)  
          }
    },
    components:{
        addaddress
    }
}
</script>

<style lang="scss" scoped>
    .default::after{
      content:"默认";
      color:white;
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
                position:relative;
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