import Request from "@/axios/request"
class Proof {
  // 函证管理列表
  public static list(params: any) {
    return Request.postRequest("/conf-sending/list", params)
  }
  // 批量删除
  public static delete(params: any) {
    return Request.postRequest("/conf-sending/batch-delete", params)
  }
  // 作废/恢复
  public static scrap(params: any) {
    return Request.postRequest("/conf-sending/batch-scrap", params)
  }
  // 发送函证
  public static send(params: any) {
    return Request.postRequest("/conf-sending/batch-send", params)
  }
  // 函证详情
  public static detail(id: string) {
    return Request.getRequest(`/conf/bank-conf/${id}`)
  }
  // 函证状态字典
  public static getConfStates(params: any) {
    return Request.postRequest("/dict/confStates", params)
  }
}
export default Proof
