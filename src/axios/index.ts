import axios from "axios"
import { useUserStore } from "../store/user"
import router from "../router/index"
const user = useUserStore()
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-01-24 19:34:38
 * @description 请求失败后的错误统一处理
 * @param { number } status 请求失败的状态码
 */
const errorHandle = (status: number) => {
  switch (status) {
    case 302:
      window.$message.error("接口重定向了！")
      break
    case 400:
      window.$message.error(
        "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status
      )
      break
    case 401:
      break
    case 403:
      window.$message.error(
        "登录过期,用户得到授权，但是访问是被禁止的==>" + status
      )
      break
    case 404:
      window.$message.error("网络请求不存在==>" + status)
      break
    case 406:
      window.$message.error("请求的格式不可得==>" + status)
      break
    case 408:
      window.$message.error(" 请求超时！")
      break
    case 410:
      window.$message.error("请求的资源被永久删除，且不会再得到的==>" + status)
      break
    case 422:
      window.$message.error("当创建一个对象时，发生一个验证错误==>" + status)
      break
    case 500:
      window.$message.error("服务器发生错误，请检查服务器==>" + status)
      break
    case 502:
      window.$message.error("网关错误==>" + status)
      break
    case 503:
      window.$message.error("服务不可用，服务器暂时过载或维护==>" + status)
      break
    case 504:
      window.$message.error("网关超时==>" + status)
      break
    default:
      window.$message.error("其他错误错误==>" + status)
  }
}

interface IRequestType {
  url?: string
  method?: string
  params: any
  data: any
  cancel: any
}

const request: Array<IRequestType> = []
const CancelToken = axios.CancelToken

const removeRequest = (config: any) => {
  for (const key in request) {
    const item: number = +key
    const list: IRequestType = request[key]
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel("操作太频繁，请稍后再试")
      request.splice(item, 1)
    }
  }
}

/* 实例化请求配置 */
const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin-Type": "*",
  },
  // 请求时长
  timeout: 1000 * 30,
  // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
  // baseURL: "http://192.168.31.115:10333/web",
  baseURL: "/api/web",
  // baseURL: "http://10.0.1.124:9953/web",
  // baseURL: "http://192.168.31.115:10900/web",
  //     ? "测试"
  //     : "正式",
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config: any) => {
    removeRequest(config)
    config.cancelToken = new CancelToken((c: any) => {
      request.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c,
      })
    })
    const token = "Bearer " + user.$state.token
    if (token) {
      if (!config?.headers) {
        throw new Error(
          `Expected 'config' and 'config.headers' not to be undefined`
        )
      }
      config.headers.Authorization = token // "Bearer " + token
    }
    return config
  },
  (error: any) => {
    return Promise.resolve(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (config: any) => {
    removeRequest(config.config)
    // 请求成功
    if (!config.data.success && config.data.errMessage) {
      window.$message.error(config.data.errMessage)
    }
    return config
    // 请求失败
  },
  (error: any) => {
    const { response } = error
    if (response) {
      errorHandle(response.status)
    }
    if (error.message.indexOf("timeout") === -1) {
      window.$message.error("请求超时")
    }
    return Promise.resolve(response)
  }
)
// 只需要考虑单一职责，这块只封装axios
export default instance
