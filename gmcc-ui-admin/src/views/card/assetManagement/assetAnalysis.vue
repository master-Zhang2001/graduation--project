<template>
  <echartsIndex />
  <el-card>
    <ContentWrap>
      <!-- 搜索工作栏 -->
      <el-form class="-mb-15px ml-4" :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
        <el-form-item label="客户名称" prop="clientName">
          <el-input v-model="queryParams.clientName" placeholder="请输入客户名称" clearable @keyup.enter="handleQuery"
            class="!w-240px" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery" type="primary">
            <Icon icon="ep:search" class="mr-5px" /> 查询
          </el-button>
          <el-button @click="resetQuery">
            <Icon icon="ep:refresh" class="mr-5px" /> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </ContentWrap>
    <!-- 列表 -->
    <ContentWrap>
      <!-- 了prop之前忘记写 -->
      <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
        <el-table-column label="客户名称" align="center" prop="clientName" width="300px" />
        <el-table-column label="总量" align="center" prop="logoutSum" width="200px" />
        <el-table-column label="当年增量" align="center" prop="monthNew" width="200px" />
        <el-table-column label="当月增量" align="center" prop="sum" />
        <el-table-column label="当月注销量" align="center" prop="yearNew" />
      </el-table>
      <!-- 分页 -->
      <!-- 分页组件，total为总条数，v-model:page为当前页数，v-model:limit为每页条数，@pagination为分页事件，getList为分页事件触发的方法 -->
      <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" /> 
     </ContentWrap>
  </el-card>
</template>
<script lang="ts" setup>
import echartsIndex from '@/views/card/components/Index.vue';
import { cardAssetListApi } from '@/api/card/cardAssetList'
defineOptions({ name: 'CardJoinOrder' })
const loading = ref(true) // 列表的加载中
const list = ref([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  clientName: undefined,
  logoutSum: undefined,
  monthNew: undefined,
  sum: undefined,
  yearNew: undefined,
})
const queryFormRef = ref() // 搜索的表单

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await cardAssetListApi.getCardAssetList(queryParams)
    console.log(data);
    // 将data中的list赋值给list.value
    list.value = data
    total.value = data.length
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
/** 初始化 **/
onMounted(() => {
  getList()
})
</script>