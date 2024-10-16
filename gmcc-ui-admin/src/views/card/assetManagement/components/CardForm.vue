<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="服务号码" prop="serviceNumber">
        <el-input v-model="formData.serviceNumber" placeholder="请输入服务号码" />
      </el-form-item>
      <el-form-item label="ICCID" prop="iccid">
        <el-input v-model="formData.iccid" placeholder="请输入ICCID" />
      </el-form-item>
      <el-form-item label="主商品名称" prop="commodityName">
        <el-input v-model="formData.commodityName" placeholder="请输入主商品名称" />
      </el-form-item>
      <el-form-item label="卡状态(0-激活、1-停机)" prop="cardStatus">
        <el-radio-group v-model="formData.cardStatus">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否加入群组" prop="joinGroup">
        <el-radio-group v-model="formData.joinGroup">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否管理停机" prop="manageStop">
        <el-radio-group v-model="formData.manageStop">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否实名" prop="isRealName">
        <el-radio-group v-model="formData.isRealName">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否异常（0-正常；1-异常）" prop="isAbnormal">
        <el-radio-group v-model="formData.isAbnormal">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运营商类型" prop="operatorType">
        <el-select v-model="formData.operatorType" placeholder="请选择运营商类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="卡体类型" prop="cardType">
        <el-select v-model="formData.cardType" placeholder="请选择卡体类型">
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
import { CardApi, CardVO } from '@/api/card/modifyDelete'

/** 网卡 表单 */
defineOptions({ name: 'CardForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  serviceNumber: undefined,
  iccid: undefined,
  commodityName: undefined,
  cardStatus: undefined,
  joinGroup: undefined,
  manageStop: undefined,
  isRealName: undefined,
  isAbnormal: undefined,
  operatorType: undefined,
  cardType: undefined
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
      formData.value = await CardApi.getCard(id)
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
    const data = formData.value as unknown as CardVO
    if (formType.value === 'create') {
      await CardApi.createCard(data)
      message.success(t('common.createSuccess'))
    } else {
      await CardApi.updateCard(data)
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
    serviceNumber: undefined,
    iccid: undefined,
    commodityName: undefined,
    cardStatus: undefined,
    joinGroup: undefined,
    manageStop: undefined,
    isRealName: undefined,
    isAbnormal: undefined,
    operatorType: undefined,
    cardType: undefined
  }
  formRef.value?.resetFields()
}
</script>