import request from '@/config/axios'

// 订单办理-流量叠加 VO
export interface TrafficVO {
  id: number // 序号
  msisdnNumber: string // 号码
  commodityName: string // 商品名字
}

// 订单办理-流量叠加 API
export const TrafficApi = {
  // 查询订单办理-流量叠加分页
  getTrafficPage: async (params: any) => {
    return await request.get({ url: `/order/traffic/page`, params })
  },

  // 查询订单办理-流量叠加详情
  getTraffic: async (id: number) => {
    return await request.get({ url: `/order/traffic/get?id=` + id })
  },

  // 新增订单办理-流量叠加
  createTraffic: async (data: TrafficVO) => {
    return await request.post({ url: `/order/traffic/create`, data })
  },

  // 修改订单办理-流量叠加
  updateTraffic: async (data: TrafficVO) => {
    return await request.put({ url: `/order/traffic/update`, data })
  },

  // 删除订单办理-流量叠加
  deleteTraffic: async (id: number) => {
    return await request.delete({ url: `/order/traffic/delete?id=` + id })
  },

  // 导出订单办理-流量叠加 Excel
  exportTraffic: async (params) => {
    return await request.download({ url: `/order/traffic/export-excel`, params })
  }
}