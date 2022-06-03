<style lang="scss" scoped>
::v-deep .el-dialog {

  display: flex;
  flex-direction: column;

  .el-dialog__body {
    flex: 1;
  }
}

.mission-viewer-container {}
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
      <div>body</div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Excel from '@/utils/Excel'
import _ from 'lodash'
import moment from 'moment'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { GetExcelTemplateData } from './ExcelTemplate'

@Component({
  name: 'UpdateMission'
})
export default class UpdateMission extends Vue {
  @Prop({ required: true, type: Boolean }) visible!: boolean
  @Prop({ required: true, type: Object }) data!: Record<string, any>

  // @Watch('visible')
  // visibleChanged() {

  // }

  // created() {
  // }

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