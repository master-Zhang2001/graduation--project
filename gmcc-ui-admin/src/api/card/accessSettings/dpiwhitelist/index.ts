import request from '@/config/axios'

// DPI白名单配置 VO
export interface DpiWhiteListVO {
  id: number // id
  clientName: string // 客户名称
  targetAddress: string // 目标地址
  targetAddressParameter: string // 目标地址参数
  agreementNumber: string // 协议号
  type: number // 类型
}

// DPI白名单配置 API
export const DpiWhiteListApi = {
  // 查询DPI白名单配置分页
  getDpiWhiteListPage: async (params: any) => {
    return await request.get({ url: `/manage/dpi-white-list/page`, params })
  },

  // 查询DPI白名单配置详情
  getDpiWhiteList: async (id: number) => {
    return await request.get({ url: `/manage/dpi-white-list/get?id=` + id })
  },

  // 新增DPI白名单配置
  createDpiWhiteList: async (data: DpiWhiteListVO) => {
    return await request.post({ url: `/manage/dpi-white-list/create`, data })
  },

  // 修改DPI白名单配置
  updateDpiWhiteList: async (data: DpiWhiteListVO) => {
    return await request.put({ url: `/manage/dpi-white-list/update`, data })
  },

  // 删除DPI白名单配置
  deleteDpiWhiteList: async (id: number) => {
    return await request.delete({ url: `/manage/dpi-white-list/delete?id=` + id })
  },

  // 导出DPI白名单配置 Excel
  exportDpiWhiteList: async (params) => {
    return await request.download({ url: `/manage/dpi-white-list/export-excel`, params })
  }
}