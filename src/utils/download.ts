import Request from "@/axios/request"
import { createDiscreteApi } from "naive-ui"
const { loadingBar } = createDiscreteApi(["loadingBar"], {
  loadingBarProviderProps: {
    loadingBarStyle: {
      loading: {
        backgroundColor: "#FF3300",
        height: "2px",
      },
    },
  },
})
const download = (url: string, params: any, method = "post"): Promise<any> => {
  return new Promise<void>((resolve, reject) => {
    loadingBar.start()
    if (method === "post" || method === "POST") {
      Request.downloadBlob(url, params)
        .then((res: any) => {
          if (res.status === 200) {
            const blob = new Blob([res.data])
            const downloadElement = document.createElement("a")
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = window.decodeURI(
              res.headers["content-disposition"].split("=")[1]
            )
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement)
            window.URL.revokeObjectURL(href)
            resolve()
          }
          loadingBar.finish()
          // loadingInstance.close()
        })
        .catch(() => {
          reject()
          loadingBar.finish()
          // loadingInstance.close()
        })
    } else if (method === "get" || method === "GET") {
      Request.downloadBlobGet(url, params)
        .then((res: any) => {
          if (res.status === 200) {
            const blob = new Blob([res.data])
            const downloadElement = document.createElement("a")
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = window.decodeURI(
              res.headers["content-disposition"].split("=")[1]
            )
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement)
            window.URL.revokeObjectURL(href)
            resolve()
          }
          // loadingInstance.close()
        })
        .catch(() => {
          reject()
          // loadingInstance.close()
        })
    }
  })
}
export default download
