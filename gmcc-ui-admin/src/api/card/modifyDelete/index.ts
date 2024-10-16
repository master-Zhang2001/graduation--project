import request from '@/config/axios'

// 网卡 VO
export interface CardVO {
  id: number // 网卡id
  serviceNumber: string // 服务号码
  iccid: string // ICCID
  commodityName: string // 主商品名称
  cardStatus: number // 卡状态(0-激活、1-停机)
  joinGroup: boolean // 是否加入群组
  manageStop: boolean // 是否管理停机
  isRealName: boolean // 是否实名
  isAbnormal: boolean // 是否异常（0-正常；1-异常）
  operatorType: string // 运营商类型
  cardType: string // 卡体类型
}

// 网卡 API
export const CardApi = {
  // 查询网卡分页
  getCardPage: async (params: any) => {
    return await request.get({ url: `/manage/card/page`, params })
  },

  // 查询网卡详情
  getCard: async (id: number) => {
    return await request.get({ url: `/manage/card/get?id=` + id })
  },

  // 新增网卡
  createCard: async (data: CardVO) => {
    return await request.post({ url: `/manage/card/create`, data })
  },

  // 修改网卡
  updateCard: async (data: CardVO) => {
    return await request.put({ url: `/manage/card/update`, data })
  },

  // 删除网卡
  deleteCard: async (id: number) => {
    return await request.delete({ url: `/manage/card/delete?id=` + id })
  },

  // 导出网卡 Excel
  exportCard: async (params) => {
    return await request.download({ url: `/manage/card/export-excel`, params })
  }
}