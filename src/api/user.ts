import Request from "../axios/request"

export default class User {
  // 获取用户分页列表
  public static getUserList(params: any) {
    return Request.postRequest("/user/list", params)
  }
  // 获取组织架构
  public static getOrgList(params: any) {
    return Request.postRequest("/organization/list", params)
  }
  // 新增组织架构
  public static getOrgAdd(params: any) {
    return Request.postRequest("/organization/add", params)
  }
  // 获取不分页人员列表
  public static getOrgUserList(params: any) {
    return Request.postRequest("/user/getUserListByOrg", params)
  }
  // 删除组织架构
  public static deleteOrg(params: any) {
    return Request.deleteRequest(`/organization/remove/${params}`)
  }
  // 组织架构详情
  public static OrgDetail(params: any) {
    return Request.getRequest(`/organization/detail/${params}`)
  }
  // 编辑用户
  public static editUser(params: any) {
    return Request.postRequest("/user/add", params)
  }
  // 批量分配角色
  public static batchRole(params: any) {
    return Request.postRequest("/user/batchAssignRole", params)
  }
}
