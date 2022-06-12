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
    height: calc(100vh - 494px);

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
  <el-drawer :title="`${type === UPDATE_DRAWER_TYPE.CREATE ? '创建' : '修改'}用户`" :visible="visible" direction="rtl"
    size="500px" @close="$emit('update:visible', false)">
    <div class="drawer-container">
      <el-form :data="params" label-width="100px" class="flexCol h100">
        <el-form-item label="用户名">
          <el-input v-model="params.username" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="params.realname" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item label="蓝天编号">
          <el-input v-model="params.bsr_code"></el-input>
        </el-form-item>

        <el-form-item label="车牌号">
          <el-input v-model="params.car_number"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="params.mobile"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="params.password" type="password"
            :placeholder="type === UPDATE_DRAWER_TYPE.EDIT ? '不修改请留空' : '必填'"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="drawer-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import UserListApi from '@/api/User/List'
import { UPDATE_DRAWER_TYPE } from '@/enums/UpdateDrawer'
import { CreateUserParams, UpdateUserParams } from '@/enums/User'
import _ from 'lodash'
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

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
      // 编辑 初始值
      if (this.type === UPDATE_DRAWER_TYPE.EDIT) {
        _.forEach(this.data, (value, key) => {
          _.set(this.params, key, value)
        })
      }
    } else {
      this.params = {
        username: '',
        realname: '',
        bsr_code: '',
        car_number: '',
        password: '',
        mobile: ''
      }
    }
  }

  params: CreateUserParams | UpdateUserParams = {
    username: '',
    realname: '',
    bsr_code: '',
    car_number: '',
    password: '',
    mobile: ''
  }

  UPDATE_DRAWER_TYPE = UPDATE_DRAWER_TYPE

  async submit() {
    if (_.trim(this.params.username) === '') {
      this.$message.error('请输入用户名')
      return
    }

    if (_.trim(this.params.realname) === '') {
      this.$message.error('请输入姓名')
      return
    }

    if (this.type === UPDATE_DRAWER_TYPE.CREATE) {
      if (_.trim(this.params.password) === '') {
        this.$message.error('请输入初始密码')
        return
      }

      await UserListApi.Instance().CreateUser(this.params)
      this.$message.success('创建成功')
    } else {
      await UserListApi.Instance().UpdateUser(this.params as UpdateUserParams)
      this.$message.success('修改成功')
    }

    this.$emit('reload')
    this.$emit('update:visible', false)
  }
}
</script>