/**
 * 用于构造虚拟代理，以方便图片的加载,创建图片对象
 * 作者:KESHAOYE
 * 时间:2019-08-14
 */
export default class virtual {
    //创建一个加载模块 
    static init(parentNode, i) {
            let img = new Image();
            let arr = Array.from(parentNode)
            let cdiv = document.createElement('div');
            cdiv.className = "commend_bottom";
            arr[i].appendChild(img);
            arr[i].appendChild(cdiv);
            return {
                set(src, content) {
                    img.src = src;
                    cdiv.innerHTML = `<span>${content}</span>`
                    cdiv.style.background = "none";
                }
            }
        }
    //创建虚拟代理模块
    static proxy(init) {
        let pimg = new Image;
        let pcdiv = document.createElement('div');
        pcdiv.className = "commend_bottom";
        pimg.onload = () => {
            init.set(this.src, this.content)
        }
        return function(src) {
            pimg.src = src;
            pcdiv.innerHTML = ""
        }
    }
}