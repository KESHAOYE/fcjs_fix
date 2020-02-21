
    /**
     * 过滤器,将手机维修标签更改为中文
     */
    let account=val=>{
        let arr = null;
        if (val.length > 15) {
            arr = Array.from(val)
            for (let i = 0; i < arr.length; i++) {
                if (i == 4 || i == 9 || i == 14 || i == 19) {
                    if (arr[i] != " ") {
                        arr.splice(i, 0, " ");
                        continue
                    }
                }
                if (i >= 5 && i <= 13) {
                    if (i != 9) {
                        arr.splice(i, 1, "*")
                    }
                }
            }
            val = arr.join("");

        }
        return val
    }
    
    let date = (val)=>{
        let d = new Date(val)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();  
    }
    
    let datewithtime = (val)=>{
        let d = new Date(val)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
    }
    
    let state = (val)=>{
            return {
                1:'待付款',
                2:'待维修',
                3:'维修中',
                41:'待商家发货',
                42:'待用户发货(维修)',
                5:'待收货',
                6:'待评价',
                7:'已完成',
                8:'售后退货中',
                9:'售后换货中',
                10:'售后维修中',
                11:'售后完成',
            }[val]
    }
    
    let area = (val) => {
        val = JSON.parse(val)
        let str = ''
        for (let i in val) {
            if (val[i] != null) {
                str += val[i].value
            }
        }
        return str
    }

    let orderstate = val=>{
      return {
          0:'普通商品订单',
          1: '维修订单'
      }[val]
    }
    let sku=(val)=> {
        val = val.replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
        return val
    }
    export default{
        account,
        date,
        datewithtime,
        state,
        orderstate,
        area,
        sku
    }