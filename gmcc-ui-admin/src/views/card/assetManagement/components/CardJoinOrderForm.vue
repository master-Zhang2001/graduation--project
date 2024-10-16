<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" v-loading="formLoading">
      <el-form-item label="订单号" prop="orderNumber">
        <el-input v-model="formData.orderNumber" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="订单状态(0-正在进行，1-已完结)" prop="orderState">
        <el-input v-model="formData.orderState" placeholder="请输入订单状态(0-正在进行，1-已完结)" />
      </el-form-item>
      <el-form-item label="订单名称" prop="orderName">
        <el-input v-model="formData.orderName" placeholder="请输入订单名称" />
      </el-form-item>
      <el-form-item label="订单备注" prop="orderDescr">
        <el-input v-model="formData.orderDescr" placeholder="请输入订单备注" />
      </el-form-item>
      <el-form-item label="订单时间" prop="orderTime">
        <el-date-picker v-model="formData.orderTime" type="date" value-format="x" placeholder="选择订单时间" />
      </el-form-item>
      <el-form-item label="导入对象" prop="importObject">
        <el-input v-model="formData.importObject" placeholder="请输入导入对象" />
      </el-form-item>
      <el-form-item label="运营商接入点" prop="accessPoint">
        <el-input v-model="formData.accessPoint" placeholder="请输入运营商接入点" />
      </el-form-item>
      <el-form-item label="运营商" prop="operator">
        <el-input v-model="formData.operator" placeholder="请输入运营商" />
      </el-form-item>
      <el-form-item label="主体套餐" prop="mainPackage">
        <el-input v-model="formData.mainPackage" placeholder="请输入主体套餐" />
      </el-form-item>
      <el-form-item label="资费组" prop="tariffGroup">
        <el-input v-model="formData.tariffGroup" placeholder="请输入资费组" />
      </el-form-item>
      <el-form-item label="开卡折扣" prop="discount">
        <el-input v-model="formData.discount" placeholder="请输入开卡折扣" />
      </el-form-item>
      <el-form-item label="是否加入流量池" prop="flowPool">
        <el-radio-group v-model="formData.flowPool">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否开通扩容包" prop="extensionPack">
        <el-radio-group v-model="formData.extensionPack">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="卡体类型" prop="cardType">
        <el-select v-model="formData.cardType" placeholder="请选择卡体类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="号码类型" prop="numberType">
        <el-select v-model="formData.numberType" placeholder="请选择号码类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否超流量停" prop="overStop">
        <el-radio-group v-model="formData.overStop">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="测试期时间" prop="testTime">
        <el-date-picker v-model="formData.testTime" type="date" value-format="x" placeholder="选择测试期时间" />
      </el-form-item>
      <el-form-item label="是否机卡绑定" prop="cardBinding">
        <el-radio-group v-model="formData.cardBinding">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="附件图片" prop="accessory">
        <UploadImg v-model="formData.accessory" />
      </el-form-item>
      <el-form-item label="操作用户" prop="operationUser">
        <el-input v-model="formData.operationUser" placeholder="请输入操作用户" />
      </el-form-item>
      <el-form-item label="复核用户" prop="examineUser">
        <el-input v-model="formData.examineUser" placeholder="请输入复核用户" />
      </el-form-item>
      <el-form-item label="订单结果" prop="orderResult">
        <el-input v-model="formData.orderResult" placeholder="请输入订单结果" />
      </el-form-item>
      <el-form-item label="结算类型" prop="settlementType">
        <el-select v-model="formData.settlementType" placeholder="请选择结算类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单金额" prop="orderAmount">
        <el-input v-model="formData.orderAmount" placeholder="请输入订单金额" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { CardJoinOrderApi, CardJoinOrderVO } from '@/api/card/cardjoinorder'

/** 卡订购入库订单详情 表单 */
defineOptions({ name: 'CardJoinOrderForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  orderNumber: undefined,
  orderState: undefined,
  orderName: undefined,
  orderDescr: undefined,
  orderTime: undefined,
  importObject: undefined,
  accessPoint: undefined,
  operator: undefined,
  mainPackage: undefined,
  tariffGroup: undefined,
  discount: undefined,
  flowPool: undefined,
  extensionPack: undefined,
  cardType: undefined,
  numberType: undefined,
  overStop: undefined,
  testTime: undefined,
  cardBinding: undefined,
  accessory: undefined,
  operationUser: undefined,
  examineUser: undefined,
  orderResult: undefined,
  settlementType: undefined,
  orderAmount: undefined
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
      formData.value = await CardJoinOrderApi.getCardJoinOrder(id)
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
    const data = formData.value as unknown as CardJoinOrderVO
    // 如果表单类型为创建
    if (formType.value === 'create') {
      // 调用创建卡牌加入订单的接口
      await CardJoinOrderApi.createCardJoinOrder(data)
      // 弹出创建成功的提示
      message.success(t('common.createSuccess'))
    } else {
      // 调用更新卡牌加入订单的接口
      await CardJoinOrderApi.updateCardJoinOrder(data)
      // 弹出更新成功的提示
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
    orderNumber: undefined,
    orderState: undefined,
    orderName: undefined,
    orderDescr: undefined,
    orderTime: undefined,
    importObject: undefined,
    accessPoint: undefined,
    operator: undefined,
    mainPackage: undefined,
    tariffGroup: undefined,
    discount: undefined,
    flowPool: undefined,
    extensionPack: undefined,
    cardType: undefined,
    numberType: undefined,
    overStop: undefined,
    testTime: undefined,
    cardBinding: undefined,
    accessory: undefined,
    operationUser: undefined,
    examineUser: undefined,
    orderResult: undefined,
    settlementType: undefined,
    orderAmount: undefined
  }
  formRef.value?.resetFields()
}
</script>