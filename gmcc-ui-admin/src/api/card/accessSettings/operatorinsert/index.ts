import request from '@/config/axios'

// 运营商接入配置 VO
export interface OperatorInsertVO {
  id: number // id
  number: number // 运营商客户编码
  name: string // 接入名称
  type: string // 运营商类型
  place: string // 运营商接入地
  interval: number // 运营商批量接口访问间隔(毫秒)
  packageDiscount: number // 套餐折扣
  noteDiscount: number // 短信折扣
  voiceDiscount: number // 语音折扣
  flowDiscount: number // 超流量折扣
  dilatationDiscount: number // 扩容包折扣
  flowPoolDiscount: number // 超流量池折扣
  operatorState: number // 运营商接口状态（1-正在使用，0-停用）
}

// 运营商接入配置 API
export const OperatorInsertApi = {
  // 查询运营商接入配置分页
  getOperatorInsertPage: async (params: any) => {
    return await request.get({ url: `/manage/operator-insert/page`, params })
  },

  // 查询运营商接入配置详情
  getOperatorInsert: async (id: number) => {
    return await request.get({ url: `/manage/operator-insert/get?id=` + id })
  },

  // 新增运营商接入配置
  createOperatorInsert: async (data: OperatorInsertVO) => {
    return await request.post({ url: `/manage/operator-insert/create`, data })
  },

  // 修改运营商接入配置
  updateOperatorInsert: async (data: OperatorInsertVO) => {
    return await request.put({ url: `/manage/operator-insert/update`, data })
  },

  // 删除运营商接入配置
  deleteOperatorInsert: async (id: number) => {
    return await request.delete({ url: `/manage/operator-insert/delete?id=` + id })
  },

  // 导出运营商接入配置 Excel
  exportOperatorInsert: async (params) => {
    return await request.download({ url: `/manage/operator-insert/export-excel`, params })
  }
}