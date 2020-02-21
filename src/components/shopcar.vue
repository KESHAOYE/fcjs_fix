<template>
  <div class="shopcar">
    <personbar />
    <headers />

    <div class="content">
      <div class="person_head">
        <span style='color:#ff3333'>我的购物车</span>
      </div>
      <el-table :data="this.$store.state.shopcar" ref="multipleTable" @selection-change="changetotal">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品" width="730" align="center">
          <template slot-scope="scope">
            <div style="display:flex;flex-flow:row nowrap;align-items:center;">
              <img :src="scope.row.shopimg" style="width:100px;height:100px;margin-left:10px;" alt="">
              <span style="width:50%;text-align:left;margin-left:30px;">{{scope.row.shopname}}</span>
              <span
                style="margin-left:70px;">{{scope.row.sku_name.replace(/"/g,'').replace(/{/,'').replace(/}/,'')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="per_price" width="100" align="center">
        </el-table-column>
        <el-table-column label="数量" width="200" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count" :min="1" :max="20" label="描述文字" @change="changeprice(scope.row)">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="100" align="center">
          <template slot-scope="scope">
            <span style='font-weight:bolder'>¥{{scope.row.per_price*scope.row.count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-popconfirm confirmButtonText='好的' cancelButtonText='不用了' icon="el-icon-info" iconColor="red"
              title="确定删除吗？" @onConfirm='deletes(scope.row)'>
              <el-button plain slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="shopcar_count">
        <span class="count_tip">已选择<span>{{count}}</span>件商品</span>
        <span class="count_tip">总价<span class="count_price">{{price}}</span>元</span>
        <span class="count_tip" v-if="count>0&&price>0">
          <div class="el-button order" @click='createorder'>去下单</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    addshopcar,
    deleteshopcar,
    getshopcar,
    createorders
  } from '@/http/api'
  export default {
    name: "shopcar",
    data() {
      return {
        count: 0,
        price: 0,
        chooseitem: [],
      }
    },
    mounted() {

    },
    methods: {
      opendelete(el) {
        el = true;
      },
      deletes(el) {
        let da = {
          shopid: el.shopid,
          userid: this.$store.state.userinfo.phone,
          sku_id: el.sku_id,
        }
        deleteshopcar(da)
          .then(data => {
            getshopcar({
                userid: this.$store.state.userinfo.phone
              })
              .then(data => {
                this.$store.commit('getshopcar', data.info)
              })
          })
      },
      changeprice(el) {
        let da = {
          shopid: el.shopid,
          userid: this.$store.state.userinfo.phone,
          sku_id: el.sku_id,
          count: el.count,
        }
        addshopcar(da)
          .then(data => {
            this.changetotal(this.$refs.multipleTable.selection);
          })
      },
      changetotal(el) {
        this.count = el.length
        this.price = 0
        this.chooseitem = []
        el.forEach(element => {
          this.price = parseInt(this.price) + parseInt(element.per_price) * element.count
          this.chooseitem.push({
            shopid: element.shopid,
            sku_id: element.sku_id,
            count: element.count,
            price: parseInt(element.per_price) * element.count
          })
        });
      },
      createorder() {
        const loading = this.$loading({
          lock: true,
          text: '订单创建中',
        });
        createorders({
            shopitem: this.chooseitem
          })
          .then(data => {
            if (data.code == 200) {
              setTimeout(() => {
                getshopcar({
                    userid: this.$store.state.userinfo.phone
                  })
                  .then(data => {
                    this.$store.commit('getshopcar', data.info)
                  })
                loading.close();
                this.$router.push({
                  name: 'ordersubmit',
                  query: {
                    orderid: data.orderid,
                    type: 0
                  }
                })
              }, 1000)
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  body {
    background: #f9f9f9;
  }

  .content {
    .person_head {
      width: 100%;
      height: 50px;
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

    .el-table tr {
      border-bottom: 2px solid #d2d2d2;
    }

    .el-table th {
      background: #f5f5f5;
    }

    .shopcar_count {
      background: white;
      width: 100%;
      height: 50px;
      margin-top: 25px;
      border: 1px solid #d2d2d2;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      position: relative;

      .count_tip {
        margin-right: 35px;
        font-size: 1.1em;

        span {
          color: red;
        }

        .count_price::before {
          content: "¥";
        }

        .order {
          width: 130px;
          height: 50px;
          background: #ff3333;
          right: 0;
          color: #fff;
          font-size: 1em;
          line-height: 25px;
        }
      }
    }
  }
</style>