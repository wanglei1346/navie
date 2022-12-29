import Request from "../axios/request"

export default class Verify {
  public static authorize(params: any) {
    return Request.getRequest("/oauth2/authorize", params)
  }
}
