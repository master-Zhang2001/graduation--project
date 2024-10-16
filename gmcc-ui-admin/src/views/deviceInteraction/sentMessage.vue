<template>
  <el-form ref="form" label-width="330px" :inline="false" size="default">
    <el-form-item label="msisdn号码" prop="phoneNumber" >
      <el-input v-model="formData.phoneNumber" style="width:600px" placeholder="请输入msisdn号码..." />
    </el-form-item>
    <el-form-item prop="messgae" label="短信内容" >
      <el-input :rows="7" type="textarea" v-model="formData.message" style="width:600px" placeholder="请输入短信内容"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-model="formData.sure">
        提交
      </el-button>
    </el-form-item>
  </el-form>
  
</template>

<script lang="ts" setup>
const form = ref(null)
const formData = ref({
  phoneNumber:undefined,
  message:undefined,
  sure:undefined,
  default:undefined
})
</script>