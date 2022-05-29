import Request from '@/scripts/base/Request'

export default class AuthApi extends Request {
  GetUserInfo() {
    return this.request({
      url: '/auth/admin/info',
      method: 'GET'
    })
  }

  Login(data: { username: string; password: string }) {
    return this.request({
      url: '/auth/admin/login',
      method: 'POST',
      data
    })
  }
}
