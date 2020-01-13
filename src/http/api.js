/**
 * 统一管理API
 * Author: KESHAOYE
 * Time: 2020-01-08
 */
import {get, post } from './http'

const Token = localStorage.getItem('_FCT_')
    /******************************** 登录注册相关 ********************************/
    //获取图片验证码
export const getImgValidator = data => post('/api/imgValidator/GET', data)
    //验证图片验证码
export const checkImgValidator = data => post('/api/imgValidator/CHECK', data)
    //注册
export const register = data => post('/api/register/REGISTERNEW', data)
    // 补充信息
export const fullinfo = data => post('/api/register/FULLINFO', data)