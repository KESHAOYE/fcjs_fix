<template>
    <div class="shoplist">
      <personbar/>
      <headers/>
      <div class="content">
          <div class="list_sort">
            
          </div>
           <div class="result">
                 <div class="resultitem" value="0001" @click="todetail">
                     <div class="isold smallold">
                     </div>
                   <div class="resultimg">
                       <img src="../../assets/phone/iphone5s.png" alt="" srcset="">
                   </div>
                   <span class="resultprice">5000</span>
                   <span class="resultname">Apple iPhone XR (A2108) 128GB 红色 移动联通电信4G手机 双卡双待</span>       
                 </div>
                 </div>
            </div>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .shoplist{
        .list_sort{
            width:100%;
            
        }
        .result{
            margin-top:30px;
        }
    }
</style>