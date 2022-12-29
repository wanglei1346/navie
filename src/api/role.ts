import Request from "../axios/request"

export default class Role {
  // 获取角色列表
  public static getRoleList(params: any) {
    return Request.postRequest("/role/list", params)
  }
  // 删除角色
  public static deleteRole(params: any) {
    return Request.deleteRequest(`/role/remove/${params}`)
  }
  // 添加角色
  public static addRole(params: any) {
    return Request.postRequest("/role/add", params)
  }
  // 角色字典
  public static getRoleDicks(params?: any) {
    return Request.getRequest("/role/dicts", params)
  }
  // 菜单权限
  public static getMenus(params?: any) {
    return Request.getRequest("/menu/list", params)
  }
  // 编辑菜单权限
  public static editMenus(params?: any) {
    return Request.postRequest("/menu/auth/add", params)
  }
}
