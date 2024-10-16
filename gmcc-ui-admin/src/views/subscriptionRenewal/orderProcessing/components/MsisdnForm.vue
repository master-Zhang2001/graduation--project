<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="订单创建时间" prop="createTime">
        <el-date-picker
          v-model="formData.createTime"
          type="date"
          value-format="x"
          placeholder="选择订单创建时间"
        />
      </el-form-item>
      <el-form-item label="续费月数" prop="renewMonths">
        <el-input v-model="formData.renewMonths" placeholder="请输入续费月数" />
      </el-form-item>
      <el-form-item label="用户的msisdn号码" prop="msisdnNumber">
        <el-input v-model="formData.msisdnNumber" placeholder="请输入用户的msisdn号码" />
      </el-form-item>
      <el-form-item label="套餐名字" prop="woodName">
        <el-input v-model="formData.woodName" placeholder="请输入套餐名字" />
      </el-form-item>
      <el-form-item label="当前剩余月数" prop="nowMonths">
        <el-input v-model="formData.nowMonths" placeholder="请输入当前剩余月数" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { MsisdnApi, MsisdnVO } from '@/api/subscriptionRenewal/msisdn'

/** msisdn号码续费 表单 */
defineOptions({ name: 'MsisdnForm' })

// 使用useI18n函数获取t函数
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  createTime: undefined,
  renewMonths: undefined,
  msisdnNumber: undefined,
  woodName: undefined,
  nowMonths: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  createTime: [{ required: true, message: '订单创建时间不能为空', trigger: 'blur' }],
  renewMonths: [{ required: true, message: '续费月数不能为空', trigger: 'blur' }],
  msisdnNumber: [{ required: true, message: '用户的msisdn号码不能为空', trigger: 'blur' }],
  woodName: [{ required: true, message: '套餐名字不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await MsisdnApi.getMsisdn(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as MsisdnVO
    if (formType.value === 'create') {
      await MsisdnApi.createMsisdn(data)
      message.success(t('common.createSuccess'))
    } else {
      await MsisdnApi.updateMsisdn(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    createTime: undefined,
    renewMonths: undefined,
    msisdnNumber: undefined,
    woodName: undefined,
    nowMonths: undefined
  }
  formRef.value?.resetFields()
}
</script>