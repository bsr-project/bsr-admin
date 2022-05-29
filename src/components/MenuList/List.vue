<template>
  <el-menu>
    <Menu v-for="menu in menuList" :key="menu.path" :menu="menu"></Menu>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Menu from './Menu.vue'

import { routes } from '@/router'
import { RouteConfig } from 'vue-router'

@Component({
  name: 'List',
  components: {
    Menu
  }
})
export default class List extends Vue {
  @Prop({ required: true, type: Array }) menuList!: RouteConfig[]

  created() {
    console.log(routes)
  }
}
</script>
