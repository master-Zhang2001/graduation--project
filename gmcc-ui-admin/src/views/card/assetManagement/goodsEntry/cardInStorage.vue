<template>
  <div class="bg-blue-100 pl-2 pr-2 pt-2 pb-2 ml-0 " style="border-radius: 5px;">
    <span class="tracking-wider" style="font-size: 14px;">当前卡池容量(已使用量/总量)：286359 / 1000000 (若需要扩容请点击"卡池扩容"进行扩容)</span>
  </div>
  <div class="topStyle1">
    <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />
    <span class="spanStyle1 ml-4 mr-4 cursor-pointer"  style="color: #E6A23C; white-space: nowrap;">导入号码</span>
    <el-progress :percentage="100" style="width: 15%;" status="warning" :show-text="false" :stroke-width="4" />

    <el-progress v-if="!successNumber" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#909399" />
    <span v-if="!successNumber" class="spanStyle1 ml-4 mr-4 cursor-pointer"
      style="color: #909399; white-space: nowrap;" @click="handleClick1">确认订单</span>
    <el-progress v-if="!successNumber" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#909399" />
    <el-progress v-if="successNumber" :percentage="100" style="width: 15%;" :show-text="false"
      :stroke-width="4" />
    <span v-if="successNumber" class="spanStyle1 ml-4 mr-4 cursor-pointer"
      style="color: #409EFF; white-space: nowrap;" @click="handleClick1">确认订单</span>
    <el-progress v-if="successNumber" :percentage="100" style="width: 15%;" :show-text="false"
      :stroke-width="4" />

    <el-progress v-if="!successNumber1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#909399" />
    <span v-if="!successNumber1" class="spanStyle1 ml-4 mr-4 cursor-pointer"
      style="color: #909399; white-space: nowrap;" @click="handleClick2">提交订单</span>
    <el-progress v-if="!successNumber1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#909399" />
    <el-progress v-if="successNumber1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#57C23A" />
    <span v-if="successNumber1" class="spanStyle1 ml-4 mr-4 cursor-pointer"
      style="color: #57C23A; white-space: nowrap;" @click="handleClick2">提交订单</span>
    <el-progress v-if="successNumber1" :percentage="100" style="width: 15%;" :show-text="false" :stroke-width="4"
      color="#57C23A" />
  </div>
  
  <div class="h-10 flex items-center mt-5">
    <el-divider style="border-width: 2px; border-height: 2px; border-color: #409EFF;" direction="vertical" />
    <span class="pt-0" style="font-weight: 500; font-size: 18px;">
      订单信息
    </span>
  </div>
  <div class="pl-16 pt-3 bg-light-100" :model="formData" v-loading="formLoading">
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="订单名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入服务号码" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="订单备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入服务号码" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="订单时间" prop="time">
        <el-date-picker v-model="formData.time" placeholder="请选择时间" style="width: 300px;" type="date" clearable />
      </el-form-item>
    </el-form>
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="运营商接入点" prop="accessPoint">
        <el-input v-model="formData.accessPoint" placeholder="请输入服务号码" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="入库对象" prop="object">
        <el-input v-model="formData.object" placeholder="请输入服务号码" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="运营商" prop="Operator">
        <el-select v-model="formData.Operator" placeholder="--请选择运营商--" style="width: 300px;">
          <el-option label="中国电信" value="中国电信" />
          <el-option label="中国移动" value="中国移动" />
          <el-option label="中国联通" value="中国联通" />
          <el-option label="广东物联云" value="广东物联云" />
          <el-option label="广东电信" value="广东电信" />
          <el-option label="中移动物联网" value="中移动物联网" />
          <el-option label="移动（onelink）" value="移动（onelink）" />
          <el-option label="蜂助手" value="蜂助手" />
          <el-option label="电信（aoi）" value="电信（aoi）" />
          <el-option label="杭州电信" value="杭州电信" />
          <el-option label="深圳联通-ioc100" value="深圳联通-ioc100" />
          <el-option label="广东联通" value="广东联通" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="主体套餐" prop="combo">
        <el-input v-model="formData.combo" placeholder="请输入服务号码" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="开卡折扣" prop="discount">
        <el-input v-model="formData.discount" placeholder="请输入折扣..." style="width: 275px;" />
        <span class="ml-3">折</span>
      </el-form-item>
      <el-form-item label="资费组" prop="tariff">
        <el-select v-model="formData.tariff" placeholder="--请选择资费组--" style="width: 300px;">
          <el-option label="中国移动（江门分公司）" value="中国移动（江门分公司）" />
          <el-option label="中国移动（广州分公司）" value="中国移动（广州分公司）" />
          <el-option label="中国移动（深圳分公司）" value="中国移动（深圳分公司）" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="加入流量池" prop="trafficPool">
        <el-radio-group v-model="formData.trafficPool" class="ml-4">
          <el-radio value="sponsorship">是</el-radio>
          <el-radio value="venue">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开通扩容包 " prop="expansionPackage" class="ml-45">
        <el-radio-group v-model="formData.expansionPackage" class="ml-4">
          <el-radio value="sponsorship">是</el-radio>
          <el-radio value="venue">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="卡体类型" prop="cardType" class="ml-45">
        <el-select v-model="formData.cardType" placeholder="--请选择卡体类型--" style="width: 300px;">
          <el-option label="MP1单切大卡" value="MP1单切大卡" />
          <el-option label="MP2单切大卡" value="MP2单切大卡" />
          <el-option label="MP1双切大卡" value="MP1双切大卡" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="号码类型" prop="numberType">
        <el-select v-model="formData.numberType" placeholder="--请选择号码类型--" style="width: 300px;">
          <el-option label="物联卡" value="物联卡" />
          <el-option label="虚拟卡" value="虚拟卡" />
          <el-option label="国漫卡" value="国漫卡" />
        </el-select>
      </el-form-item>
      <el-form-item label="超流量停" prop="superFlow">
        <el-radio-group v-model="formData.superFlow" class="ml-4">
          <el-radio value="sponsorship">是</el-radio>
          <el-radio value="venue">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="测试期时间" prop="testTime" class="ml-45">
        <el-input v-model="formData.testTime" style="width: 200px;" type="number" placeholder="请输入测试时间" />
        <el-select v-model="formData.cycleTime" style="width: 100px;" placeholder="选择周期">
          <el-option label="年" value="年" />
          <el-option label="月" value="月" />
          <el-option label="日" value="日" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="formRef" label-width="100px" class="flex">
      <el-form-item label="开通机卡绑定 " prop="binding" class="mt-2">
        <el-radio-group v-model="formData.binding" class="ml-4">
          <el-radio value="sponsorship">开通</el-radio>
          <el-radio value="venue">未开通</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="附件" prop="appendix" class="ml-33 mt-1">
        <el-upload v-model="formData.appendix" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
          <el-button type="primary" class="ml-5">上传文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
  <div class="h-10 flex items-center mt-5">
    <el-divider style="border-width: 2px; border-height: 2px; border-color: #409EFF;" direction="vertical" />
    <span class="pt-0" style="font-weight: 500; font-size: 18px;">
      业务管理
    </span>
  </div>
  <div class="bg-blue-100 pl-2 pr-2 pt-2 pb-2 ml-0 " style="border-radius: 5px;">
    <span class="tracking-wider" style="font-size: 14px;">注：办理了月套餐的物联卡才能执行续期操作，
      长周期套餐物联卡请谨慎选择到期停，因为长周期套餐物联卡不能办理续期业务！
      到期之后不能续期只能再次叠加长周期套餐！除非同时办理了月套餐才能续期</span>
  </div>
  <el-form label-width="80px" :inline="false" class="flex  justify-center pt-5" prop="accountMode">
    <el-form-item label="账户模式">
      <el-radio-group v-model="formData.accountMode">
        <el-radio value="feeCarrier" class="ml-3">费用直邀运营商</el-radio>
        <el-radio value="feePayment">费用代缴（费用月结）</el-radio>
        <el-radio value="expenseAdvance">费用预付</el-radio>
        <el-radio value="noSystemRequired">无需系统结算</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <el-divider />
  <div class="ml-auto mt-3" style="width:15%">
    <el-button type="primary">确认</el-button>
    <el-button type="info">取消</el-button>
  </div>
