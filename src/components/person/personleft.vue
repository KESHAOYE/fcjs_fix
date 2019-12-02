<template>
  <div class="personleft">
    <div class="person_menu_items" v-for="(menu,index) in menus" :key="index">
      <span class="person_menu_title">{{menu.name}}</span>
      <span class="person_menu_item" v-for="menuitem in menu.data"
        :class="{'active':menuitem.personmenuid==currentIndex}"
        @click="changemenu(menuitem.router,menuitem.personmenuid,menuitem.activetype)">

        <span>{{menuitem.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personname",
    data() {
      return {
        menus: [{
            name: "订单中心",
            data: [{
                personmenuid: "11",
                name: "我的订单",
                router: "myorder",
              },
            ]
          },
          {
            name: "我的钱包",
            data: [{
                personmenuid: "21",
                name: "余额",
                router: "balance",
              },
              {
                personmenuid: "22",
                name: "优惠券",
                router: "coupon",
              },
              {
                personmenuid: "23",
                name: "支付方式",
                router: "paymethod",
              }
            ]
          },
          {
            name: "客户服务",
            data: [{
                personmenuid: "31",
                name: "售后申请(订单页)",
                router: "myorder",
              },
              {
                personmenuid: "32",
                name: "售后查询",
                router: "myorder",
                activetype: "dealing",
              },
              {
                personmenuid: "33",
                name: "我的客服",
                router: "#",
              }
            ]
          },
          {
            name: "我的账号",
            data: [{
                personmenuid: "41",
                name: "个人信息及修改",
                router: "myinfo",
              },
              {
                personmenuid: "42",
                name: "密码修改",
                router: "changepassword",
              },
              {
                personmenuid: "43",
                name: "地址管理",
                router: "addressmanage",
              },
            ]
          }
        ],
        currentIndex: 0,
      }
    },
    watch: {
      $route(to, from) {
        this.currentIndex = this.$route.query.mid ? this.$route.query.mid : 0;
      }
    },
    methods: {
      changemenu(router, id, query) {
        this.currentIndex = id;
        let squery = query ? {
          mid: id,
          activetype: query
        } : {
          mid: id
        }
        this.$router.push({
          name: router,
          query: squery
        })
      }
    },
    mounted() {
      this.currentIndex = this.$route.query.mid ? this.$route.query.mid : 0;
    }
  }
</script>

<style lang="scss">
  .personleft {
    width: 230px;
    min-height: 500px;
    background: #fff;
    margin-top: 20px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 5px;

    .person_menu_title {
      width: 80%;
      height: 30px;
      font-size: 1.2em;
      font-weight: bold;
      display: block;
    }

    .person_menu_item span:hover {
      color: red;
      transition: .1s;
    }

    .active {
      color: white;
      background: #303b30;
      border-radius: 20px;
      text-align: center !important;
      line-height: 35px;
      height: 35px;

      span:hover {
        color: white;
        transition: .1s;
      }
    }

    .person_menu_items {
      width: 80%;
      min-height: 0px;
      padding: 10px 0px;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      margin-top: 10px;
    }

    .person_menu_item {
      width: 80%;
      height: 35px;
      line-height: 35px;
      font-size: 0.9em;
      text-align: center;
      margin-top: 10px;
      display: block;
      cursor: pointer;

      i {
        margin-right: 8px;
        font-size: 1.5em;
        position: relative;
        top: 2.5px;
      }
    }

  }
</style>