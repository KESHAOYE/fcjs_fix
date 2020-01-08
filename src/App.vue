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
    data() {
      return {

      }
    },
    components: {
      headers
    },
    mounted() {
      let data={adid: '3'}
      let query=`query{
        adinfos(adinfo:3){
          id
          adid
          adimg
          createTime
          startdue
        }
      }`
      //this.$http.post("/adapi",{
        //query:query,
        //variables:data
      //})
    }
  }
</script>
<style lang="scss">
  *,
  body {
    margin: 0;
    padding: 0;
    -webkit-user-select: none;
  }

  img {
    border: 0
  }
  .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
  .alipay {
    background: #00a0e9;
    border: 0;
  }

  .wechat {
    border: 0;
    background: #44b549;
  }

  .zsbank {
    border: 0;
    background: #b1120d;
  }

  .jsbank {
    border: 0;
    background: #0066b3;
  }

  .nybank {
    border: 0;
    background: #319c8b;
  }

  body {
    overflow-x: hidden;
    background: #f4f4f4;
  }

  a {
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

  .content {
    width: 1280px;
    height: 100%;
    margin: auto;
  }

  @font-face {
    font-family: 'iconfont';
    /* project id 1334874 */
    src: url('//at.alicdn.com/t/font_1334874_9ftffhld7q.eot');
    src: url('//at.alicdn.com/t/font_1334874_9ftffhld7q.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_1334874_9ftffhld7q.woff2') format('woff2'),
      url('//at.alicdn.com/t/font_1334874_9ftffhld7q.woff') format('woff'),
      url('//at.alicdn.com/t/font_1334874_9ftffhld7q.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_1334874_9ftffhld7q.svg#iconfont') format('svg');
  }

  i {
    font-family: iconfont !important;
    font-style: normal;
  }

</style>