<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="运营商客户编码" prop="number" label-width="200px">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入运营商客户编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery" type="primary"><Icon icon="ep:search" class="mr-5px" /> 查询</el-button>
        <!-- <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button> -->
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="id" align="center" prop="id" width="100px"/>
      <el-table-column label="运营商客户编码" align="center" prop="number" width="140px"/>
      <el-table-column label="接入名称" align="center" prop="name" width="100px"/>
      <el-table-column label="运营商类型" align="center" prop="type" width="100px"/>
      <el-table-column label="运营商接入地" align="center" prop="place" width="140px"/>
      <el-table-column label="运营商批量接口访问间隔(毫秒)" align="center" prop="interval" width="220px"/>
      <el-table-column label="套餐折扣" align="center" prop="packageDiscount" width="100px"/>
      <el-table-column label="短信折扣" align="center" prop="noteDiscount" width="100px"/>
      <el-table-column label="语音折扣" align="center" prop="voiceDiscount" width="100px"/>
      <el-table-column label="超流量折扣" align="center" prop="flowDiscount" width="100px"/>
      <el-table-column label="扩容包折扣" align="center" prop="dilatationDiscount" width="100px"/>
      <el-table-column label="超流量池折扣" align="center" prop="flowPoolDiscount" width="140px"/>
      <el-table-column label="运营商接口状态" align="center" prop="operatorState" width="140px"/>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="120px"
      />
      <el-table-column label="操作" align="center" width="100px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <OperatorInsertForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { OperatorInsertApi, OperatorInsertVO } from '@/api/card/accessSettings/operatorinsert'
import OperatorInsertForm from './components/OperatorInsertForm.vue'

/** 运营商接入配置 列表 */
defineOptions({ name: 'OperatorInsert' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<OperatorInsertVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  operatorState: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await OperatorInsertApi.getOperatorInsertPage(queryParams)
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
    await OperatorInsertApi.deleteOperatorInsert(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await OperatorInsertApi.exportOperatorInsert(queryParams)
    download.excel(data, '运营商接入配置.xls')
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