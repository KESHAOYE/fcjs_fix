<template>
  <div id="app">
    <keep-alive>
      <router-view>
    </router-view>
    </keep-alive>
  </div>
</template>
<script>
import headers from './components/header.vue'
export default {
  data(){
    return{

    }
  },
  components:{
    headers
  },
  mounted(){
    //console.log("%c DESIGN BY KESHAOYE","font-size:17px;")
  }
}
</script>
<style lang="scss">
*,body{
  margin :0;
  padding :0;
}
img{border:0} 
body{
    overflow-x: hidden;
    background: #f4f4f4;
}
a{
  text-decoration: none;
  color: inherit;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  z-index: 2;
}
.content{
  width: 1280px;
  height: 100%;
  margin:auto;
}
@font-face {
  font-family: 'iconfont';  /* project id 1334874 */
  src: url('//at.alicdn.com/t/font_1334874_9ftffhld7q.eot');
  src: url('//at.alicdn.com/t/font_1334874_9ftffhld7q.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1334874_9ftffhld7q.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1334874_9ftffhld7q.woff') format('woff'),
  url('//at.alicdn.com/t/font_1334874_9ftffhld7q.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1334874_9ftffhld7q.svg#iconfont') format('svg');
}
i{
  font-family: iconfont !important;
  font-style: normal;
}
</style>
