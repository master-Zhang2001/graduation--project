import request from '@/config/axios'

// msisdn号码续费 VO
export interface MsisdnVO {
  id: number // 编号
  name: string // 名字
  createTime: Date // 订单创建时间
  renewMonths: number // 续费月数
  msisdnNumber: string // 用户的msisdn号码
  woodName: string // 套餐名字
  nowMonths: number // 当前剩余月数
}

// msisdn号码续费 API
export const MsisdnApi = {
  // 查询msisdn号码续费分页
  getMsisdnPage: async (params: any) => {
    return await request.get({ url: `/renew/msisdn/page`, params })
  },

  // 查询msisdn号码续费详情
  getMsisdn: async (id: number) => {
    return await request.get({ url: `/renew/msisdn/get?id=` + id })
  },

  // 新增msisdn号码续费
  createMsisdn: async (data: MsisdnVO) => {
    return await request.post({ url: `/renew/msisdn/create`, data })
  },

  // 修改msisdn号码续费
  updateMsisdn: async (data: MsisdnVO) => {
    return await request.put({ url: `/renew/msisdn/update`, data })
  },

  // 删除msisdn号码续费
  deleteMsisdn: async (id: number) => {
    return await request.delete({ url: `/renew/msisdn/delete?id=` + id })
  },

  // 导出msisdn号码续费 Excel
  exportMsisdn: async (params) => {
    return await request.download({ url: `/renew/msisdn/export-excel`, params })
  }
}