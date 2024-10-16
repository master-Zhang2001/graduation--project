import request from '@/config/axios'
export const cardAssetListApi = {
  getCardAssetList: async (params: any) => {
    return await request.get({ url: `/network/client-card/clientSum`, params })
  }
}