</template>
<script lang="ts" setup>
import { Minus, Plus } from '@element-plus/icons-vue'
// const titleAll = ref([""])
// const messages = ref([""])
const formLoading = ref(false)
const formData = ref({
  name: undefined,
  remark: undefined,
  time: undefined,
  object: undefined,
  accessPoint: undefined,
  Operator: undefined,
  combo: undefined,
  discount: undefined,
  tariff: undefined,
  trafficPool: undefined,
  expansionPackage: undefined,
  cardType: undefined,
  numberType: undefined,
  superFlow: undefined,
  testTime: undefined,
  binding: undefined,
  appendix: undefined,
  accountMode:undefined,
  sponsorship: undefined,
  venue: undefined,
  cycleTime: undefined,
  feeCarrier:undefined,
  feePayment:undefined,
  expenseAdvance:undefined,
  noSystemRequired:undefined,
})
const formRules = reactive({
  name: [{ required: true, message: '分类名不能为空', trigger: 'blur' }],
  remark: [{ required: true, message: '分类标志不能为空', trigger: 'blur' }],
  time: [{ required: true, message: '分类状态不能为空', trigger: 'blur' }],
  object: [{ required: true, message: '分类排序不能为空', trigger: 'blur' }]
})

const percentage = ref(10)
const percentage2 = ref(0)



// const increase = () => {
//   percentage.value += 10
//   if (percentage.value > 100) {
//     percentage.value = 100
//   }
// }
// const decrease = () => {
//   percentage.value -= 10
//   if (percentage.value < 0) {
//     percentage.value = 0
//   }
// }

//按钮跳转下一部分和上一部分
const successNumber = ref(false)
const successNumber1 = ref(false)
const handleClick1 = () => {
  // if(条件)
  if( successNumber1.value){
    successNumber1.value = false
    successNumber.value = true
  }else{
    successNumber.value = true
  }
  // if(...条件){}
}
const handleClick2 = () => {
  if(successNumber.value ){
    successNumber1.value = true
  }else{
    successNumber1.value = false
  }
}

onMounted(() => {
  setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10
  }, 500)
})
</script>
<style>
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
  margin-top: 30px;
}

.el-divider--horizontal {
  margin: 0
}
</style>
