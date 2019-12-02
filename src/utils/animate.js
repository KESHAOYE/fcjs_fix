/**
 * 动画类
 * 用于封装所有常用动画
 */
export default class animate {
    /**
     * 用于显示加载动画
     * 参数:要拼接的dom对象
     * 作者:KESHAOYE
     * 时间:2019-08-13
     */
    static loading(classname) {
            let a = document.getElementsByClassName("loadinganimate")[0]
            if (a != undefined) {
                a.remove();
            }
            let cdiv = document.createElement('div');
            cdiv.className = "loadinganimate";
            document.getElementsByClassName(classname)[0].appendChild(cdiv);
        }
        /**
         * 停止加载动画
         */
    static stoploading() {
        let a = document.getElementsByClassName("loadinganimate")[0]
        if (a != undefined) {
            a.remove();
        }
    }
}