<style lang="scss" scoped>
.el-header {
  background-color: #0193dc;
}

.el-main {
  padding: 10px;
}

.main-container {
  background-color: #f0f0f0;
}
</style>

<template>
  <el-container class="h100">
    <el-header>
      <div class="flexC h100">
        <a href="/" class="flexC cl-white">
          <i class="el-icon-s-tools fs-30"></i>
          <div class="ml-10 fs-20">bsr-admin</div>
        </a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
          <el-menu-item v-for="menu in menuList" :key="menu.name" :index="menu.path">
            <i v-if="menu.meta && menu.meta.icon" :class="menu.meta.icon"></i>
            <span slot="title">{{ menu.meta && menu.meta.title ? menu.meta.title : menu.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-container">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import List from '@/components/MenuList/List.vue'

import { routes } from '@/router'
import { RouteConfig } from 'vue-router'
import { UserModule } from './store/modules/User'

@Component({
  name: 'App',
  components: {
    List
  }
})
export default class App extends Vue {

  get token() {
    return UserModule.getters?.token
  }

  public menuList: RouteConfig[] = routes
}
</script>
