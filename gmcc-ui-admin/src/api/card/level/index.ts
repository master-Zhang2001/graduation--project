import request from '@/config/axios'

// 分级账号 VO
export interface TieredAccountVO {
  id: number // 分级账号id
  parentName: string // 父级名称
  companyName: string // 公司全称
  relationName: string // 联系人姓名
  relationMobile: string // 联系人手机号
  followUpName: string // 跟进人
  replaces: boolean // 代付关系（1-是，0-否）
  flowDiscount: number // 流量套餐折扣
  voiceDiscount: number // 语音套餐折扣
  noteDiscount: number // 短信套餐折扣
  packageDiscount: number // 扩容包套餐折扣
  excessFlow: number // 超流量原价(元/Mb)
  excessFlowDiscount: number // 超流量享有多少折扣
  excessNote: number // 超短信原价（元/条）
  excessNoteDiscount: number // 超短信折扣
  excessPoolDiscount: number // 超流量池折扣
  excessVoiceDiscount: number // 超语音折扣
  excessPool: number // 超流量池（元/Mb）
  loginName: string // 登录用户名
  adminPassword: string // 管理员密码
  email: string // Email
  nickname: string // 昵称
  roleId: number // 角色id
  excessVoice: number // 超语音(元/分钟)
}

// 分级账号 API
export const TieredAccountApi = {
  // 查询分级账号分页
  getTieredAccountPage: async (params: any) => {
    return await request.get({ url: `/manage/tiered-account/page`, params })
  },

  // 查询分级账号详情
  getTieredAccount: async (id: number) => {
    return await request.get({ url: `/manage/tiered-account/get?id=` + id })
  },

  // 新增分级账号
  createTieredAccount: async (data: TieredAccountVO) => {
    return await request.post({ url: `/manage/tiered-account/create`, data })
  },

  // 修改分级账号
  updateTieredAccount: async (data: TieredAccountVO) => {
    return await request.put({ url: `/manage/tiered-account/update`, data })
  },

  // 删除分级账号
  deleteTieredAccount: async (id: number) => {
    return await request.delete({ url: `/manage/tiered-account/delete?id=` + id })
  },

  // 导出分级账号 Excel
  exportTieredAccount: async (params) => {
    return await request.download({ url: `/manage/tiered-account/export-excel`, params })
  }
}