<template>

  <el-row class="mt-8px" :gutter="8" justify="space-between">
    <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" class="mb-8px">
      <el-card shadow="never">
        <el-skeleton :loading="loading" animated>
          <el-row>
            <el-col v-for="(item, index) in projects" :key="`card-${index}`" :xl="4" :lg="4" :md="12" :sm="24" :xs="24"
              class="ml-42px">
              <el-card shadow="hover" class="mr-8px ml-8px mt-5px"
                style="height: 100px; width:200px; background-color: #F4F4F5;">
                <div class="flex items-center">
                  <!-- <Icon :icon="item.icon" :size="25" class="mr-8px" /> -->
                  <span class="text-16px">{{ item.name }}</span>
                  <span class="ml-auto"><el-tag :type="item.type">{{ item.time }}</el-tag></span>
                </div>
                <div class="mt-12px text-15px" style="color: #4689FF;">{{ t(item.message) }}</div>
              </el-card>
            </el-col>
          </el-row>
        </el-skeleton>
      </el-card>

      <el-card shadow="never" class="mt-8px">
        <el-skeleton :loading="loading" animated>
          <el-row :gutter="20" justify="space-between">

            <!-- <el-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
              <el-card shadow="hover" class="mb-8px">
                <el-skeleton :loading="loading" animated>
                  <Echart :options="barOptionsData" :height="280" />
                </el-skeleton>
              </el-card>
            </el-col> -->
            <el-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
              <el-card shadow="hover" class="mb-8px">
                <el-skeleton :loading="loading" animated>
                  <Echart :options="lineOptionsData" :height="280" />
                </el-skeleton>
              </el-card>
            </el-col>
            <el-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
              <el-card shadow="hover" class="mb-8px">
                <el-skeleton :loading="loading" animated>
                  <Echart :options="pieOptionsData" :height="280" />
                </el-skeleton>
              </el-card>
            </el-col>


          </el-row>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import { pieOptions, barOptions, lineOptions } from './echarts-data'
import { formatTime } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import { useWatermark } from '@/hooks/web/useWatermark'
import type { WorkplaceTotal, Project, Notice, Shortcut } from './types'


defineOptions({ name: 'Home' })

const { t } = useI18n()
// const userStore = useUserStore()
// const { setWatermark } = useWatermark()
const loading = ref(true)
// const avatar = userStore.getUser.avatar
// const username = userStore.getUser.nickname
// 定义一个响应式的变量pieOptionsData，类型为EChartsOption，并将其赋值为pieOptions
const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption// 获取统计数
const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption// 获取统计数
let totalSate = reactive<WorkplaceTotal>({
  project: 0,
  access: 0,
  todo: 0
})

const getCount = async () => {
  const data = {
    project: 40,
    access: 2340,
    todo: 10
  }
  totalSate = Object.assign(totalSate, data)
}

// 获取项目数（卡片）
let projects = reactive<Project[]>([])
const getProject = async () => {
  const data = [
    {
      name: '当年订单量',
      message: '85360个',
      time: '所有',
      type: 'warning'
      //可加
      // icon: 'akar-icons:github-fill',
      // personal: 'Spring Boot 单体架构',
      // time: new Date()
    },
    {
      name: '未完结订单量',
      message: '43223个',
      time: '所有',
      type: 'warning'

    },
    {
      name: '采购订单',
      message: '4343个',
      time: '所有',
      type: 'warning'
    },
    {
      name: '充值续费订单',
      message: '434个',
      time: '本月',
      type: 'warning'
    },
    {
      name: '其他订单',
      message: '1个',
      time: '所有',
      type: 'warning'
    }
  ]
  projects = Object.assign(projects, data)
}

// 获取通知公告
let notice = reactive<Notice[]>([])
const getNotice = async () => {
  const data = [
    {
      title: '系统支持 JDK 8/17/21，Vue 2/3',
      type: '通知',
      keys: ['通知', '8', '17', '21', '2', '3'],
      date: new Date()
    },
    {
      title: '后端提供 Spring Boot 2.7/3.2 + Cloud 双架构',
      type: '公告',
      keys: ['公告', 'Boot', 'Cloud'],
      date: new Date()
    },
    {
      title: '全部开源，个人与企业可 100% 直接使用，无需授权',
      type: '通知',
      keys: ['通知', '无需授权'],
      date: new Date()
    },
    {
      title: '国内使用最广泛的快速开发平台，超 300+ 人贡献',
      type: '公告',
      keys: ['公告', '最广泛'],
      date: new Date()
    }
  ]
  notice = Object.assign(notice, data)
}

