<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="号码" prop="iccid">
        <el-input v-model="formData.iccid" placeholder="请输入号码" />
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="formData.customerName" placeholder="请输入客户名称" />
      </el-form-item>
      <el-form-item label="设备特征码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入设备特征码" />
      </el-form-item>
      <el-form-item label="设备名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入设备名" />
      </el-form-item>
      <el-form-item label="设备型号" prop="model">
        <el-input v-model="formData.model" placeholder="请输入设备型号" />
      </el-form-item>
      <el-form-item label="设备类型" prop="type">
        <el-input v-model="formData.type" placeholder="请输入设备类型" />
      </el-form-item>
      <el-form-item label="终端IMEI号" prop="imei">
        <el-input v-model="formData.imei" placeholder="请输入终端IMEI号" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="formData.remarks" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="设备管理员" prop="manager">
        <el-input v-model="formData.manager" placeholder="请输入设备管理员" />
      </el-form-item>
      <el-form-item label="设备管理员电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入设备管理员电话" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DeviceApi, DeviceVO } from '@/api/device/deviceManagement'

/** 设备 表单 */
defineOptions({ name: 'DeviceForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  iccid: undefined,
  customerName: undefined,
  code: undefined,
  name: undefined,
  model: undefined,
  type: undefined,
  imei: undefined,
  remarks: undefined,
  manager: undefined,
  phone: undefined,
})
const formRules = reactive({
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
      formData.value = await DeviceApi.getDevice(id)
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
    const data = formData.value as unknown as DeviceVO
    if (formType.value === 'create') {
      await DeviceApi.createDevice(data)
      message.success(t('common.createSuccess'))
    } else {
      await DeviceApi.updateDevice(data)
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
    iccid: undefined,
    customerName: undefined,
    code: undefined,
    name: undefined,
    model: undefined,
    type: undefined,
    imei: undefined,
    remarks: undefined,
    manager: undefined,
    phone: undefined,
  }
  formRef.value?.resetFields()
}
</script>