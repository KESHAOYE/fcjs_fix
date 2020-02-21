/**
 * 统一管理API
 * Author: KESHAOYE
 * Time: 2020-01-08
 */
import {get, post } from './http'
    /******************************** 登录注册相关 ********************************/
    //获取图片验证码
export const getImgValidator = data => post('/api/imgValidator/GET', data)
    //验证图片验证码
export const checkImgValidator = data => post('/api/imgValidator/CHECK', data)
    //注册
export const register = data => post('/api/register/REGISTERNEW', data)
export const getphonevalidator = data=>post('/api/phoneValidator/GET',data)
export const checkphonevalidator = data=>post('/api/phoneValidator/CHECK',data)
    // 补充信息
export const fullinfo = data => post('/api/register/FULLINFO', data)
    // 登录
export const login = data => post('/api/login/LOGINU', data)
    //自动登录
export const autologin = data => post('/api/login/LOGINAUTO', data)
    // 获取用户信息
export const getuserinfo = data => post('/api/login/GETUSERINFO', data)
// 获取首页分类
export const getsort = data=> post('/api/sort/GETSORT',data)
//获取首页广告 
export const getad = data=> post('/api/ad/GETAD',data)
//获取搜索词
export const searchlist = data=> post('/api/search/SEARCHLIST',data)
export const searchresult = data => post('/api/search/SEARCHRESULT',data)
// 获取商品
export const getshopinfo = data=> post('/api/shop/GETSHOPBYID',data)
export const getstock = data =>post('/api/shop/GETSTOCK',data)
export const getfirstcomment = data => post('/api/comment/GETFIRST',data)
export const getcomments = data => post('/api/comment/GETCOMMENTS',data)
export const getshopcoupon = data =>post('/api/coupon/GETSHOPCOUPON',data)
export const getcomment = data =>post('/api/comment/GETCOMMENT',data)
export const like = data => post('/api/comment/like',data)
export const addshopcar = data=>post('/api/shopcar/ADDSHOPCAR',data)
export const getshopcar = data=>post('/api/shopcar/GETSHOPCAR',data)
export const deleteshopcar = data=>post('/api/shopcar/DELETESHOPCAR',data)

// 地址
export const addaddress = data => post('/api/address/ADDADDRESS',data)
export const getaddress = data => post('/api/address/GETADDRESS',data)
export const updateaddress = data => post('/api/address/UPDATEADDRESS',data)
export const deleteaddress = data => post('/api/address/DELETEADDRESS',data)

//优惠券
export const getcoupon = data => post('/api/coupon/USERGETCOUPON',data)
export const getusercoupon = data=>post('/api/coupon/GETUSERCOUPON',data)

//订单
export const createorders = data => post('/api/order/CREATEORDERSHOP',data)
export const getordershop = data => post('/api/order/GETORDERSHOP',data)
export const getordercoupon = data => post('/api/order/GETORDERCOUPON',data)
export const getuserorder = data => post('/api/order/GETUSERORDER',data)
export const getcenterorderinfo = data => post('/api/order/GETCENTERORDERINFO',data)
export const deleteorder = data=> post('/api/order/DELETEORDER',data)
export const pay = data =>post('/api/order/PAY',data)
export const getorderdetail = data=>post('/api/order/GETORDERDETAIL',data)
export const confirm = data=>post('/api/order/CONFIRM',data)

// 收款账号
export const getreceive = data => post('/api/receive/GETRECEIVE',data)
export const addreceive = data => post('/api/receive/ADDUSERPAY',data)
export const getuserreceive = data => post('/api/receive/GETUSERRECEIVE',data)
export const deleteuserpay = data => post('/api/receive/DELETEUSERPAY',data)

//售后
export const getaftersail = data => post('/api/aftersail/GETAFTERSAILINFO',data)
export const addaftersail = data=>post('/api/aftersail/ADDAFTERSAIL',data)

// 个人中心
export const getordercount = data=> post('/api/order/GETORDERCOUNT',data)
export const addcomment = data=> post('/api/comment/ADDCOMMENT',data)

// 维修

export const ugetfixbrand = ()=> get('/api/fixmodel/UGETFIXBRAND')
export const getfixmodelbyid = data=> post('/api/fixmodel/GETMODELBYID',data)
export const createfixorder = data=>post('./api/order/CREATEFIXORDER',data)