import {
  CreateUserParams as CreateUserParams,
  UpdateUserParams as UpdateUserParams
} from '@/enums/User'
import Request from '@/scripts/base/Request'

export default class UserListApi extends Request {
  GetUsers() {
    return this.request({
      url: '/user',
      method: 'GET'
    })
  }

  CreateUser(data: CreateUserParams) {
    return this.request({
      url: '/user',
      method: 'POST',
      data
    })
  }

  UpdateUser(data: UpdateUserParams) {
    return this.request({
      url: `/user/${data.id}`,
      method: 'PATCH',
      data
    })
  }
}
