/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import instance from "./index"
import qs from "qs"

export default class Request {
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:12:27
   * @description GET请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static getRequest = (url: string, params?: any) => {
    return instance({
      method: "get",
      url,
      params,
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:13:17
   * @description POST<JSON格式参数>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static postRequest = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:14:11
   * @description POST<FORM-DATA格式参数>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static formRequest = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      data: qs.stringify(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:14:45
   * @description PUT请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static putRequest = (url: string, params?: any) => {
    return instance({
      method: "put",
      url,
      data: qs.stringify(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:15:21
   * @description DELETE请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static deleteRequest = (url: string, params?: any) => {
    return instance({
      method: "delete",
      url,
      params,
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:15:49
   * @description POST<上传文件格式>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static uploadFileRequest = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      data: params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:16:17
   * @description POST<blob文件流格式>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static downloadBlob = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      responseType: "blob",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:16:44
   * @description GET<blob文件流格式>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static downloadBlobGet = (url: string, params?: any) => {
    return instance({
      method: "get",
      url,
      params: params,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-01-24 17:17:14
   * @description POST<arraybuffer二进制格式>请求
   * @param { string } url - 请求地址
   * @param { any } params - 请求参数
   */
  public static arraybuffer = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      responseType: "arraybuffer",
      data: qs.stringify(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }
  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-11-28 16:55:36
   * @description
   */
  public static arraybufferGet = (url: string, params?: any) => {
    return instance({
      method: "post",
      url,
      responseType: "arraybuffer",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
