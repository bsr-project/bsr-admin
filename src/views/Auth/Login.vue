<template>
  <div>
    <el-input v-model="username"></el-input>
    <el-input v-model="password"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/User'

@Component
export default class AuthLogin extends Vue {
  username = 'admin'
  password = '111111'

  async login() {
    const res = await UserModule.Login({
      username: this.username,
      password: this.password
    })

    console.log(res)
  }
}
</script>