<style lang="scss" scoped>
::v-deep .el-dialog {

  display: flex;
  flex-direction: column;

  .el-dialog__body {
    flex: 1;
  }
}

.mission-viewer-container {
  height: 100%;

  .mission-viewer-body {
    padding: 10px;

    font-size: 16px;
    border-radius: 5px;
    background-color: #f9f9f9;

    flex: 1;

    &>div {
      &:nth-child(1) {
        width: 30%;
      }

      &:nth-child(2) {
        width: 70%;
      }
    }
  }

  .join-mission-table {
    .el-table {
      width: 100%;
    }
  }
}

.mission-content {
  margin: 10px;
  height: 200px;

  border-radius: 5px;
  background-color: #f0f0f0;

  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .mission-content-inner {
    padding: 10px;
    white-space: pre-line;
  }
}
</style>

<template>
  <el-dialog title="任务详情" :visible="visible" fullscreen @close="$emit('update:visible', false)">
    <div class="mission-viewer-container flexCol">
      <div class="mission-viewer-header flexBC">
        <div></div>
        <div>
          <el-button type="success" @click="ExportExcel">导出表格</el-button>
        </div>
      </div>
      <div class="mission-viewer-body flexB_ mt-20">
        <div>
          <p>任务标题：{{ data.title }}</p>
          <p>任务内容：</p>
          <el-scrollbar class="mission-content">
            <div class="mission-content-inner">
              {{ data.content }}
            </div>
          </el-scrollbar>
        </div>
        <div class="join-mission-table">
          <el-table :data="list" border>
            <el-table-column label="编号" width="50">
              <template #default="{ $index }">{{ $index + 1 }}</template>
            </el-table-column>
            <el-table-column label="姓名" prop="user_id.realname" width="100"></el-table-column>
            <el-table-column label="蓝天编号" prop="user_id.bsr_code" width="120"></el-table-column>
            <el-table-column v-if="HasSubmission()" label="子任务" width="200">
              <template #default="{ row }">
                <p v-for="submission in GetMission(row.submission_id)" :key="submission"></p>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag v-show="row.status === 0">已签到</el-tag>
                <el-tag v-show="row.status === 1" type="success">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="签到时间" min-width="100">
              <template #default="{ row }">{{ GetTime(row.sign_in_time) }}</template>
            </el-table-column>
            <el-table-column label="签到交通工具" min-width="100">
              <template #default="{ row }">{{ GetVehicle(row.sign_in_vehicle, row.sign_in_custom_vehicle) }}</template>
            </el-table-column>
            <el-table-column label="签退时间" min-width="100">
              <template #default="{ row }">{{ GetTime(row.sign_out_time) }}</template>
            </el-table-column>
            <el-table-column label="签退交通工具" min-width="100">
              <template #default="{ row }">{{ GetVehicle(row.sign_out_vehicle, row.sign_out_custom_vehicle)
              }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import JoinMissionListApi from '@/api/JoinMission/List'
import { VEHICLE } from '@/enums/JoinMission'
import Excel from '@/utils/Excel'
import _ from 'lodash'
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { GetExcelTemplateData } from './ExcelTemplate'

@Component({
  name: 'UpdateMission'
})
export default class UpdateMission extends Vue {
  @Prop({ required: true, type: Boolean }) visible!: boolean
  @Prop({ required: true, type: Object }) data!: Record<string, any>

  list: any[] = []

  vehicleOptions: Record<number, string> = {
    [VEHICLE.CUSTOM]: '自定义',
    [VEHICLE.DRIVE]: '开车',
    [VEHICLE.WALK]: '步行',
    [VEHICLE.BIKE]: '骑车',
    [VEHICLE.TAXI]: '打车',
    [VEHICLE.METRO]: '乘地铁',
    [VEHICLE.BUS]: '乘公交',
  }

  VEHICLE = VEHICLE

  @Watch('visible')
  async visibleChanged() {
    if (this.visible) {
      this.list = await JoinMissionListApi.Instance().GetJoinMissions(this.data.mission_id)

      console.log(this.data)

      console.log(_.cloneDeep(this.list))
    } else {
      this.list = []
    }
  }

  /**
   * 是否有子任务
   */
  HasSubmission() {
    return _.get(this.data, 'children.length', 0) > 0
  }

  GetTime(date: string | null) {
    return date ? moment(date).format('HH:mm') : ''
  }

  GetVehicle(vehicle: number, custom_vehicle: string) {
    return vehicle === VEHICLE.CUSTOM ? custom_vehicle : _.get(this.vehicleOptions, vehicle, '鬼知道他怎么来的')
  }

  GetMission(submission_id: string) {
    const ids = _.split(submission_id, ',').map(id => _.parseInt(id))
    return _.isArray(ids) ? ids : []
  }

  ExportExcel() {
    const excel = new Excel()
    const template = GetExcelTemplateData({
      content: '核酸检测任务 07:30-11:00 13:00-17:00',
      action_time: moment().format('YYYY年MM月DD日'),
      location: 'XX街道XX号'
    })

    console.log(_.cloneDeep(template.data))

    excel
      .SetData(_.concat(template.data, [
        ['1', '5/3', '张三', '浙A0000', '开车', '1', '1', '浙A12345', '06:20', '17:20', '10']
      ]))
      .SetMerges(template.merges)
      .SetCols(template.cols)
      .Download('测试表格.xlsx')
  }
}
</script>