<template>
  <ContentWrap class="mb-0 pb-0">
    <div>
      <span class="ml-5 cursor-pointer" @click="pageChange1">
        销售订单
      </span>
      <span class="ml-16 cursor-pointer" @click="pageChange2">
        采购订单
      </span>
    </div>
  </ContentWrap>
  <div class="flex">
      <el-progress :percentage="100" style="width: 140px;" :show-text="false" :stroke-width="1" v-if="page1" />
      <el-progress :percentage="100" style="width: 140px;" color="#F5F7F9"  :show-text="false" :stroke-width="1" v-if="!page1" />
      <el-progress :percentage="100" style="width: 140px;" :show-text="false" :stroke-width="1" v-if="page2"/>
      <el-progress :percentage="100" style="width: 140px;" color="#F5F7F9" :show-text="false" :stroke-width="1" v-if="!page2" />
  </div>
  <Index v-if="page1" />
  <Index2 v-if="page2" />

</template>
<script setup lang="ts">
import Index from './components/Index.vue'
import Index2 from './components/Index2.vue'
const page1 = ref(true)
const page2 = ref(false)
const pageChange1 = () => {
  if(!page1.value){
    page1.value = true
    page2.value = false
  }
}
const pageChange2 = () => {
  if(!page2.value){
    page2.value = true
    page1.value = false
  }
}
</script>
<style scoped>
.mb-15px {
  margin-bottom: 0px;
}

.mt-8px {
  margin-top: 0px;
}
.test1{
  text-underline-offset: 6px;
}
</style>
