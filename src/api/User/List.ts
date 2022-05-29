import Request from '@/scripts/base/Request'

export default class UserListApi extends Request {
  GetUsers() {
    return this.request({
      url: '/user',
      method: 'GET'
    })
  }
}
