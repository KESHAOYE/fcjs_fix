<template>
    <div class="scaleimg" ref="scaleimg">
        <div class="alert_close">
            <i @click="close">&#xe612;</i>
        </div>
    </div>
</template>

<script>
export default {
    name:"scaleimg",
    data(){
        return{

        }
    },
    methods:{
        init(){
            this.$refs.scaleimg.style.display="block"
            window.scrollTo(0,0)
            document.getElementsByTagName('body')[0].style.overflow='hidden';
        },
        close(){
            this.$refs.scaleimg.style.display="none";
            document.getElementsByTagName('body')[0].style.overflow='auto';
        }
    },
    mounted(){
        this.init();
    }
}
</script>

<style lang="scss">
    .scaleimg{
        width: 100%;
        height: 100%;
        background: rgba($color: #d2d2d2, $alpha: 0.6);
        z-index: 999;
        position: absolute;
        top: 0;
        overflow: hidden;
    }
    .alert_close {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding-right: 100px;
            text-align: right;
            position: relative;
            top: 20px;

            i {
                font-size: 2em;
                cursor: pointer;
            }
        }
</style>