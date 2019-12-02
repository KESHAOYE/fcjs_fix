
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

    export default{
        account
    }