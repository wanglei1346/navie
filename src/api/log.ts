import Request from "../axios/request"

export default class Log {
  // 操作日志
  public static getOperationLog(params: any) {
    return Request.postRequest("/logOperation/selectAllLogOperation", params)
  }
  // 函证日志
  public static getCochainLog(params: any) {
    return Request.postRequest("/log_conf/selectAllLogUpChain", params)
  }
}
