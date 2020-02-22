<template>
  <div class="shopdetail">
    <personbar />
    <headers :isopen="false" />
    <div class="content">
      <div class="shop_top">
        <div class="left">
          <pic-zoom :url="img" class="gallery-top" :scale="3"></pic-zoom>
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiper">
            <swiper-slide v-for='(item,index) in shopInfo.img' :key="'info'+index"><img :src='item.path'></swiper-slide>
            <div class="swiper-button-next" slot="button-next">
              <i class='el-icon-arrow-right'></i>
            </div>
            <div class="swiper-button-prev" slot="button-prev">
              <i class='el-icon-arrow-left'></i>
            </div>
          </swiper>
        </div>
        <div class="right">
          <div class="shop_name">
            <div class="isold" v-if='shopInfo.isold == 1'></div>
            {{shopInfo.shopName}}
          </div>
          <div class="shop_des">{{shopInfo.shopdes}}</div>
          <div class="shop_price">
            <div class="prices">
              <span style="margin-left:20px">价格</span>
              <span class="price">{{price}}</span>
            </div>
            <div class="coupon" v-if='couponList.length>0'>
              <span style="margin-left:20px">优惠券</span>
              <span class="counpon_item" v-for='(item,index) in couponList' :key="index" :title='item.note'
                @click="getcoupons(item.coupon_id)">满{{item.min_price}}减{{item.amount}}</span>
            </div>
          </div>
          <div class="express">快递费: ￥0.00</div>
          <div class='info'>
            <div class="shopcount">月销量<span>{{shopInfo.sailCount}}</span></div>
            <div class="shopcomment">累计评价<span>{{commentCount}}</span></div>
          </div>
          <div class="specs">
            <div class="specs_items" v-for="(e,index) in shopInfo.sku" :key="index">
              <span class="shop_title" :value="e.name">{{e.specName}}</span>
              <div class="choosespecs">
                <div class="specs_item" v-for="(el,indexs) in e.value" :value="e.specId"
                  :class="{active: ischoose(el) !=-1 }" :key="indexs" @click="changespecs(e,el)">
                  {{el.specValue}}
                </div>
              </div>
            </div>
          </div>
          <div class="shopsubmit">
            <div class="count">
              <el-input-number v-model="shopnumber" @change="changecount" :min="1"></el-input-number>
            </div>
            <el-button class="add_shopcar" :disabled='stocks <= 0' @click='addshopcars'>
              {{addshopcar}}
            </el-button>
          </div>
          <div
            style="width:100%;height:15px;text-align:left;position:relative;top:-15px;color:#d2d2d2;font-size:0.7em;">
            *由福城建设发货并提供售后服务
          </div>
        </div>
      </div>
      <div class="shop_bottom">
        <div class="comment">
          <div class="comment_top"><span>商品评论</span></div>
          <div class="comment_tag">
            <div class="tag_item active" v-if='picture > 0'>有图({{picture}})</div>
            <div class="tag_item" v-if='good > 0'>好评({{good}})</div>
            <div class="tag_item" v-if='middle > 0'>中评({{middle}})</div>
            <div class="tag_item" v-if='bad > 0'>差评({{bad}})</div>
          </div>
          <div class="comment_list">
            <div class="null" v-if='commentList.length <= 0'>该商品暂无评论</div>
            <div class="comment_detail" v-for="(items,index) in commentList" :key="index">
              <div class="comment_user">
                <div class="user_head">
                  <img :src="items.headimg" alt="" srcset="">
                  <span class="user_name">
                    {{items.username}}
                  </span>
                </div>
                <el-rate :value=items.score disabled text-color="#ff9900" score-template="{rate}">
                </el-rate>
              </div>
              <span class="comment_text" v-html='items.comment'>
              </span>
              <div class="comment_img" v-if="items.comment_img != 'undefined'">
                <el-image v-for="(imgs,index) in items.comment_img" :src="imgs" :key="index"
                  :preview-src-list="items.comment_img">
                </el-image>
              </div>
              <div class="comment_time">
                {{items.comment_time|datewithtime}}
              </div>
              <div class="comment_tool">
                <div class="comment_report tool_item">举报</div>
                <div class="comment_good tool_item" :class="{active: items.islike > 0}" @click='likes(items.commentid)'>
                  ({{items.likes}})</div>
              </div>
            </div>
            <el-pagination background layout="prev, pager, next" :total="total" v-if='ismore&&commentList.length > 0'
              @current-change="handleCurrentChange" @size-change="handleSizeChange">
            </el-pagination>
          </div>
          <div class="comment_more" v-if="(!ismore)&&commentList.length > 0" @click="loadmore">
            点击加载更多...
          </div>
        </div>
        <div class="shop_introduce">
          <div class="comment_top"><span>商品详情</span></div>
          <div class="spu_show">
            <div>品牌: {{shopInfo.brandname}}/{{shopInfo.brandename}}</div><br />
            <span v-for='(item,index) in shopInfo.spu' :key="index">
              {{item.spec_name}}:{{item.spec_value}}
            </span>
          </div>
          <div class="introduce_detail" v-html='shopInfo.shopdetail'>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  var that;
  import {
    getshopinfo,
    getstock,
    getfirstcomment,
    getshopcoupon,
    getcomment,
    like,
    autologin,
    getuserinfo,
    addshopcar,
    getshopcar,
    getcoupon
  } from '@/http/api'
  import PicZoom from 'vue-piczoom'
  import {
    datewithtime
  } from '../../utils/filters'
  export default {
    name: "shopdetail",
    components: {
      PicZoom
    },
    data() {
      return {
        shopnumber: 1,
        isshowmore: true,
        img: '',
        swiperOptionThumbs: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,

          on: {
            slideChange: function () {
              that.img = that.shopInfo.img[this.activeIndex].path
            }
          }
        },
        commentList: [],
        couponList: [],
        shopInfo: '',
        stock: [],
        price: 0,
        stocks: 0,
        sku_id: '',
        sku_name: '',
        choosespecs: [],
        ismore: false,
        good: 0,
        middle: 0,
        bad: 0,
        picture: 0,
        commentCount: 0,
        total: 0,
        currentPage: 1
      }
    },
    computed: {
      ischoose: (val) => {
        return function (val) {
          let index = this.choosespecs.findIndex(el => {
            return el.value == val.specValue
          })
          return index
        }
      },
      addshopcar() {
        return this.stocks == 0 ? "无货" : "加入购物车"
      },
      userinfo() {
        return this.$store.state.userinfo
      }
    },
    methods: {
      async loadmore() {
        if (document.getElementsByClassName("loadinganimate")[0] == undefined) {
          await this.animate.loading("comment_list");
        }
        const data = {
          page: this.currentPage,
          pageSize: 10,
          shopid: this.shopInfo.shop_id,
          userid: this.userinfo.phone
        }
        getcomment(data)
          .then(res => {
            this.$nextTick(() => {
              this.ismore = true
              this.commentList = res.info
              this.animate.stoploading();
            })
          })
      },
      getcoupons(el) {
        if (Object.keys(this.$store.state.userinfo).length > 0) {
          getcoupon({
              id: el
            })
            .then(data => {
              if (data.code == 200) {
                this.$message({
                  message: '领取成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '领取失败' + data.message,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '请先登录',
            type: 'warning'
          })
          this.$router.push({
            name: 'login'
          })
        }
      },
      likes(el) {
        let userid = this.userinfo.phone
        like({
            commentid: el,
            userid: userid
          })
          .then(data => {
            const da = {
              page: this.currentPage,
              pageSize: 10,
              shopid: this.shopInfo.shop_id,
              userid: userid
            }
            if (this.ismore == true) {
              getcomment(da)
                .then(res => {
                  this.$nextTick(() => {
                    this.ismore = true
                    this.commentList = res.info
                  })
                })
            } else {
              getfirstcomment({
                  shopid: this.$route.query.shopid,
                  userid: userid
                })
                .then(data => {
                  this.commentList = data.info.comment
                })
            }
          })
      },
      changecount(value) {
        this.shopnumber = value;
      },
      getShop() {
        getshopinfo({
            shopid: this.$route.query.shopid
          })
          .then(data => {
            let result = []
            console.log(data.info[0].sku);
            data.info[0].sku.forEach(el => {
              let index = result.findIndex(es => {
                return el.spec_id == es.specId
              })
              if (index != -1) {
                const data = {
                  'specValue': el.value[0].spec_value,
                  'stock': el.value[0].stock,
                  'price': el.value[0].price,
                  'skuId': el.value[0].sku_id
                }
                result[index].value.push(data)
              } else {
                const data = {
                  specId: el.spec_id,
                  specName: el.spec_name,
                  value: [{
                    specValue: el.value[0].spec_value,
                    stock: el.value[0].stock,
                    price: el.value[0].price,
                    skuId: el.value[0].sku_id
                  }]
                }
                result.push(data)
              }
            })
            data.info[0].sku = result
            this.shopInfo = data.info[0]
            this.price = this.shopInfo.price + '起'
            this.img = this.shopInfo.img[0].path
            getshopcoupon({
                shopid: this.$route.query.shopid,
                sortid: data.info[0].sortid
              })
              .then(data => {
                this.$nextTick(() => {
                  this.couponList = data.info
                })
              })
          })
          .catch(err => {
            console.log(err);
            // this.$router.go('-1')
          })
        getstock({
            shopid: this.$route.query.shopid
          })
          .then(data => {
            this.stock = data.info
          })
        if (window.localStorage.getItem('_T_')) {
          let info = JSON.parse(window.localStorage.getItem('_T_'))
          let phone = info.phone
          let token = info._T_
          const d = {
            phone: phone,
            token: token
          }
          autologin(d)
            .then(data => {
              if (data.code === 200) {
                const qss = {
                  id: null,
                  phone: data.phone
                }
                getuserinfo(qss).then(datas => {
                  getfirstcomment({
                      shopid: this.$route.query.shopid,
                      userid: datas.info.phone
                    })
                    .then(data => {
                      this.commentList = data.info.comment
                      this.good = data.info.good
                      this.middle = data.info.middle
                      this.bad = data.info.bad
                      this.picture = data.info.picture
                      this.commentCount = data.info.commentCount
                    })
                })
              } else {
                console.log('token登录失败')
              }
            })
        } else {
          getfirstcomment({
              shopid: this.$route.query.shopid,
              userid: ''
            })
            .then(data => {
              this.commentList = data.info.comment
              this.good = data.info.good
              this.middle = data.info.middle
              this.bad = data.info.bad
              this.picture = data.info.picture
              this.commentCount = data.info.commentCount
            })
        }
      },
      commenttypechange(el) {

      },
      isObjectValueEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
          return false;
        }
        for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if (a[propName] !== b[propName]) {
            return false;
          }
        }
        return true;
      },
      findstock() {
        let result = {}
        this.choosespecs.forEach(el => {
          result[el.name] = el.value
        })
        let index = this.stock.findIndex(el => {
          let a = JSON.parse(el.sku_concat)
          return this.isObjectValueEqual(a, result)
        })
        let stock = this.stock[index]
        if (stock) {
          this.price = stock.price
          this.stocks = stock.stock
          this.sku_id = stock.id
          this.sku_name = stock.sku_concat
        }
      },
      getshopcars() {
        getshopcar({
            userid: this.$store.state.userinfo.phone
          })
          .then(data => {
            this.$store.commit('getshopcar', data.info)
          })
      },
      /**
       * 改变商品规格，同时更改商品售价
       */
      changespecs(name, el) {
        let index = this.choosespecs.findIndex(el => {
          return el.name == name.specName
        })
        if (index != -1) {
          this.choosespecs.splice(index, 1)
        }
        this.choosespecs.push({
          id: name.specId,
          name: name.specName,
          value: el.specValue,
        })
        this.findstock()
      },
      addshopcars() {
        if (Object.keys(this.$store.state.userinfo).length > 0) {
          let da = {
            shopimg: this.shopInfo.img[0].path,
            shopid: this.$route.query.shopid,
            sku_id: this.sku_id,
            count: this.shopnumber,
            shopname: this.shopInfo.shopName,
            sku_name: this.sku_name,
            price: this.shopnumber * this.price
          }
          this.$store.commit('addshopcar', da)
          da = {
            shopid: this.$route.query.shopid,
            userid: this.$store.state.userinfo.phone,
            sku_id: this.sku_id,
            count: this.shopnumber,
          }
          addshopcar(da)
            .then(data => {
              this.getshopcars()
              this.$message({
                message: '加入成功',
                type: 'success'
              })
            })
        } else {
          this.$message({
            message: '请先登录!',
            type: 'error'
          })
          this.$router.push({
            name: "login"
          })
        }
      },
      handleCurrentChange(el) {
        this.currentPage = el
        this.getads()
      },
      handleSizeChange(el) {
        this.pageSize = el;
        this.getads()
      }
    },
    created() {
      this.getShop()
      that = this
    },
    mounted() {}
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
        min-height: 600px;
        margin-top: 20px;
        background: #fff;

        .left {
          width: 500px;
          height: 550px;

          .gallery-top {
            margin-top: 50px;
            width: 500px;
            height: 300px;

            img {
              width: 300px;
              height: 300px;
            }
          }

          .gallery-thumbs {
            margin-top: 30px;
            box-sizing: border-box;

            .swiper-slide {
              width: 100px;
              height: 100px;
              left: -160px;

              img {
                width: 90px;
                height: 90px;
              }
            }

            .swiper-button-next,
            .swiper-button-prev {
              width: 40px;
              height: 100px;
              color: #b2b2b2;
              position: absolute;
              top: 20px;
              line-height: 100px;
              font-size: 3.5em;
              background: white;
              text-align: center;
              font-weight: bolder;
            }

            .swiper-button-prev {
              left: 0px;
            }

            .swiper-button-next {
              right: 0px;
            }

            .swiper-slide-active {
              width: 100px;
              height: 100px;
              border: 2px solid #ff3333;
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

          .shop_des {
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

          hr {
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
            min-height: 50px;
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

            .counpon_item {
              position: relative;
              height: 16px;
              padding: 2px 10px;
              line-height: 15px;
              text-align: center;
              border: 1px solid #df3033;
              background: #ffdedf;
              font-size: 14px;
              white-space: nowrap;
              color: #df3033;
              margin-left: 13px;
              cursor: pointer;
            }
          }

          .express {
            width: 100%;
            margin-top: 10px;
            color: #b2b2b2;
            text-align: left;
            margin-left: 10px;
          }

          .info {
            width: 100%;
            height: 35px;
            border: 1px solid #d9d9d9;
            border-left: 0;
            border-right: 0;
            margin: 15px auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .specs {
            width: 100%;
            height: 100%;
            margin-top: 0px;
            text-align: left;
            display: flex;
            flex-flow: column wrap;

          }

          .specs_items {
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
              // background: #ff3333;
              // color: white;
              border: 1px solid #ff3333 !important;
            }

            .specs_item {
              min-width: 70px;
              padding: 2px 5px;
              border: 1px solid #c2c2c2;
              text-align: center;
              height: 30px;
              line-height: 30px;
              font-size: 0.8em;
              cursor: pointer;
              margin-left: 10px;

              &:hover {
                border: 1px solid #ff3333 !important;
              }
            }
          }
        }

        .count {
          width: 75px;
          height: 25px;
          margin: 0;
          margin-right: 15px;

          .el-input-number {
            width: 75px;
          }

          .el-input-number__decrease,
          .el-input-number__increase {
            width: 18px;
          }

          .el-input input {
            padding: 0;
          }
        }

        .shopsubmit {
          width: 100%;
          height: 60px;
          display: flex;
          margin-bottom: 20px;
          margin-top: 30px;
          align-items: center;

          .add_shopcar,
          .add_order {
            width: 150px;
            height: 50px;
            // line-height: 50px;
            background: #ff3333;
            color: white;
            // cursor: pointer;
            font-size: 1.2em;
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
          min-height: 100px;
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
              font-size: 0.8em;
            }

            .active {
              background: #ff3333;
              color: white;
            }
          }

          .comment_list {
            width: 100%;
            min-height: 50px;

            .comment_detail {
              width: 92%;
              min-height: 0;
              padding: 20px 1%;
              margin: auto;
              border-top: 1px solid #d2d2d2;
              border-bottom: 1px solid #d2d2d2;
              text-align: left;
              padding-bottom: 30px;

              .comment_user {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                width: 500px;
                margin-bottom: 10px;

                .el-rate__icon {
                  margin: 0;
                }

                .user_head {
                  min-width: 0px;
                  height: 50px;
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  margin-right: 15px;

                  img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                  }

                  .user_name {
                    margin-left: 15px;
                  }
                }
              }

              .comment_text {
                margin-bottom: 10px;
                height: auto;
                display: block;
              }

              .comment_img {
                display: flex;
                flex-flow: row nowrap;
                margin: 10px 0;
                margin-bottom: 30px;

                img {
                  width: 100px;
                  height: 100px;
                  cursor: pointer;
                  border: 1px solid #d2d2d2;
                  margin-left: 5px;
                }
              }

              .comment_time {
                float: left;
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

                .active {
                  color: #ff3333;
                  pointer-events: none;
                  cursor: pointer;
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

          .comment_more {
            cursor: pointer;
            width: 100%;
            height: 50px;
            line-height: 50px;
          }
        }
      }

      .shopcount,
      .shopcomment {
        width: 50%;

        span {
          color: #ff3333;
          margin-left: 5px;
          font-weight: bolder;
        }
      }

      .shopcount {
        border-right: 1px solid #d2d2d2;
      }

      .shop_introduce {
        width: 100%;
        min-height: 100px;
        background: white;
        margin-bottom: 30px;

        .spu_show {
          width: calc(100% - 40px);
          min-height: 10px;
          border: 1px solid #d2d2d2;
          border-top: 0;
          display: flex;
          padding: 20px;

          span {
            width: 30%;
            display: block;
            margin-left: 15px;
            text-align: left;
          }

          div {
            width: 30%;
            display: block;
            text-align: left;
          }
        }

        .introduce_detail {
          width: 100%;
          display: block;
          padding: 15px 0;
        }
      }
    }

    .el-pagination {
      padding: 12px 10px !important;
    }
  }
</style>