<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
      <el-form-item label="分级账号id" prop="id" label-width="120px">
        <el-input v-model="queryParams.id" placeholder="请输入分级账号id" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon icon="ep:search" class="mr-5px" /> 搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon icon="ep:refresh" class="mr-5px" /> 重置
        </el-button>
        <el-button type="primary" plain @click="openForm('create')">
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button type="success" plain @click="handleExport" :loading="exportLoading"
          v-hasPermi="['manage:tiered-account:export']">
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="分级账号id" align="center" prop="id" width="120px" />
      <el-table-column label="父级名称" align="center" prop="parentName" width="120px" />
      <el-table-column label="公司全称" align="center" prop="companyName" width="120px" />
      <el-table-column label="联系人姓名" align="center" prop="relationName" width="120px" />
      <el-table-column label="联系人手机号" align="center" prop="relationMobile" width="120px" />
      <el-table-column label="跟进人" align="center" prop="followUpName" width="120px" />
      <el-table-column label="代付关系" align="center" prop="replaces" width="120px" />
      <el-table-column label="流量套餐折扣" align="center" prop="flowDiscount" width="120px" />
      <el-table-column label="语音套餐折扣" align="center" prop="voiceDiscount" width="120px" />
      <el-table-column label="短信套餐折扣" align="center" prop="noteDiscount" width="120px" />
      <el-table-column label="扩容包套餐折扣" align="center" prop="packageDiscount" width="140px" />
      <el-table-column label="超流量原价(元/Mb)" align="center" prop="excessFlow" width="180px" />
      <el-table-column label="超流量享有多少折扣" align="center" prop="excessFlowDiscount" width="180px" />
      <el-table-column label="超短信原价（元/条）" align="center" prop="excessNote" width="180px" />
      <el-table-column label="超短信折扣" align="center" prop="excessNoteDiscount" width="120px" />
      <el-table-column label="超流量池折扣" align="center" prop="excessPoolDiscount" width="120px" />
      <el-table-column label="超语音折扣" align="center" prop="excessVoiceDiscount" width="120px" />
      <el-table-column label="超流量池（元/Mb）" align="center" prop="excessPool" width="180px" />
      <el-table-column label="登录用户名" align="center" prop="loginName" width="120px" />
      <el-table-column label="管理员密码" align="center" prop="adminPassword" width="120px" />
      <el-table-column label="Email" align="center" prop="email" width="120px" />
      <el-table-column label="昵称" align="center" prop="nickname" width="120px" />
      <el-table-column label="角色id" align="center" prop="roleId" width="120px" />
      <el-table-column label="创建时间" align="center" prop="createTime" :formatter="dateFormatter" width="180px" />
      <el-table-column label="超语音(元/分钟)" align="center" prop="excessVoice" width="180px"/>
      <el-table-column label="操作" align="center" width="120px">
        <template #default="scope">
          <el-button link type="primary" @click="openForm('update', scope.row.id)"
            v-hasPermi="['manage:tiered-account:update']">
            编辑
          </el-button>
          <el-button link type="danger" @click="handleDelete(scope.row.id)"
            v-hasPermi="['manage:tiered-account:delete']">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
      @pagination="getList" />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <TieredAccountForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { TieredAccountApi, TieredAccountVO } from '@/api/card/level'
import TieredAccountForm from './components/TieredAccountForm.vue'

/** 分级账号 列表 */
defineOptions({ name: 'TieredAccount' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<TieredAccountVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  createTime: [],
  excessVoice: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await TieredAccountApi.getTieredAccountPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await TieredAccountApi.deleteTieredAccount(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch { }
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await TieredAccountApi.exportTieredAccount(queryParams)
    download.excel(data, '分级账号.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>