// 获取快捷入口
let shortcut = reactive<Shortcut[]>([])

const getShortcut = async () => {
  const data = [
    {
      name: 'Github',
      icon: 'akar-icons:github-fill',
      url: 'github.io'
    },
    {
      name: 'Vue',
      icon: 'logos:vue',
      url: 'vuejs.org'
    },
    {
      name: 'Vite',
      icon: 'vscode-icons:file-type-vite',
      url: 'https://vitejs.dev/'
    },
    {
      name: 'Angular',
      icon: 'logos:angular-icon',
      url: 'github.io'
    },
    {
      name: 'React',
      icon: 'logos:react',
      url: 'github.io'
    },
    {
      name: 'Webpack',
      icon: 'logos:webpack',
      url: 'github.io'
    }
  ]
  shortcut = Object.assign(shortcut, data)
}

// 用户来源
// 定义一个异步函数，用于获取用户访问来源
const getUserAccessSource = async () => {
  // 定义一个数组，包含用户访问来源的数据
  const data = [
    { value: 335, name: 'analysis.directAccess' },
    { value: 310, name: 'analysis.mailMarketing' },
    { value: 234, name: 'analysis.allianceAdvertising' },
    { value: 135, name: 'analysis.videoAdvertising' },
    { value: 1548, name: 'analysis.searchEngines' }
  ]
  // 设置饼图选项数据中的legend.data属性，使用t函数对name进行翻译
  set(
    pieOptionsData,
    'legend.data',
    data.map((v) => t(v.name))
  )

  // 设置饼图选项数据中的series[0].data属性，使用t函数对name进行翻译
  pieOptionsData!.series![0].data = data.map((v) => {
    return {
      name: t(v.name),
      value: v.value
    }
  })
}


const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption

// 周活跃量
// 定义一个异步函数，用于获取每周用户活动数据
const getWeeklyUserActivity = async () => {
  // 定义一个数据数组，包含每周用户活动的数据
  const data = [
    { value: 13253, name: 'analysis.monday' },
    { value: 34235, name: 'analysis.tuesday' },
    { value: 26321, name: 'analysis.wednesday' },
    { value: 12340, name: 'analysis.thursday' },
    { value: 24643, name: 'analysis.friday' },
    { value: 1322, name: 'analysis.saturday' },
    { value: 1324, name: 'analysis.sunday' }
  ]
  // 设置barOptionsData的xAxis.data属性，将数据数组中的name属性值通过t函数转换后赋值
  set(
    barOptionsData,
    'xAxis.data',
    data.map((v) => t(v.name))
  )
  // 设置barOptionsData的series属性，将数据数组中的value属性值赋值给data属性，并设置type为bar
  set(barOptionsData, 'series', [
    {
      name: t('analysis.activeQuantity'),
      data: data.map((v) => v.value),
      type: 'bar'
    }
  ])
}

const getYearUserActivity = async () => {
  // 定义一个数据数组，包含每周用户活动的数据
  const data = [
    { value: 2300, name: 'analysis.jan' },
    { value: 500, name: 'analysis.feb' },
    { value: 1200, name: 'analysis.mar' },
    { value: 1980, name: 'analysis.apr' },
    { value: 543, name: 'analysis.may' },
    { value: 543, name: 'analysis.jun' },
    { value: 1323, name: 'analysis.jul' },
    { value: 865, name: 'analysis.aug' },
    { value: 567, name: 'analysis.sep' },
    { value: 1777, name: 'analysis.oct' },
    { value: 4326, name: 'analysis.nov' },
    { value: 1597, name: 'analysis.dec' }
  ]
  // 设置barOptionsData的xAxis.data属性，将数据数组中的name属性值通过t函数转换后赋值
  set(
    lineOptionsData,
    'legend.data',
    data.map((v) => t(v.name))
  )
  // 设置barOptionsData的series属性，将数据数组中的value属性值赋值给data属性，并设置type为bar
  set(lineOptionsData, 'series', [
    {
      name: t('analysis.estimate'),
      data: data.map((v) => v.value),
      type: 'line'
    }
  ])
}

//得到所有的接口数据
const getAllApi = async () => {
  await Promise.all([
    getCount(),
    getProject(),
    getNotice(),
    getShortcut(),
    getUserAccessSource(),
    getWeeklyUserActivity(),
    getYearUserActivity()
  ])
  loading.value = false
}

getAllApi()
</script>
