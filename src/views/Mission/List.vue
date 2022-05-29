<template>
  <Container v-loading="loading" :query.sync="query" :pagination.sync="pagination">

    <template #header>
      <div>
        <el-button type="success" @click="CreateMission">新增</el-button>
      </div>
    </template>

    <el-table :data="list" border>
      <el-table-column prop="title" label="任务标题" width="200"></el-table-column>
      <el-table-column prop="content" label="任务内容" min-width="300"></el-table-column>
      <el-table-column prop="action_date" label="任务日期" width="100"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" min-width="130"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" min-width="130"></el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" @click="ViewMission(row)">查看</el-button>
          <el-button type="primary" @click="EditMission(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UpdateMission :visible.sync="updateDrawer.visible" :type="updateDrawer.type" :data="updateDrawer.data"
      @reload="GetMissionList">
    </UpdateMission>
    <MissionViewer :visible.sync="missionViewer.visible" :data="missionViewer.data"></MissionViewer>
  </Container>
</template>reload

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Container from '@/components/Container/index.vue'
import UpdateMission from './components/UpdateMission.vue'
import MissionViewer from './components/MissionViewer.vue'

import MissionListApi from '@/api/Mission/List'
import { UPDATE_DRAWER_TYPE } from '@/enums/UpdateDrawer'

@Component({
  name: 'UserList',
  components: {
    Container,
    UpdateMission,
    MissionViewer
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

  updateDrawer = {
    visible: false,
    type: UPDATE_DRAWER_TYPE.CREATE,
    data: {}
  }

  missionViewer = {
    visible: false,
    data: {}
  }

  created() {
    this.GetMissionList()
  }

  async GetMissionList() {
    this.loading = true

    const missions = await MissionListApi.Instance().GetMissions()

    this.pagination.total = missions.count
    this.list = missions.lists

    this.loading = false
  }

  CreateMission() {
    this.updateDrawer.type = UPDATE_DRAWER_TYPE.CREATE
    this.updateDrawer.visible = true
  }

  EditMission(row: any) {
    this.updateDrawer.data = row
    this.updateDrawer.type = UPDATE_DRAWER_TYPE.EDIT
    this.updateDrawer.visible = true
  }

  ViewMission(row: any) {
    this.missionViewer.data = row
    this.missionViewer.visible = true
  }
}
</script>
