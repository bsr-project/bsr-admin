<template>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>导航一</span>
    </template>

    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
  </el-submenu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

@Component({
  name: 'Menu'
})
export default class Menu extends Vue {
  @Prop({ required: true, type: Array }) menu!: RouteConfig[]

  created() {
    console.log('menu', this.menu)
  }
}
</script>
