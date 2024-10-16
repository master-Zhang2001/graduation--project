import request from '@/config/axios'

// 设备 VO
export interface DeviceVO {
  id: number // 编号
  iccid: string // 号码
  customerName: string // 客户名称
  code: string // 设备特征码
  name: string // 设备名
  model: string // 设备型号
  type: string // 设备类型
  imei: string // 终端IMEI号
  remarks: string // 备注
  manager: string // 设备管理员
  phone: string // 设备管理员电话
}

// 设备 API
export const DeviceApi = {
  // 查询设备分页
  getDevicePage: async (params: any) => {
    return await request.get({ url: `/network/device/page`, params })
  },

  // 查询设备详情
  getDevice: async (id: number) => {
    return await request.get({ url: `/network/device/get?id=` + id })
  },

  // 新增设备
  createDevice: async (data: DeviceVO) => {
    return await request.post({ url: `/network/device/create`, data })
  },

  // 修改设备
  updateDevice: async (data: DeviceVO) => {
    return await request.put({ url: `/network/device/update`, data })
  },

  // 删除设备
  deleteDevice: async (id: number) => {
    return await request.delete({ url: `/network/device/delete?id=` + id })
  },

  // 导出设备 Excel
  exportDevice: async (params) => {
    return await request.download({ url: `/network/device/export-excel`, params })
  },
}