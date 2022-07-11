<template>
  <Container v-loading="loading" :pagination.sync="pagination" @pagination="GetUserList">
    <template #header>
      <div>
        <el-row>
          <el-col :span="4">
            <el-input v-model="query.realname" placeholder="真实姓名" @keypress.native.enter="GetUserList"></el-input>
          </el-col>

          <el-col :span="4" class="ml-10">
            <el-button type="primary" @click="GetUserList">搜索</el-button>
            <el-button type="success" @click="CreateUser">新增</el-button>
          </el-col>
        </el-row>
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

  pagination = {
    page: 1,
    limit: 20,
    total: 0
  }

  query = {
    realname: ''
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

    const users = await UserListApi.Instance().GetUsers({
      page: this.pagination.page,
      limit: this.pagination.limit,
      ...this.query
    })

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
