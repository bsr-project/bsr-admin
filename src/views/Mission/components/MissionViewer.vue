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

          <el-row class="pl-10 pr-10" :gutter="10">
            <el-form label-width="70px" class="pl-10 pr-10">

              <el-col :span="12">
                <el-form-item label="后台协调">
                  <el-input v-model="tableData.coordinator"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="统计人员">
                  <el-input v-model="tableData.statistician"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="记录整理">
                  <el-input v-model="tableData.finisher"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="信息审核">
                  <el-input v-model="tableData.auditor"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="现场秘书">
                  <el-input v-model="tableData.scene_secretary"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
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
              <template #default="{ row }"> {{ GetVehicle(row.sign_out_vehicle, row.sign_out_custom_vehicle) }}
              </template>
            </el-table-column>
            <el-table-column label="时长统计" width="80">
              <template #default="{ row }"> {{ GetDiffTime(row.sign_in_time, row.sign_out_time) }}
              </template>
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
import { GetExcelTemplateData, TemplateDataArg } from './ExcelTemplate'

@Component({
  name: 'UpdateMission'
})
export default class UpdateMission extends Vue {
  @Prop({ required: true, type: Boolean }) visible!: boolean
  @Prop({ required: true, type: Object }) data!: Record<string, any>

  submissionList: Record<number, {
    title: string
    time: string
  }> = {}

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

  tableData: TemplateDataArg = {
    content: '',
    action_time: '',
    location: '',
    scene_secretary: '',
    coordinator: '',
    auditor: '',
    statistician: '',
    finisher: ''
  }

  @Watch('visible')
  async visibleChanged() {
    if (this.visible) {
      this.list = await JoinMissionListApi.Instance().GetJoinMissions(this.data.mission_id)

      _.forEach(_.get(this.data, 'children', []), submission => {
        this.submissionList[submission.mission_id] = {
          title: submission.title,
          time: `${moment(submission.start_time).format('HH:mm')}-${moment(submission.end_time).format('HH:mm')}`
        }
      })
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

  GetDiffTime(start_time: string, end_time: string) {
    const h = moment(end_time).diff(start_time, 'hours')
    const m = moment(end_time).diff(start_time, 'minutes') - (h * 60)

    // 半小时一算 分大于等于 15 当作半小时
    return `${m >= 45 ? h + 1 : h}${m >= 15 && m < 45 ? '.5' : ''}`
  }

  ExportExcel() {
    const submission = _.values(this.submissionList)
    const submissionTime = submission.length > 0 ? _.map(submission, item => item.time).join(' ') : ''

    this.tableData.content = `${this.data.title} ${submissionTime}`
    this.tableData.action_time = moment(this.data.action_time).format('YYYY年MM月DD日')
    this.tableData.location = this.data.location

    const excel = new Excel()
    const template = GetExcelTemplateData(this.tableData)

    const missionData: any[][] = []
    _.forEach(this.list, (mission, index) => {
      missionData.push([
        // 编号
        `${index + 1}`,
        // 日期
        moment(this.data.action_time).format('M/D'),
        // 信息人
        _.get(mission.user_id, 'realname', '未知用户'),
        // 蓝天编号
        _.get(mission.user_id, 'bsr_code', '未知编号'),
        // 出发交通工具
        this.GetVehicle(_.get(mission, 'sign_in_vehicle', VEHICLE.CUSTOM), _.get(mission, 'sign_in_custom_vehicle')),
        // 返回交通工具
        this.GetVehicle(_.get(mission, 'sign_out_vehicle', VEHICLE.CUSTOM), _.get(mission, 'sign_out_custom_vehicle')),
        // 车辆数
        '1',
        // 人数
        '1',
        // 车牌号 只有开车才会显示车牌号
        _.get(mission, 'sign_in_vehicle') === VEHICLE.DRIVE ||
          _.get(mission, 'sign_out_vehicle') === VEHICLE.DRIVE ?
          _.get(mission.user_id, 'car_number', '未知车牌') : '',
        // 出发时间
        moment(_.get(mission, 'sign_in_time')).format('HH:mm'),
        // 返回时间
        moment(_.get(mission, 'sign_out_time')).format('HH:mm'),
        // 时长统计
        this.GetDiffTime(mission.sign_in_time, mission.sign_out_time)
      ])
    })

    if (missionData.length === 0) {
      this.$message.error('当前任务无参加信息')
      return
    }

    excel
      .SetData(_.concat(template.data, missionData))
      .SetMerges(template.merges)
      .SetCols(template.cols)
      .SetRows(_.concat(template.rows, _.times(missionData.length, () => ({
        hpx: 26
      }))))
      .Download('测试表格.xlsx')
  }
}
</script>
