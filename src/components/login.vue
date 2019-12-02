<template>
    <div class="login">
        <div class="back">
            <i @click="back()">&#xe656;</i>
        </div>
        <div class="logindialog">
            
           <div class="loginleft">          
           </div>
           <div class="loginright">
             <p class="l_title">登录</p>
             <span class="ftitle">登录福城建设账号,即刻享受更多服务</span>
             <div class="username">
             <i>&#xe629;</i>
             <input type="text" id="username" v-model="username"  placeholder="手机号" @blur="reg.checkphonenumber(null,username,checkok)" autocomplete="off"/>
             </div>
             <div class="password">
             <i>&#xe64e;</i>
             <input type="password" id="userpassword" v-model="password"  placeholder="请输入密码" @blur="reg.checkpassword(null,password,checkok)"/>
             </div>
             <div class="reg">
             <i>&#xe6a0;</i>
             <input type="text" @blur="reg.checkreg(null,regnum,checkok)" id="regnum" maxlength="4" v-model="regnum"  placeholder="请输入验证码" />
             <img src="http://localhost:3033/news/api/regnum.php" ref="regimg" alt="加载失败" srcset="">
             </div>
             <div class="errormsg" v-if="errormsg.length>0">{{errormsg}}</div>
             <button class="btn_login">登录</button>
             <span class="toreg">还没注册?<router-link to="/register">账号注册</router-link></span>
             <span class="intro">Copyright © 2016-2019 FCJS KESHAOYE</span>
           </div>
        </div>
    </div>
</template>

<script>
import reg from '../utils/reg'
// import store from '../../../store'
export default {
    name:"login",
    data(){
        return{
          username:"",
          password:"",
          regnum:"",
          errormsg:"",
        }
    },
    methods:{
        checkok(err){
        this.errormsg=err!=undefined?err:"";
        },
        back(){
            this.$router.go(-1)
        }
     }, 
    mounted() {
           
    },
}
</script>

<style lang="scss" scoped>
    .login{
        width:100%;
        height:100vh;
        background:linear-gradient(#2362b6 65%,#fff);
        background-attachment: scroll;
        display:flex;
        flex-flow: column nowrap;
        align-items: center;
    }
    .back{
        text-align: left;
        width: 100%;
        margin-left: 30px;
        margin-top: 25px;
        font-size: 2em;
        cursor: pointer;
        i{
            color:white;
        }
    }
    .logindialog{
        width:1400px;
        height:520px;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        margin-top:40px;
        position: relative;
        top: 50%;
        margin-top: -260px;
    }
    .loginleft{
        width:70%;
        height:100%;
        border-right:1px solid #f2f2f2;
        background: #f2f2f2 url('https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png') fixed no-repeat;
    }
    .loginleft img{
        width:100%;
        height:525px;
    }
    .loginright{
        width:30%;
        height:100%;
        display: flex;
        flex-flow:column nowrap;
        align-items: center;
    }
    .l_title{
        margin-top:40px !important;
        margin-bottom:5px;
        font-size:1.8em;
        font-family: "等线";
    }
    .ftitle{
       font-size:1em;
        font-family: "等线";
    }
    .intro{
        display: block;
        margin-top: 15px;
        font-size:0.6em;
        color:#d2d2d2;
    }
    .username, .password,.reg{
        width:auto;
        border-bottom:1px solid #b2b2b2;
        transition:.5s;
        margin-top:20px;
    }
    .username{
        margin-top:25px;
    }
    #regnum{
        width:100px;
    }
     .focus{
      border-bottom:1px solid #b2b2b2;
    } 
    input{
    margin-top:25px;
    border:0;
    width:200px;
    outline: 0;
    font-family: "等线";
    font-size:0.9em;
    padding-left:10px;
    margin-bottom:5px;
    }
    i{
        font-family:iconfont !important;
        font-style: normal;
        font-size:1.1em;
        color:#a2a2a2;
    }
    .toreg{
        margin-top:20px;
        font-family: "等线";
        color:#a2a2a2;
        font-size:0.5em;
    }
    .toreg a{
        text-decoration: none;
        color:#2362b6;
        font-size:0.5em;
    }
    .btn_login{
        margin-top:20px;
        border:0;
        width:230px;
        height:50px;
        font-size:1em;
        font-family: "等线";
        cursor: pointer;
        outline:none;
        color:white;
        background: linear-gradient(to right, #66b5ff 5%,#0084ff);
    }
    .errormsg{
      width: 230px;
      height: 20px;
      float: left;
      margin-top: 20px;
      font-size: 0.8em;
      color: red;
      text-align: left;
      line-height: 20px;
    }
    .errormsg::before{
        content: "\e60e";
        font-family: iconfont !important;
        margin-right: 5px;
    }
    @media screen and (max-width:1440px) {
        .logindialog{
        width:1000px;
        height:450px;
         }
        .loginleft img{
        width:100%;
        height:425px;
    }
    .loginleft{
        width:70%;
    }
    .loginright{
        width:40%;
    }
    .title{
        margin-top:20px;
        margin-bottom:20px;
        font-size:1.5em;
        }
        input{
         margin-top:20px;
        }
        .btn_login{
            margin-top:22px;
            height:40px;
            transition: .5s;
        }
        .toreg{
            margin-top:20px;
            transition: .5s;
        }
    }
</style>