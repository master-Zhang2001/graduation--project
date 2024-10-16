<template>

  <!-- 搜索工作栏 -->
  <ContentWrap>
    <div class="topStyle1">
      <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />
      <span class="spanStyle1 ml-4 mr-4" style="color: #E6A23C; white-space: nowrap;">导入号码</span>
      <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />

      <el-progress v-if="successNumber == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <span v-if="successNumber == 0" class="spanStyle1 ml-4 mr-4"
        style="color: #909399; white-space: nowrap;">确认订单</span>
      <el-progress v-if="successNumber == 0" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
        color="#909399" />
      <el-progress v-if="successNumber == 1" :percentage="100" style="width: 15%;" :show-text="false"
        :stroke-width="4" />
      <span v-if="successNumber == 1" class="spanStyle1 ml-4 mr-4"
        style="color: #409EFF; white-space: nowrap;">确认订单</span>
      <el-progress v-if="successNumber == 1" :percentage="100" style="width: 15%;" :show-text="false"
        :stroke-width="4" />

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

    <div v-if="successNumber == 0 && successNumber1 == 0">
      <el-form class="-mb-15px " :model="queryParams" ref="queryFormRef" :inline="true" label-width="70px">
        <el-form-item label="续费月数" prop="renewMonths" class="ml-15">
          <el-input v-model="queryParams1.renewMonths" placeholder="请输入续费月数" clearable @keyup.enter="handleQuery"
            class="!w-200px" />
          <span class="ml-3">个月</span>
        </el-form-item>
        <el-form-item label="号码" prop="msisdnNumber">
          <el-input v-model="queryParams.msisdnNumber" placeholder="请输入用户的msisdn号码" clearable @keyup.enter="handleQuery"
            class="!w-240px" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery" type="primary">
            <Icon icon="ep:search" class="mr-5px" /> 添加号码
          </el-button>
          <el-button @click="resetQuery">
            <Icon icon="ep:refresh" class="mr-5px" /> 重置
          </el-button>
          <el-button type="primary" plain @click="openForm('create')">
            <Icon icon="ep:plus" class="mr-5px" /> 新增
          </el-button>
          <!-- <el-button type="success" plain @click="handleExport" :loading="exportLoading">
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button> -->
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true" class="mt-7">
        <el-table-column label="订单创建时间" align="center" prop="createTime" :formatter="dateFormatter" width="280px" />
        <el-table-column label="用户的msisdn号码" align="center" prop="msisdnNumber" />
        <el-table-column label="当前剩余月数" align="center" prop="nowMonths" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <!-- <el-button link type="primary" @click="openForm('update', scope.row.id)" v-hasPermi="['renew:msisdn:update']">
            编辑
          </el-button> -->
            <el-button link type="danger" @click="handleDelete(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <div v-if="successNumber == 1 && successNumber1 == 0">
      <div class="h-10 flex items-center mt-5 mb-3">
        <el-divider style="border-width: 2px; border-height: 2px; border-color: #409EFF;" direction="vertical" />
        <span class="pt-0" style="font-weight: 500; font-size: 18px;">
          订单信息
        </span>
      </div>
      <el-form :model="queryParams1" ref="queryFormRef" :inline="true" style="width:75% ;margin-left:auto">
        <el-form class="flex" label-width="120px">
          <el-form-item label="订单名称" prop="name">
            <el-input v-model="queryParams1.name" placeholder="请输入订单名称" clearable class="!w-240px" />
          </el-form-item>
          <el-form-item label="订单时间" prop="time">
            <el-input v-model="queryParams1.time" placeholder="请输入订单时间" clearable class="!w-240px" />
          </el-form-item>
        </el-form>
        <el-form class="flex" label-width="120px">
          <el-form-item label="订单客户" prop="customer">
            <el-input v-model="queryParams1.customer" placeholder="请输入订单客户" clearable class="!w-240px" />
          </el-form-item>
          <el-form-item label="订单备注" prop="name4">
            <el-input v-model="queryParams1.remarks" placeholder="请输入订单备注" clearable class="!w-240px" />
          </el-form-item>
        </el-form>
        <el-form class="flex" label-width="120px">
          <el-form-item label="付款方">
            <span>北京君行智讯科技有限公司</span>
          </el-form-item>
          <el-form-item label="收款方" class="ml-20">
            <span>广州智乐联信息科技有限公司</span>
          </el-form-item>
        </el-form>
      </el-form>
      <div class="h-10 flex items-center">
        <el-divider style="border-width: 2px; border-height: 2px; border-color: #409EFF;" direction="vertical" />
        <span class="pt-0" style="font-weight: 500; font-size: 18px;">
          业务管理
        </span>
      </div>
      <div class="bg-blue-100 pl-2 pr-2 pt-2 pb-2 ml-0 " style="border-radius: 5px;">
        <span class="tracking-wider" style="font-size: 14px;">温馨提示:该页面不支持修改套餐价格，如需修改请联系相关管理人员</span>
      </div>
      <!-- 列表 -->
      <el-table v-loading="loading" :data="testList" :stripe="true" :show-overflow-tooltip="true" class="mt-7">
        <el-table-column label="套餐名称" align="center" prop="name1" width="280px" />
        <el-table-column label="产品单价" align="center" prop="name2" />
        <el-table-column label="号码数量" align="center" prop="name3" />
        <el-table-column label="总价" align="center" prop="name4" />
      </el-table>
      <!-- 分页 -->
      <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <div v-if="successNumber == 1 && successNumber1 == 1">
      <div class="h-10 flex items-center mt-5 mb-3">
        <el-divider style="border-width: 2px; border-height: 2px; border-color: #409EFF;" direction="vertical" />
        <span class="pt-0" style="font-weight: 500; font-size: 18px;">
          订单详情
        </span>
      </div>
      <!-- 列表 -->
      <el-table v-loading="loading" :data="testList" :stripe="true" :show-overflow-tooltip="true" class="mt-7">
        <el-table-column label="套餐名称" align="center" prop="name1" width="280px" />
        <el-table-column label="产品单价" align="center" prop="name2" />
        <el-table-column label="号码数量" align="center" prop="name3" />
        <el-table-column label="总价" align="center" prop="name4" />
      </el-table>
      <!-- 分页 -->
      <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
        @pagination="getList" />
    </div>
  </ContentWrap>

  <!-- 按钮 -->
  <div class="flex ml-auto mt-6" style="width:180px">
    <el-button size="default" type="default" style="width:80px" @click="handleLastSuccess">上一步</el-button>
    <el-button type="primary" size="default" @click="handleNextSuccess" style="width:80px">确认</el-button>
  </div>

  <!-- 表单弹窗：添加/修改 -->
  <MsisdnForm ref="formRef" @success="getList" />
