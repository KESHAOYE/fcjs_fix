<template>
  <div class="shopcar">
    <personbar />
    <headers />

    <div class="content">
      <div class="person_head">
        <span>我的购物车</span>
      </div>
      <el-table :data="this.$store.state.shopcar" ref="multipleTable" @selection-change="changetotal">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品" width="705" align="center">
          <template slot-scope="scope">
            <div style="display:flex;flex-flow:row nowrap;align-items:center;">
              <img :src="scope.row.img" style="width:100px;height:100px;margin-left:20px;" alt="">
              <span style="width:50%;text-align:left;margin-left:20px;">{{scope.row.shopname}}</span>
              <span style="margin-left:70px;">{{scope.row.shoptype}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="price" width="100" align="center">
        </el-table-column>
        <el-table-column label="数量" width="200" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count" :min="1" :max="20" label="描述文字" @change="changeprice"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="100" align="center">
          <template slot-scope="scope">
             ¥{{scope.row.price*scope.row.count}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="160" v-model="scope.row.delete">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.delete=false">取消</el-button>
                <el-button type="primary" size="mini" @click="delete(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" @click="opendelete(scope.row.delete)">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="shopcar_count">
        <span class="count_tip">已选择<span>{{count}}</span>件商品</span>
        <span class="count_tip">总价<span class="count_price">{{price}}</span>元</span>
        <span class="count_tip" v-if="count>0&&price>0"><div class="el-button">去下单</div></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shopcar",
    data() {
      return {
         count:0,
         price:0,
      }
    },
    mounted(){
     
    },
    methods:{
      opendelete(el){
        el=true;
        
      },
      delete(el){
         
      },
      changeprice(){
        this.changetotal(this.$refs.multipleTable.selection);
      },
      changetotal(el){
        this.count=el.length
        this.price=0
        el.forEach(element => {
          this.price=parseInt(this.price)+parseInt(element.price)*element.count
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
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
      border:1px solid #d2d2d2;
      border-bottom: 0;
      span {
        margin-left: 25px;
      }
    }
    .el-table{
      border:1px solid #d2d2d2;
      border-top: 0;
    }
    .shopcar_count{
      background: white;
      width: 100%;
      height: 70px;
      margin-top: 25px;
      border:1px solid #d2d2d2;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      .count_tip{
        margin-right:35px;
        font-size: 1.1em;
        span{
          color:red;
        }
        .count_price::before{
          content:"¥" 
        }
      }
    }
  }
</style>