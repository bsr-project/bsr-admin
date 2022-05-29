<template>
  <Container v-loading="loading" :query.sync="query" :pagination.sync="pagination">
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
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Container from '@/components/Container/index.vue'

import UserListApi from '@/api/User/List'

@Component({
  name: 'UserList',
  components: {
    Container
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

  EditUser(row: any) {
    console.log(row)
  }
}
</script>
