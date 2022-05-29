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
          <el-button type="success">导出表格</el-button>
        </div>
      </div>
      <div>body</div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'UpdateMission'
})
export default class UpdateMission extends Vue {
  @Prop({ required: true, type: Boolean }) visible!: boolean
  @Prop({ required: true, type: Object }) data!: Record<string, any>

  // @Watch('visible')
  // visibleChanged() {

  // }
}
</script>