</template>
<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { MsisdnApi, MsisdnVO } from '@/api/subscriptionRenewal/msisdn'
import MsisdnForm from './components/MsisdnForm.vue'

/** msisdn号码续费 列表 */
defineOptions({ name: 'Msisdn' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<MsisdnVO[]>([
  // {
  //   msisdnNumber: '12345678901',
  //   nowMonths: 12,
  //   createTime: '2022-01-01 12:00:00'
  // }
]) // 列表的数据
// 测试列表数据
const testList = ref([
  {
    name1: '100M通用套餐',
    name2: '20元',
    name3: '1个',
    name4: '20.00元',
  }
])


const total = ref(0) // 列表的总页数
// 定义一个响应式对象queryParams，用于存储查询参数
const queryParams = reactive({
  // 当前页码
  pageNo: 1,
  // 每页显示的条数
  pageSize: 10,
  // 名称
  name: undefined,
  // 续费月份
  // renewMonths: undefined,
  // 手机号码
  msisdnNumber: undefined,
  // 当前月份
  nowMonths: undefined
})

//测试
const queryParams1 = reactive({

  // 续费月份
  renewMonths: undefined,
  name: undefined,
  time: undefined,
  customer: undefined,
  remarks: undefined
})

const formRules = reactive({
  name: [{ required: true, message: '分类名不能为空', trigger: 'blur' }],
  time: [{ required: true, message: '分类标志不能为空', trigger: 'blur' }],
  customer: [{ required: true, message: '分类状态不能为空', trigger: 'blur' }],
  remarks: [{ required: true, message: '分类排序不能为空', trigger: 'blur' }]
})

const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  // 尝试执行以下代码
  try {
    // 调用MsisdnApi的getMsisdnPage方法，传入queryParams参数，获取data数据
    const data = await MsisdnApi.getMsisdnPage(queryParams)
    // 将data中的list赋值给list.value
    list.value = data.list
    // 将data中的total赋值给total.value
    total.value = data.total
  } finally {
    // 无论是否成功，都将loading.value设置为false
    loading.value = false
  }
}

/** 搜索（添加号码）按钮操作  (修改过)*/
const handleQuery = () => {
  // loading.value = true
  queryParams.pageNo = 1
  try {
    getList()
    if (total.value == 0) {
      message.warning('暂无内部数据')
      return
    }
  } finally {
    // loading.value = false
  }
  // getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
// 定义一个名为openForm的函数，接收两个参数，type为字符串类型，id为可选的数字类型
const openForm = (type: string, id?: number) => {
  // 调用formRef.value的open方法，传入type和id参数
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await MsisdnApi.deleteMsisdn(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch { }
}

/** 导出按钮操作 */
// const handleExport = async () => {
//   try {
//     // 导出的二次确认
//     await message.exportConfirm()
//     // 发起导出
//     exportLoading.value = true
//     const data = await MsisdnApi.exportMsisdn(queryParams)
//     download.excel(data, 'msisdn号码续费.xls')
//   } catch {
//   } finally {
//     exportLoading.value = false
//   }
// }
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
onBeforeMount(() => {
  getList()
})
</script>
<style Scoped>
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