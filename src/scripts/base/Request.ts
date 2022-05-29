import _ from 'lodash'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Singleton from '@/scripts/base/Singleton'
import { UserModule } from '@/store/modules/User'
import { Message, MessageBox } from 'element-ui'

export default class Request extends Singleton {
  private axiosInstance: AxiosInstance

  constructor() {
    super()

    const baseURL = _.get(process.env, 'VUE_APP_API')

    if (!baseURL) {
      throw new Error('baseURL 获取失败')
    }

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${UserModule.token}`
      }
    })

    this.axiosInstance.interceptors.response.use((config) => {
      const code = _.get(config.data, 'code', 1)
      if (code === 1) {
        const message = _.get(config.data, 'message', 'Error')
        Message.error(message)
        return Promise.reject(new Error(message))
      }

      return config.data
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
