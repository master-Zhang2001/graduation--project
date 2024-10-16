<template>
  <ContentWrap>
    <div class="topStyle1">
      <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />
      <span class="spanStyle1 ml-4 mr-4" style="color: #E6A23C; white-space: nowrap;">导入号码</span>
      <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />

      <el-progress v-if="successNumber == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <span v-if="successNumber == 0" class="spanStyle1 ml-4 mr-4"
        style="color: #909399; white-space: nowrap;">选择产品</span>
      <el-progress v-if="successNumber == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <el-progress v-if="successNumber == 1" :percentage="100" style="width: 15%;" :show-text="false"
        :stroke-width="4" />
      <span v-if="successNumber == 1" class="spanStyle1 ml-4 mr-4"
        style="color: #409EFF; white-space: nowrap;">选择产品</span>
      <el-progress v-if="successNumber == 1" :percentage="100" style="width: 15%;" :show-text="false"
        :stroke-width="4" />

      <el-progress v-if="successNumber1 == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <span v-if="successNumber1 == 0" class="spanStyle1 ml-4 mr-4"
        style="color: #909399; white-space: nowrap;">确认订单</span>
      <el-progress v-if="successNumber1 == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <el-progress v-if="successNumber1 == 1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#57C23A" />
      <span v-if="successNumber1 == 1" class="spanStyle1 ml-4 mr-4"
        style="color: #57C23A; white-space: nowrap;">确认订单</span>
      <el-progress v-if="successNumber1 == 1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#57C23A" />
        
      <el-progress v-if="successNumber1 == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <span v-if="successNumber1 == 0" class="spanStyle1 ml-4 mr-4"
        style="color: #909399; white-space: nowrap;">提交订单</span>
      <el-progress v-if="successNumber1 == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <el-progress v-if="successNumber1 == 1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#57C23A" />
      <span v-if="successNumber1 == 1" class="spanStyle1 ml-4 mr-4"
        style="color: #57C23A; white-space: nowrap;">提交订单</span>
      <el-progress v-if="successNumber1 == 1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#57C23A" />  
    </div>
    <div v-if="successNumber == 0 && successNumber1 == 0" >
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px ml-16"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="号码" prop="msisdnNumber">
        <el-input
          v-model="queryParams.msisdnNumber"
          placeholder="请输入号码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <!-- <el-button
          type="primary"
          plain
          @click="openForm('create')"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button> -->
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
    <div class="bg-blue-100 pl-2 pr-2 pt-2 pb-2 ml-0 mt-6" style="border-radius: 5px;">
      <span class="tracking-wider" style="font-size: 14px;">注：导入excel文件，表头为'msisdn/ICCID'，内容为物联卡号码或ICCID号之一</span>
    </div>
    <!-- 列表 -->
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true" class="mt-6">
      <el-table-column label="msisdn码" align="center" prop="id" width="220px"/>
      <!-- <el-table-column label="号码" align="center" prop="msisdnNumber" />
      <el-table-column label="商品名字" align="center" prop="commodityName" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['order:traffic:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['order:traffic:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    </div>
  </ContentWrap>
  <div class="flex ml-auto mt-6" style="width:180px">
    <el-button size="default" type="default" style="width:80px" @click="handleLastSuccess">上一步</el-button>
    <el-button type="primary" size="default" @click="handleNextSuccess" style="width:80px">下一步</el-button>
  </div>
  <!-- 表单弹窗：添加/修改 -->
  <TrafficForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import download from '@/utils/download'
import { TrafficApi, TrafficVO } from '@/api/subscriptionRenewal/traffic'
import TrafficForm from './components/TrafficForm.vue'

/** 订单办理-流量叠加 列表 */
defineOptions({ name: 'Traffic' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<TrafficVO[]>([
  { id: 13176239843}
]) // 列表的数据
const total = ref(1) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  msisdnNumber: undefined,
  commodityName: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await TrafficApi.getTrafficPage(queryParams)
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
    await TrafficApi.deleteTraffic(id)
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
    const data = await TrafficApi.exportTraffic(queryParams)
    download.excel(data, '订单办理-流量叠加.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

//按钮跳转下一部分和上一部分
const successNumber = ref(0)
const successNumber1 = ref(0)
const handleNextSuccess = () => {
  // if(...条件){}
  if (successNumber.value == 0 && successNumber1.value == 0) {
    successNumber.value = 1
    return
  }
  if (successNumber.value == 1 && successNumber1.value == 0) {
    successNumber1.value = 1
    return
  }
  // if(...条件){}
}
const handleLastSuccess = () => {
  // if(...条件){}
  if (successNumber.value == 1 && successNumber1.value == 1) {
    successNumber1.value = 0
    return
  }
  if (successNumber.value == 1 && successNumber1.value == 0) {
    successNumber.value = 0
    return
  }
  // if(...条件){}
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
<style scoped>
.spanStyle1 {
  font-size: large;
  font-weight: 500;
}

.topStyle1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-bottom: 40px;
  margin-top: 10px;
}
</style>