<style lang="scss" scoped>
.sub-mission {
  height: 100%;

  display: flex;
  flex-direction: column;

  ::v-deep {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }

  .el-scrollbar {
    height: calc(100vh - 400px);

    ::v-deep {
      .el-scrollbar__view {
        padding: 0 20px;
      }

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }

  .sub-mission-item {
    margin-top: 20px;

    .el-form-item {
      display: flex;

      ::v-deep {
        .el-form-item__content {
          width: 100%;
        }
      }
    }
  }

  .sub-mission-label {
    position: relative;

    .add-mission {
      position: absolute;
      top: 0;
      right: -372px;
    }
  }
}
</style>

<template>
  <el-drawer title="任务" :visible="visible" direction="rtl" size="500px" @close="$emit('update:visible', false)">
    <div class="drawer-container">
      <el-form :data="query" label-width="100px" class="flexCol h100">
        <el-form-item label="任务标题">
          <el-input v-model="query.title"></el-input>
        </el-form-item>

        <el-form-item label="任务内容">
          <el-input v-model="query.content" type="textarea" rows="3"></el-input>
        </el-form-item>

        <el-form-item label="任务日期">
          <el-date-picker v-model="actionDate" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
            :picker-options="actionDateOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="任务时间">
          <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="子任务" class="sub-mission">
          <el-scrollbar>
            <el-card v-for="(mission, index) in subMissionList" :key="index" class="sub-mission-item">
              <div class="flexBC mb-10">
                <div></div>
                <div>
                  <el-button type="danger" icon="el-icon-delete" round @click="deleteSubMission(index)">删除</el-button>
                </div>
              </div>

              <el-form-item label="子任务标题" label-width="120px">
                <el-input v-model="mission.title"></el-input>
              </el-form-item>

              <el-form-item label="子任务时间" label-width="120px">
                <el-date-picker v-model="mission.date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-card>
            <div class="flexCC mt-10">
              <el-button type="primary" @click="createSubMission">创建子任务</el-button>
            </div>
          </el-scrollbar>
        </el-form-item>
      </el-form>
    </div>

    <div class="drawer-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import MissionListApi from '@/api/Mission/List'
import { UPDATE_DRAWER_TYPE } from '@/enums/UpdateDrawer'
import _ from 'lodash'
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { SubMissionQueryData, SubMissionChildrenQueryData, SubMissionEditQueryData, CreateMissionQueryData, MissionQueryData } from '../List'

@Component({
  name: 'UpdateMission'
})
export default class UpdateMission extends Vue {
  @Prop({ required: true, type: Boolean }) visible!: boolean
  @Prop({ required: true, type: Number }) type!: UPDATE_DRAWER_TYPE
  @Prop({ required: true, type: Object }) data!: Record<string, any>

  @Watch('visible')
  visibleChanged() {
    if (this.visible) {
      // 创建
      if (this.type === UPDATE_DRAWER_TYPE.CREATE) {
        this.resetForm()

        this.actionDate = moment().format('YYYY-MM-DD')
      } else {
        this.query.mission_id = this.data.mission_id
        this.query.mission_pid = this.data.mission_pid
        this.query.title = this.data.title
        this.query.content = this.data.content
        _.forEach(this.data.children as SubMissionEditQueryData[], mission => {
          if (!mission.date) {
            this.$set(mission, 'date', [mission.start_time, mission.end_time])
          }

          this.subMissionList.push(mission)
        })
        this.actionDate = this.data.action_date
        this.date = [this.data.start_time, this.data.end_time]
      }


    } else {
      this.resetForm()
    }
  }

  query: SubMissionChildrenQueryData = {
    mission_id: 0,
    mission_pid: 0,
    title: '',
    content: '',
    action_date: '',
    start_time: '',
    end_time: '',
    children: {
      create: [],
      update: [],
      delete: []
    }
  }

  subMissionList: SubMissionEditQueryData[] = []

  date: string[] = []
  actionDate = ''

  actionDateOptions = {
    shortcuts: [{
      text: '今儿',
      onClick(picker: any) {
        picker.$emit('pick', moment().format('YYYY-MM-DD'));
      }
    }, {
      text: '明儿',
      onClick(picker: any) {
        picker.$emit('pick', moment().add(1, 'day').format('YYYY-MM-DD'));
      }
    }, {
      text: '后天',
      onClick(picker: any) {
        picker.$emit('pick', moment().add(2, 'days').format('YYYY-MM-DD'));
      }
    }]

  }

  resetForm() {
    this.subMissionList = []
    this.actionDate = ''
    this.date = []
    this.query = {
      mission_id: 0,
      mission_pid: 0,
      title: '',
      content: '',
      action_date: '',
      start_time: '',
      end_time: '',
      children: {
        create: [],
        update: [],
        delete: []
      }
    }
  }

  createSubMission() {
    this.subMissionList.push({
      mission_pid: this.data.mission_id,
      title: '',
      start_time: '',
      end_time: ''
    })
  }

  deleteSubMission(index: number) {
    const mission = this.subMissionList[index]
    if (_.has(mission, 'mission_id')) {
      this.query.children.delete.push(mission.mission_id!)
    }

    this.subMissionList.splice(index, 1)
  }

  async submit() {

    this.query.start_time = _.get(this.date, '0', '')
    this.query.end_time = _.get(this.date, '1', '')

    this.query.action_date = this.actionDate

    if (this.type === UPDATE_DRAWER_TYPE.CREATE) {
      const query: CreateMissionQueryData = {
        title: this.query.title,
        content: this.query.content,
        action_date: this.query.action_date,
        start_time: this.query.start_time,
        end_time: this.query.end_time,
        children: []
      }

      _.forEach(this.subMissionList, item => {
        query.children.push({
          title: item.title,
          start_time: _.get(item.date, '0', ''),
          end_time: _.get(item.date, '1', '')
        })
      })

      await MissionListApi.Instance().CreateMission(query)

      this.$message.success('新增成功')
    } else {
      this.query.children.create = []
      this.query.children.update = []

      const subMissionList = _.cloneDeep(this.subMissionList)

      _.forEach(subMissionList, item => {
        item.start_time = _.get(item, 'date.0', '')
        item.end_time = _.get(item, 'date.1', '')

        delete item.date

        if (_.has(item, 'mission_id')) {
          this.query.children.update.push(item as SubMissionQueryData)
        } else {
          this.query.children.create.push(item)
        }
      })

      await MissionListApi.Instance().UpdateMission(this.query)

      this.$message.success('修改成功')
    }

    this.$emit('reload')
    this.$emit('update:visible', false)
  }
}
</script>