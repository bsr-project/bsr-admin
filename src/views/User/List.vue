<template>
  <Container v-loading="loading" :query.sync="query" :pagination.sync="pagination">
    <template #header>
      <div>
        <el-button type="success" @click="CreateUser">新增</el-button>
      </div>
    </template>

    <el-table :data="list" border>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="realname" label="姓名" width="100"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="bsr_code" label="蓝天编号"></el-table-column>
      <el-table-column prop="car_number" label="车牌号"></el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" @click="EditUser(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UpdateUser :visible.sync="updateUser.visible" :type="updateUser.type" :data="updateUser.data"
      @reload="GetUserList"></UpdateUser>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Container from '@/components/Container/index.vue'
import UpdateUser from './components/UpdateUser.vue'

import UserListApi from '@/api/User/List'
import { UPDATE_DRAWER_TYPE } from '@/enums/UpdateDrawer'

@Component({
  name: 'UserList',
  components: {
    Container,
    UpdateUser
  }
})
export default class UserList extends Vue {

  list: any[] = []

  loading = false

  query = {
    page: 1,
    limit: 30
  }

  pagination = {
    total: 0
  }

  updateUser: {
    visible: boolean
    type: UPDATE_DRAWER_TYPE
    data: Record<string, any>
  } = {
      visible: false,
      type: UPDATE_DRAWER_TYPE.CREATE,
      data: {}
    }

  created() {
    this.GetUserList()
  }

  async GetUserList() {
    this.loading = true

    const users = await UserListApi.Instance().GetUsers()

    this.pagination.total = users.count
    this.list = users.lists

    this.loading = false
  }

  CreateUser() {
    this.updateUser.type = UPDATE_DRAWER_TYPE.CREATE
    this.updateUser.visible = true
  }

  EditUser(row: any) {
    this.updateUser.type = UPDATE_DRAWER_TYPE.EDIT
    this.updateUser.data = row
    this.updateUser.visible = true
  }
}
</script>
