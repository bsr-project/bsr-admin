import { LOCAL_STORAGE_KEY } from '@/enums/LocalStroage'
import LocalStorageUtil from '@/utils/LocalStorage'
import router from './index'

const whiteList = ['/login']

router.beforeEach(async (to, form, next) => {
  const token = LocalStorageUtil.Instance().get(LOCAL_STORAGE_KEY.TOKEN)

  // 有 token
  if (token) {
    // 进入 login 页面 跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    console.log('无 token')
    // 不验证 token
    if (~whiteList.indexOf(to.path)) {
      next()
    } else {
      // 没 token 跳转到 login
      next({ path: '/login' })
    }
  }
})
