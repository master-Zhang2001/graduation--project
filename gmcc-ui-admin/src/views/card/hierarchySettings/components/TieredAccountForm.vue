<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="父级名称" prop="parentName">
        <el-input v-model="formData.parentName" placeholder="请输入父级名称" />
      </el-form-item>
      <el-form-item label="公司全称" prop="companyName">
        <el-input v-model="formData.companyName" placeholder="请输入公司全称" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="relationName">
        <el-input v-model="formData.relationName" placeholder="请输入联系人姓名" />
      </el-form-item>
      <el-form-item label="联系人手机号" prop="relationMobile">
        <el-input v-model="formData.relationMobile" placeholder="请输入联系人手机号" />
      </el-form-item>
      <el-form-item label="跟进人" prop="followUpName">
        <el-input v-model="formData.followUpName" placeholder="请输入跟进人" />
      </el-form-item>
      <el-form-item label="代付关系（1-是，0-否）" prop="replaces">
        <el-radio-group v-model="formData.replaces">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="流量套餐折扣" prop="flowDiscount">
        <el-input v-model="formData.flowDiscount" placeholder="请输入流量套餐折扣" />
      </el-form-item>
      <el-form-item label="语音套餐折扣" prop="voiceDiscount">
        <el-input v-model="formData.voiceDiscount" placeholder="请输入语音套餐折扣" />
      </el-form-item>
      <el-form-item label="短信套餐折扣" prop="noteDiscount">
        <el-input v-model="formData.noteDiscount" placeholder="请输入短信套餐折扣" />
      </el-form-item>
      <el-form-item label="扩容包套餐折扣" prop="packageDiscount">
        <el-input v-model="formData.packageDiscount" placeholder="请输入扩容包套餐折扣" />
      </el-form-item>
      <el-form-item label="超流量原价(元/Mb)" prop="excessFlow">
        <el-input v-model="formData.excessFlow" placeholder="请输入超流量原价(元/Mb)" />
      </el-form-item>
      <el-form-item label="超流量享有多少折扣" prop="excessFlowDiscount">
        <el-input v-model="formData.excessFlowDiscount" placeholder="请输入超流量享有多少折扣" />
      </el-form-item>
      <el-form-item label="超短信原价（元/条）" prop="excessNote">
        <el-input v-model="formData.excessNote" placeholder="请输入超短信原价（元/条）" />
      </el-form-item>
      <el-form-item label="超短信折扣" prop="excessNoteDiscount">
        <el-input v-model="formData.excessNoteDiscount" placeholder="请输入超短信折扣" />
      </el-form-item>
      <el-form-item label="超流量池折扣" prop="excessPoolDiscount">
        <el-input v-model="formData.excessPoolDiscount" placeholder="请输入超流量池折扣" />
      </el-form-item>
      <el-form-item label="超语音折扣" prop="excessVoiceDiscount">
        <el-input v-model="formData.excessVoiceDiscount" placeholder="请输入超语音折扣" />
      </el-form-item>
      <el-form-item label="超流量池（元/Mb）" prop="excessPool">
        <el-input v-model="formData.excessPool" placeholder="请输入超流量池（元/Mb）" />
      </el-form-item>
      <el-form-item label="登录用户名" prop="loginName">
        <el-input v-model="formData.loginName" placeholder="请输入登录用户名" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="adminPassword">
        <el-input v-model="formData.adminPassword" placeholder="请输入管理员密码" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="formData.email" placeholder="请输入Email" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="角色id" prop="roleId">
        <el-input v-model="formData.roleId" placeholder="请输入角色id" />
      </el-form-item>
      <el-form-item label="超语音(元/分钟)" prop="excessVoice">
        <el-input v-model="formData.excessVoice" placeholder="请输入超语音(元/分钟)" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { TieredAccountApi, TieredAccountVO } from '@/api/card/level'

/** 分级账号 表单 */
defineOptions({ name: 'TieredAccountForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  parentName: undefined,
  companyName: undefined,
  relationName: undefined,
  relationMobile: undefined,
  followUpName: undefined,
  replaces: undefined,
  flowDiscount: undefined,
  voiceDiscount: undefined,
  noteDiscount: undefined,
  packageDiscount: undefined,
  excessFlow: undefined,
  excessFlowDiscount: undefined,
  excessNote: undefined,
  excessNoteDiscount: undefined,
  excessPoolDiscount: undefined,
  excessVoiceDiscount: undefined,
  excessPool: undefined,
  loginName: undefined,
  adminPassword: undefined,
  email: undefined,
  nickname: undefined,
  roleId: undefined,
  excessVoice: undefined
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
      formData.value = await TieredAccountApi.getTieredAccount(id)
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
    const data = formData.value as unknown as TieredAccountVO
    if (formType.value === 'create') {
      await TieredAccountApi.createTieredAccount(data)
      message.success(t('common.createSuccess'))
    } else {
      await TieredAccountApi.updateTieredAccount(data)
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
    parentName: undefined,
    companyName: undefined,
    relationName: undefined,
    relationMobile: undefined,
    followUpName: undefined,
    replaces: undefined,
    flowDiscount: undefined,
    voiceDiscount: undefined,
    noteDiscount: undefined,
    packageDiscount: undefined,
    excessFlow: undefined,
    excessFlowDiscount: undefined,
    excessNote: undefined,
    excessNoteDiscount: undefined,
    excessPoolDiscount: undefined,
    excessVoiceDiscount: undefined,
    excessPool: undefined,
    loginName: undefined,
    adminPassword: undefined,
    email: undefined,
    nickname: undefined,
    roleId: undefined,
    excessVoice: undefined
  }
  formRef.value?.resetFields()
}
</script>