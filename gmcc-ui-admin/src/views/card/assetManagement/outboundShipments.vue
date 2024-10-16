<template>
  <echartsIndex />
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
      <el-form-item label="订单编号" prop="orderNumber">
        <el-input v-model="queryParams.orderNumber" placeholder="请输入订单编号" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>
      <el-form-item label="订单名称" prop="orderName">
        <el-input v-model="queryParams.orderName" placeholder="请输入订单名称" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery" type="primary">
          <Icon icon="ep:search" class="mr-5px" /> 查询
        </el-button>
        
        <el-button @click="handleStorage" >
          <Icon icon="ep:sold-out" class="mr-5px" /> 出库
        </el-button>
        <!-- <el-button @click="resetQuery">
          <Icon icon="ep:refresh" class="mr-5px" /> 重置
        </el-button> -->
        <!-- <el-button type="primary" plain @click="openForm('create')">
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button> -->
        <el-button type="success" plain @click="handleExport" :loading="exportLoading">
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="订单id" align="center" prop="id" width="100px" />
      <el-table-column label="订单号" align="center" prop="orderNumber" width="100px" />
      <el-table-column label="订单状态" align="center" prop="orderState" width="100px" />
      <el-table-column label="订单名称" align="center" prop="orderName" width="100px"/>
      <el-table-column label="订单备注" align="center" prop="orderDescr" width="100px"/>
      <el-table-column label="订单时间" align="center" prop="orderTime" :formatter="dateFormatter" width="120px" />
      <el-table-column label="导入对象" align="center" prop="importObject" width="100px"/>
      <el-table-column label="运营商接入点" align="center" prop="accessPoint" width="120px"/>
      <el-table-column label="运营商" align="center" prop="operator" width="100px"/>
      <el-table-column label="主体套餐" align="center" prop="mainPackage" width="100px"/>
      <el-table-column label="资费组" align="center" prop="tariffGroup" width="100px"/>
      <el-table-column label="开卡折扣" align="center" prop="discount" width="100px"/>
      <el-table-column label="是否加入流量池" align="center" prop="flowPool" width="140px"/>
      <el-table-column label="是否开通扩容包" align="center" prop="extensionPack" width="140px"/>
      <el-table-column label="卡体类型" align="center" prop="cardType" width="100px"/>
      <el-table-column label="号码类型" align="center" prop="numberType" width="100px"/>
      <el-table-column label="是否超流量停" align="center" prop="overStop" width="120px"/>
      <el-table-column label="测试期时间" align="center" prop="testTime" :formatter="dateFormatter" width="120px" />
      <el-table-column label="是否机卡绑定" align="center" prop="cardBinding" width="120px"/>
      <el-table-column label="附件图片" align="center" prop="accessory" width="100px"/>
      <el-table-column label="操作用户" align="center" prop="operationUser" width="100px"/>
      <el-table-column label="复核用户" align="center" prop="examineUser" width="100px"/>
      <el-table-column label="订单结果" align="center" prop="orderResult" width="100px"/>
      <el-table-column label="创建时间" align="center" prop="createTime" :formatter="dateFormatter" width="120px" />
      <el-table-column label="结算类型" align="center" prop="settlementType" width="100px"/>
      <el-table-column label="订单金额" align="center" prop="orderAmount" width="100px"/>
      <el-table-column label="操作" align="center" width="100px">
        <template #default="scope">
          <el-button link type="primary" @click="openForm('update', scope.row.id)">
            编辑
          </el-button>
          <el-button link type="danger" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 分页组件，total为总条数，v-model:page为当前页数，v-model:limit为每页条数，@pagination为分页事件，getList为分页事件触发的方法 -->
    <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" /> 
   </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <!-- <CardJoinOrderForm ref="formRef" @success="getList" /> -->
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { CardJoinOrderApi, CardJoinOrderVO } from '@/api/card/cardjoinorder'
import {useRouter} from 'vue-router'
import echartsIndex from '@/views/card/components/Index2.vue';
// import CardJoinOrderForm from './components/CardJoinOrderForm.vue'

/** 卡订购入库订单详情 列表 */
defineOptions({ name: 'CardJoinOrder' })
const router = useRouter()
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<CardJoinOrderVO[]>([]) // 列表的数据
const total = ref(1) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  orderNumber: undefined,
  orderState: undefined,
  orderName: undefined,
  orderDescr: undefined,
  orderTime: [],
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
  testTime: [],
  cardBinding: undefined,
  accessory: undefined,
  operationUser: undefined,
  examineUser: undefined,
  orderResult: undefined,
  createTime: [],
  settlementType: undefined,
  orderAmount: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await CardJoinOrderApi.getCardJoinOrderPage(queryParams)
    console.log(data.list);
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

//入库按钮
const handleStorage = () =>{
  router.push({
    path: './cardInStorage'
  })
}

/** 重置按钮操作 */
// const resetQuery = () => {
//   queryFormRef.value.resetFields()
//   handleQuery()
// }

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
    await CardJoinOrderApi.deleteCardJoinOrder(id)
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
    const data = await CardJoinOrderApi.exportCardJoinOrder(queryParams)
    download.excel(data, '卡订购入库订单详情.xls')
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
