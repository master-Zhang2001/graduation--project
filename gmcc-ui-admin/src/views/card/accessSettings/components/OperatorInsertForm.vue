<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="运营商客户编码" prop="number">
        <el-input v-model="formData.number" placeholder="请输入运营商客户编码" />
      </el-form-item>
      <el-form-item label="接入名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入接入名称" />
      </el-form-item>
      <el-form-item label="运营商类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择运营商类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="运营商接入地" prop="place">
        <el-input v-model="formData.place" placeholder="请输入运营商接入地" />
      </el-form-item>
      <el-form-item label="运营商批量接口访问间隔(毫秒)" prop="interval">
        <el-input v-model="formData.interval" placeholder="请输入运营商批量接口访问间隔(毫秒)" />
      </el-form-item>
      <el-form-item label="套餐折扣" prop="packageDiscount">
        <el-input v-model="formData.packageDiscount" placeholder="请输入套餐折扣" />
      </el-form-item>
      <el-form-item label="短信折扣" prop="noteDiscount">
        <el-input v-model="formData.noteDiscount" placeholder="请输入短信折扣" />
      </el-form-item>
      <el-form-item label="语音折扣" prop="voiceDiscount">
        <el-input v-model="formData.voiceDiscount" placeholder="请输入语音折扣" />
      </el-form-item>
      <el-form-item label="超流量折扣" prop="flowDiscount">
        <el-input v-model="formData.flowDiscount" placeholder="请输入超流量折扣" />
      </el-form-item>
      <el-form-item label="扩容包折扣" prop="dilatationDiscount">
        <el-input v-model="formData.dilatationDiscount" placeholder="请输入扩容包折扣" />
      </el-form-item>
      <el-form-item label="超流量池折扣" prop="flowPoolDiscount">
        <el-input v-model="formData.flowPoolDiscount" placeholder="请输入超流量池折扣" />
      </el-form-item>
      <el-form-item label="运营商接口状态（1-正在使用，0-停用）" prop="operatorState">
        <el-input v-model="formData.operatorState" placeholder="请输入运营商接口状态（1-正在使用，0-停用）" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OperatorInsertApi, OperatorInsertVO } from '@/api/card/accessSettings/operatorinsert'

/** 运营商接入配置 表单 */
defineOptions({ name: 'OperatorInsertForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  number: undefined,
  name: undefined,
  type: undefined,
  place: undefined,
  interval: undefined,
  packageDiscount: undefined,
  noteDiscount: undefined,
  voiceDiscount: undefined,
  flowDiscount: undefined,
  dilatationDiscount: undefined,
  flowPoolDiscount: undefined,
  operatorState: undefined
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
      formData.value = await OperatorInsertApi.getOperatorInsert(id)
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
    const data = formData.value as unknown as OperatorInsertVO
    if (formType.value === 'create') {
      await OperatorInsertApi.createOperatorInsert(data)
      message.success(t('common.createSuccess'))
    } else {
      await OperatorInsertApi.updateOperatorInsert(data)
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
    number: undefined,
    name: undefined,
    type: undefined,
    place: undefined,
    interval: undefined,
    packageDiscount: undefined,
    noteDiscount: undefined,
    voiceDiscount: undefined,
    flowDiscount: undefined,
    dilatationDiscount: undefined,
    flowPoolDiscount: undefined,
    operatorState: undefined
  }
  formRef.value?.resetFields()
}
</script>