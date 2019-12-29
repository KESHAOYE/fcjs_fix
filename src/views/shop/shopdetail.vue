<template>
  <div class="shopdetail">
    <personbar/>
    <headers :isopen="false" />
    <div class="content">
      <div class="shop_top">
        <div class="left">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
          </swiper>
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
            <swiper-slide><img src="../../assets/phone/iphone5s.png"></swiper-slide>
          </swiper>
        </div>
        <div class="right">
          <div class="shop_name">
            <div class="isold"></div>
            荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待
          </div>
          <div class="shop_des">商品介绍</div>
          <div class="shop_price">
            <span style="margin-left:20px">价格</span>
            <span class="price">500</span>
            <span class="oldprice">900</span>
          </div>
          <div class="shop_type" v-for="(el,index) in type" :key="index">
            <span class="shop_title">{{el.name}}:</span>
            <span class="type">{{el.data}}</span>
          </div>
          <hr/>
          <div class="specs">
            <div class="specs_items" v-for="(e,index) in specs" :key="index">
            <span class="shop_title" :value="e.name">{{e.name}}</span>
            <div class="choosespecs">
              <div class="specs_item" v-for="(el,index) in e.data" :value="el.specs_id" :class="{active:e.select==el.specs_id}" :key="index" @click="changespecs(e,el.specs_id)">
                {{el.specs_name}}
              </div>
            </div>
          </div>
          </div>
          <div class="shopsubmit">
            <div class="count">
            <el-input-number v-model="shopnumber" @change="changecount" :min="1"></el-input-number>
          </div>
            <div class="add_shopcar">
              加入购物车
            </div>
            <div class="add_order">
              立即下单
            </div>
          </div>
          <div class="null" style="width:100%;height:15px;text-align:left;position:relative;top:-15px;color:#d2d2d2;font-size:0.7em;">
            *由福城建设发货并提供售后服务
          </div>
        </div>
      </div>
      <div class="shop_bottom">
        <div class="comment">
          <div class="comment_top"><span>商品评论</span></div>
          <div class="comment_tag">
            <div class="tag_item active">有图(50)</div>
            <div class="tag_item">好评(23)</div>
            <div class="tag_item">中评(77)</div>
            <div class="tag_item">差评(3)</div>
            <div class="tag_item">特别好用(31)</div>
            <div class="tag_item">质量好(30)</div>
            <div class="tag_item">速度快(63)</div>
          </div>
          <div class="comment_list">
            <div class="comment_detail" v-for="(items,index) in commonList" :key="index">
              <div class="comment_user">
                <div class="user_head">
                  <img :src="items.authorhead" alt="" srcset="">
                  <span class="user_name">
                    {{items.author}}
                  </span>
                </div>
                <el-rate :value=items.rate disabled text-color="#ff9900" score-template="{rate}">
                </el-rate>
              </div>
              <span class="comment_text">
                 {{items.text}}
              </span>
              <div class="comment_img">
                 <el-image v-for="(imgs,index) in items.img" :src="imgs" :key="index" :preview-src-list="items.img"></el-image>
              </div>
              <div class="comment_tool">
                <div class="comment_report tool_item">举报</div>
                <div class="comment_good tool_item">({{items.like}})</div>
                <div class="comment_comment tool_item">({{items.comment}})</div>
              </div>
            </div>
          </div>
          <div class="comment_more" :v-show="isshowmore" @click="loadmore">
            点击加载更多...
          </div>
        </div>
        <div class="shop_introduce">
          <div class="comment_top"><span>商品详情</span></div>
          <div class="introduce_detail">
              
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "shopdetail",
    data() {
      return {
        shopnumber:1,
        isshowmore:true,
        swiperOptionTop: {
          spaceBetween: 10,
        },
        swiperOptionThumbs: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
        commonList:[
          {
            authorhead:require("../../assets/fixbg.png"),
            author:"KESHAOYE",
            text:"支持华为!爱中国，爱华为!",
            rate:5,
            like:"20",
            comment:"13",
            img:[
              require("../../assets/phone/mate30pro.png"),
              require("../../assets/phone/mate30pro.png"),
              require("../../assets/phone/mate30pro.png"),
            ]
          }
        ],
        type:[
          {
            name:"类型",
            data:"二手"
          },
          {
            name:"新旧程度",
            data:"9.5成新"
          },
          {
            name:"重量",
            data:"1.8KG"
          }
        ],
        specs:[{
           name:"颜色",
           select:"",           
           data:[
             {
               specs_id:"0213",
               specs_name:"黑色",
             },
             {
               specs_id:"0214",
               specs_name:"白色",
             },
             {
               specs_id:"0215",
               specs_name:"金色"
             }
           ]
        },{
          name:"存储",
          select:"",
          data:[
            {
              specs_id:"0216",
              specs_name:"64G",
              price:"",
            },
            {
               specs_id:"0217",
               specs_name:"256G",
               price:""
            }
          ]
        },
        {
          name:"成色",
          select:"",
          data:[
            {
              specs_id:"0218",
              specs_name:"95新"
            }
          ]
        }],
        choosespecs:[],
      }
    },
    methods:{
      async loadmore(){
          if(document.getElementsByClassName("loadinganimate")[0]==undefined){
            await this.animate.loading("comment_list");
           }
      },
      changecount(value){
        this.shopnumber=value;
      },
      commenttypechange(el){
        
      },
      /**
       * 改变商品规格，同时更改商品售价
       */
      changespecs(name,data){
        this.choosespecs.push({name:name.name,data:data})
        name.select=data;
    }
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  }
</script>

