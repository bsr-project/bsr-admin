<style lang="scss" scoped>
.el-input {
  width: 200px;
}
</style>

<template>
  <div class="flexCC">
    <div>
      <el-form label-width="100">
        <el-form-item label="用户名">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/User'

@Component
export default class AuthLogin extends Vue {
  username = ''
  password = ''

  async login() {
    if (this.username === '' || this.password === '') {
      this.$message.error('请输入用户名和密码')
      return
    }

    await UserModule.Login({
      username: this.username,
      password: this.password
    })
  }
}
</script>