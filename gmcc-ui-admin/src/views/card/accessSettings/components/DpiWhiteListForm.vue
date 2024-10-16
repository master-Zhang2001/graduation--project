<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="客户名称" prop="clientName">
        <el-input v-model="formData.clientName" placeholder="请输入客户名称" />
      </el-form-item>
      <el-form-item label="目标地址" prop="targetAddress">
        <el-input v-model="formData.targetAddress" placeholder="请输入目标地址" />
      </el-form-item>
      <el-form-item label="目标地址参数" prop="targetAddressParameter">
        <el-input v-model="formData.targetAddressParameter" placeholder="请输入目标地址参数" />
      </el-form-item>
      <el-form-item label="协议号" prop="agreementNumber">
        <el-input v-model="formData.agreementNumber" placeholder="请输入协议号" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DpiWhiteListApi, DpiWhiteListVO } from '@/api/card/accessSettings/dpiwhitelist'

/** DPI白名单配置 表单 */
defineOptions({ name: 'DpiWhiteListForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  clientName: undefined,
  targetAddress: undefined,
  targetAddressParameter: undefined,
  agreementNumber: undefined,
  type: undefined
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
      formData.value = await DpiWhiteListApi.getDpiWhiteList(id)
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
    const data = formData.value as unknown as DpiWhiteListVO
    if (formType.value === 'create') {
      await DpiWhiteListApi.createDpiWhiteList(data)
      message.success(t('common.createSuccess'))
    } else {
      await DpiWhiteListApi.updateDpiWhiteList(data)
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
    clientName: undefined,
    targetAddress: undefined,
    targetAddressParameter: undefined,
    agreementNumber: undefined,
    type: undefined
  }
  formRef.value?.resetFields()
}
</script>