<style lang="scss">
  .shopdetail {
    .content {
      .shop_top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        min-height: 500px;
        margin-top: 20px;
        background: #fff;
        .left {
          width: 500px;
          height: 500px;

          .gallery-top {
            margin-top: 50px;

            img {
              width: 300px;
              height: 300px;
            }
          }

          .gallery-thumbs {
            margin-top: 30px;

            .swiper-slide {
              width: 100px;
              height: 100px;

              img {
                width: 90px;
                height: 90px;
              }
            }

            .swiper-button-next,
            .swiper-button-prev {
              width: 35px;
              height: 100px;
              background: #ff3333;
              color: white;
              position: absolute;
              top: 20px;
            }

            .swiper-button-prev {
              left: -120px;
            }

            .swiper-button-next {
              right: -120px;
            }

            .swiper-slide-active {
              width: 100px;
              height: 100px;
              border: 1px solid #ff3333;
            }
          }
        }

        .right {
          width: 680px;
          min-height: 500px;
          overflow: hidden;
          .shop_name {
            font-size: 1.1em;
            margin-top: 10px;
            text-align: left;
            width: 100%;
            height: 100%;
          }
          .shop_des{
            width: 100%;
            height: 100%;
            color: red;
            margin-top: 5px;
            text-align: left;
            font-size: 0.9em;
          }
          .shop_title {
            font-size: 0.9em;
            float: left;
          }
           hr{
             border: 0;
             border-top: 1px solid #d2d2d2;
           }
          .shop_type {
            width: 100%;
            height: 100%;
            line-height: 40px;
            margin-top: 4px;
            text-align: left;
            margin-left: 15px;
            color: #b2b2b2;
            .type {
              margin-left: 4px;
              font-size: 0.8em;
            }
          }

          .shop_price {
            width: 100%;
            height: 50px;
            background: #f2f2f2;
            margin-top: 15px;
            line-height: 50px;
            text-align: left;

            .price {
              font-size: 1.5em;
              color: red;
              margin-left: 5px;
              line-height: 50px;
              height: 50px;
              position: relative;
              top: 1px;
            }

            .price::before {
              content: "\e6cb";
              font-family: iconfont !important;
              font-size: 0.7em;
            }

            .oldprice {
              margin-left: 20px;
              color: #b2b2b2;
              text-decoration: line-through;
              position: relative;
              top: -1px;
            }

            .oldprice::before {
              content: "原价\e6cb";
              font-family: iconfont !important;
              font-size: 0.8em;
              position: relative;
              top: -1px;
            }
          }

          .specs {
            width: 100%;
            height: 100%;
            margin-top: 0px;
            text-align: left;
            display:flex;
            flex-flow:column wrap;

          }
          .specs_items{
            margin-top: 20px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 100%;
          }
          .choosespecs {
            display: flex;
            flex-flow: row wrap;
            height: 100%;
            float: left;
            width: 500px;
            margin-left: 15px;

            .active {
              background: #ff3333;
              color: white;
              border: 1px solid #ff3333 !important;
            }

            .specs_item {
              min-width: 50px;
              padding: 2px 5px;
              border: 1px solid #00303c;
              text-align: center;
              height: 20px;
              line-height: 20px;
              font-size: 0.8em;
              cursor: pointer;
              font-family: "幼圆";
              margin-left: 10px;
            }
          }
        }
        .count{
          width:75px;
          height:25px;
          margin:0;
          margin-right: 15px;
          .el-input-number{
            width: 75px;
          }
          .el-input-number__decrease,.el-input-number__increase{
            width: 18px;
          }
          .el-input input{
            padding:0;
          }
        }
        .shopsubmit {
          width: 100%;
          height: 60px;
          display: flex;
          margin-bottom:20px;
          margin-top: 40px;
          align-items: center;
          .add_shopcar,
          .add_order {
            width: 150px;
            height: 50px;
            line-height: 50px;
            background: #ff8533;
            color: white;
            cursor: pointer;
            font-size:1.2em;
          }

          .add_order {
            background: #ff3333;
            margin-left: 25px;
          }
        }
      }

      .shop_bottom {
        width: 100%;
        min-height: 200px;
        margin-top: 30px;
        .comment_top {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #f2f2f2;
            text-align: left;
            border: 1px solid #c2c2c2;
            margin-top: 30px;
            span {
              margin-left: 20px;
            }
          }
        .comment {
          width: 100%;
          min-height: 200px;
          background: white;

          

          .comment_tag {
            width: 98%;
            min-height: 0;
            padding: 20px 1%;
            display: flex;
            flex-flow: row wrap;

            .tag_item {
              min-width: 50px;
              padding: 0 15px;
              height: 25px;
              line-height: 25px;
              border-radius: 15px;
              background: #f2f2f2;
              margin-left: 5px;
              cursor: pointer;
              font-size:0.8em;
            }

            .active {
              background: #ff3333;
              color: white;
            }
          }

          .comment_list {
            width: 100%;
            min-height: 200px;
            margin-top: 20px;

            .comment_detail {
              width: 92%;
              min-height: 0;
              padding: 20px 1%;
              margin: auto;
              border-top: 1px solid #d2d2d2;
              border-bottom: 1px solid #d2d2d2;
              text-align: left;
              .comment_user{
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                width: 500px;
                margin-bottom: 10px;
                .user_head{
                min-width: 0px;
                height: 50px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin-right:20px;
                img{
                  width:35px;
                  height: 35px;
                  border-radius: 50%;
                }
                .user_name{
                  margin-left: 5px;
                }
                }
              }
              .comment_img {
                display: flex;
                flex-flow: row nowrap;
                margin-top: 10px;

                img {
                  width: 100px;
                  height: 100px;
                  cursor: pointer;
                  border: 1px solid #d2d2d2;
                  margin-left:5px;
                }
              }

              .comment_tool {
                display: flex;
                flex-flow: row wrap;
                float: right;
                font-size: 0.9em;

                .tool_item {
                  margin-left: 10px;
                  cursor: pointer;
                  font-family: iconfont !important;
                }

                .tool_item:hover {
                  color: red;
                  transition: .5s;
                }

                .comment_good::before {
                  content: "\e616";
                  font-size: 1.2em;
                  position: relative;
                  top: 1px;
                }

                .comment_comment::before {
                  content: "\e61a";
                  font-size: 1.2em;
                  position: relative;
                  top: 1px;
                }
              }
              
            }
          }
          .comment_more{
                cursor:pointer;
                width: 100%;
                height:50px;
                line-height: 50px;
              }
        }
      }
      .shop_introduce{
        width:100%;
        min-height:100px;
        background: white;
        margin-bottom:30px;
      }
    }
  }
</style>