import { LOCAL_STORAGE_KEY } from '@/enums/LocalStroage'
import Singleton from '@/scripts/base/Singleton'
import _ from 'lodash'

export default class LocalStorageUtil extends Singleton {
  get(key: LOCAL_STORAGE_KEY, defaultValue: string | null = null) {
    const value = localStorage.getItem(this.getKey(key))

    if (value) {
      try {
        if (/^[{[]/.test(value)) {
          return JSON.parse(value)
        }

        return value
      } catch (e) {
        console.error(e)
      }
    }

    return defaultValue
  }

  set(key: LOCAL_STORAGE_KEY, value: string): void
  set(key: LOCAL_STORAGE_KEY, value: Record<string, any>): void
  set(key: LOCAL_STORAGE_KEY, value: any): void {
    if (_.isObjectLike(value)) {
      try {
        JSON.stringify(value)
        localStorage.setItem(this.getKey(key), value)
      } catch (e) {
        console.error(e)
      }

      return
    }

    localStorage.setItem(this.getKey(key), value)
  }

  private getKey(key: LOCAL_STORAGE_KEY) {
    return `ls_${key}`
  }
}
