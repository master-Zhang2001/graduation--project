import request from '@/config/axios'

// 卡订购入库订单详情 VO
export interface CardJoinOrderVO {
  id: number // 订单id
  orderNumber: string // 订单号
  orderState: number // 订单状态(0-正在进行，1-已完结)
  orderName: string // 订单名称
  orderDescr: string // 订单备注
  orderTime: Date // 订单时间
  importObject: string // 导入对象
  accessPoint: string // 运营商接入点
  operator: string // 运营商
  mainPackage: string // 主体套餐
  tariffGroup: string // 资费组
  discount: string // 开卡折扣
  flowPool: boolean // 是否加入流量池
  extensionPack: boolean // 是否开通扩容包
  cardType: string // 卡体类型
  numberType: string // 号码类型
  overStop: boolean // 是否超流量停
  testTime: Date // 测试期时间
  cardBinding: boolean // 是否机卡绑定
  accessory: byte[] // 附件图片
  operationUser: string // 操作用户
  examineUser: string // 复核用户
  orderResult: string // 订单结果
  settlementType: string // 结算类型
  orderAmount: number // 订单金额
}

// 卡订购入库订单详情 API
export const CardJoinOrderApi = {
  // 查询卡订购入库订单详情分页
  getCardJoinOrderPage: async (params: any) => {
    return await request.get({ url: `/manage/card-join-order/page`, params })
  },

  // 查询卡订购入库订单详情
  // 根据id获取卡片加入顺序
  getCardJoinOrder: async (id: number) => {
    // 发送get请求，获取卡片加入顺序
    return await request.get({ url: `/manage/card-join-order/get?id=` + id })
  },

  // 新增卡订购入库订单详情
  createCardJoinOrder: async (data: CardJoinOrderVO) => {
    return await request.post({ url: `/manage/card-join-order/create`, data })
  },

  // 修改卡订购入库订单详情
  updateCardJoinOrder: async (data: CardJoinOrderVO) => {
    return await request.put({ url: `/manage/card-join-order/update`, data })
  },

  // 删除卡订购入库订单详情
  deleteCardJoinOrder: async (id: number) => {
    return await request.delete({ url: `/manage/card-join-order/delete?id=` + id })
  },

  // 导出卡订购入库订单详情 Excel
  exportCardJoinOrder: async (params) => {
    return await request.download({ url: `/manage/card-join-order/export-excel`, params })
  }
}