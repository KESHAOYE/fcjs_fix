import axios from 'axios';
import qs from 'qs';
import {message} from 'element-ui';
import store from '../store';
import router from 'vue-router';
//判断环境
if (process.env.NODE_ENV == "development") { 
  process.env.BASE_API="localhost:3000"
} else if (process.env.NODE_ENV == "debug"){
 process.env.BASE_API = "localhost:3000"
}else if(process.env.NODE_ENV=="production"){
 process.env.BASE_API=""
}
const server=axios.create({
    baseURL:process.env.BASE_API,
    //时延 5s
    timeout:10000
})
//请求拦截器-在发送请求前判断是否带token
server.interceptors.request.use(
    config=>{
        const token=store.state.loginToken;
        token&&(config.headers.Authorization=token);
        return config;
    },
    error=>{
        return Promise.error(error)
     }
)
//响应拦截器-如果状态码错误，则报错
server.interceptors.response.use(
    response=>{
        if(response.status===200){
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    //如果返回状态码不为2开头，进入报错
    error=>{
       //其余情况操作，直接打印在控制台
       if(error.response){
       if(error.response.status){
           switch(error.response.status){
               //401：登陆失败：即用户名或密码错误
               case 401:
                 router.push(
                     {
                         path:"/login",
                     }
                 )
                 message({
                     message:"用户名或密码错误",
                     type:"error",
                     duration:"1500"
                 })   
                 break;
                 //402：验证码错误：手机验证码发生错误
               case 402:
                message({
                    message:"验证码错误",
                    type:"error",
                    duration:"1500"
                })
                break;
                //403：拒绝访问：token过期/无token情况已经由请求拦截器截拦
                case 403:
                 localStorage.removeItem("loginToken");
                   router.push({
                       path: "/login",
                       query: {
                           prepath: router.currentRoute.fullPath
                       }
                   })
                    message({
                        message: "登陆过期,请重新登录!",
                        type: "error",
                        duration: "1500"
                    })
                    break;
                //404：不存在接口
                case 404:
                    message({
                        message: "请求错误!",
                        type: "error",
                        duration: "1500"
                    })
                    break;
                //405：未登录
                case 405:
               router.push({
                   path: "/login",
                   query: {
                       prepath: router.currentRoute.fullPath
                   }
               })
               message({
                   message: "您暂未登录!",
                   type: "error",
                   duration: "1500"
               })
               break;
               default:
                   message(
                       {
                           message:"发生错误,请重试！",
                           type:"error",
                           duration:"1500"
                       }
                   )
           }
           return Promise.reject(error.response)
       }
    }else{
          message(
               {
                    message: "网络错误,请刷新重试！",
                    type: "error",
                    duration: "1500"
               }
           )
           console.log("error:"+error)
           return Promise.reject(error)
       }
    }
)
//get方法
/**
 * 封装的get方法
 * @param {*} url 接口路径
 * @param {*} params 参数
 */
export function get(url,params){
  return new Promise((resolve,reject)=>{
      axios.get(url,params)
      .then((data)=>{
          resolve(data)
      })
      .catch((error)=>{
          reject(error)
      })
  })
}
//post方法
/**
 * 封装post方法
 * @param {*} url 接口路径
 * @param {*} params 参数
 */
export function post(url,params){
  return new Promise((resolve,reject)=>{
      axios.post(url,qs.stringify(params))
      .then((data)=>{
          resolve(data)
      })
      .catch((error)=>{
          reject(error)
      })
  })
}

export default server;