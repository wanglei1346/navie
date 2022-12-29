import Request from "../axios/request"

export default class Project {
  /**
   * 项目列表
   */
  public static selectAllProject(params: any) {
    return Request.postRequest("/project/selectAllProject", params)
  }
  // 创建项目
  public static addProject(params: any) {
    return Request.postRequest("/project/addProject", params)
  }
  // 部门列表/组织架构列表
  public static organizationList(params: any) {
    return Request.postRequest("/organization/list", params)
  }
  // 部门下人员列表
  public static getUserListByOrg(params: any) {
    return Request.postRequest(`/user/getUserListByOrg`, params)
  }
  // 条件查询
  public static SummaryList(params: any) {
    return Request.postRequest("/conf-analysis/summary-list", params)
  }
  // 上传文件
  public static ExcelImport(params: any) {
    return Request.uploadFileRequest("/conf-analysis/excel-import", params)
  }
  // 查看项目详情
  public static projectDetail(id: string) {
    return Request.getRequest(`/project/${id}`)
  }
  // 导入记录
  public static selectAllImportRecord(params: any) {
    return Request.postRequest("import-record/selectAllImportRecord", params)
  }
  // 通过记录ID查看导入记录
  public static selectImportRecordById(recordId: Number) {
    return Request.getRequest(
      `import-record/selectBankConfIdByRecordId/${recordId}`
    )
  }
  // 通过项目ID查看项目人员分页
  public static selectMemberInfoByProjectId(params: any) {
    return Request.postRequest("project/selectMemberInfoByProjectId", params)
  }
  // 删除项目
  public static deleteProject(id: Number) {
    return Request.deleteRequest(`project/deleteProject/${id}`)
  }
  // 删除项目人员
  public static deleteProjectMember(id: Number) {
    return Request.deleteRequest(`project/deleteProjectMember/${id}`)
  }
  // 统计概述,type: 0-全部，1-本月，2-本周
  public static Staticsummary(prjId: String, type: number) {
    return Request.getRequest(`conf-analysis/summary/${prjId}/${type}`)
  }
  // 函证条件查询 conf-analysis/summary-list
  public static summaryList(params: any) {
    return Request.postRequest(`conf-analysis/summary-list`, params)
  }
  // 创建函证
  public static submitSonP(params: any) {
    return Request.postRequest(`conf/bank-conf/format1/submit`, params)
  }
  // 获取函证
  public static confStates(params: any) {
    return Request.postRequest(`dict/confStates`, params)
  }
}
