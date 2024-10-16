import request from '@/config/axios'

// 卡组 VO
export interface GroupVO {
  id: number // 卡组id
  groupName: string // 卡组名
}

// 卡组 API
export const GroupApi = {
  // 查询卡组分页
  getGroupPage: async (params: any) => {
    return await request.get({ url: `/card/group/page`, params })
  },

  // 查询卡组详情
  getGroup: async (id: number) => {
    return await request.get({ url: `/card/group/get?id=` + id })
  },

  // 新增卡组
  createGroup: async (data: GroupVO) => {
    return await request.post({ url: `/card/group/create`, data })
  },

  // 修改卡组
  updateGroup: async (data: GroupVO) => {
    return await request.put({ url: `/card/group/update`, data })
  },

  // 删除卡组
  deleteGroup: async (id: number) => {
    return await request.delete({ url: `/card/group/delete?id=` + id })
  },

  // 导出卡组 Excel
  exportGroup: async (params) => {
    return await request.download({ url: `/card/group/export-excel`, params })
  }
}