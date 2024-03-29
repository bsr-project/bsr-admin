import _ from 'lodash'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Singleton from '@/scripts/base/Singleton'
import { UserModule } from '@/store/modules/User'
import { Message } from 'element-ui'
import router from '@/router'

export default class Request extends Singleton {
  private axiosInstance: AxiosInstance

  constructor() {
    super()

    const baseURL = _.get(process.env, 'VUE_APP_API')

    if (!baseURL) {
      throw new Error('baseURL 获取失败')
    }

    this.axiosInstance = axios.create({
      baseURL
    })

    this.axiosInstance.interceptors.request.use((request) => {
      // 每次请求都要设置 token
      request.headers = {
        Authorization: `Bearer ${UserModule.token}`
      }

      return request
    })

    this.axiosInstance.interceptors.response.use((response) => {
      const code = _.get(response.data, 'code', 1)

      if (code === 0) return response.data

      const message = _.get(response.data, 'message', 'Error')
      // 提示消息
      Message.error(message)

      // 做相应的错误处理
      // 不等于 0 则为失败响应
      switch (code) {
        // 登录失效
        case 1001: {
          UserModule.ClearToken()
          router.push('/login')
          break
        }
      }

      return Promise.reject(new Error(message))
    })
  }

  protected async request(options: AxiosRequestConfig): Promise<any> {
    const response = await this.axiosInstance({
      method: options.method,
      url: options.url,
      params: options.params,
      data: options.data
    })

    return response.data
  }
}
