<style lang="scss" scoped>
.container {
  padding: 10px;

  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: #fff;

  box-sizing: border-box;

  .main {

    margin-top: 10px;

    flex: 1;

    ::v-deep {
      .el-table {
        height: 100%;
      }

      .el-table__body-wrapper {
        height: calc(100% - 36px);
      }
    }
  }

  .footer {
    padding: 0 10px;
    height: 50px;

    border: 1px solid #f0f0f0;
    border-top: none;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <div>
        <slot name="buttons"></slot>
      </div>
      <Pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="query.page"
        :limit.sync="query.limit" @pagination="paginationHandle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'Container',
  components: {
    Pagination
  }
})
export default class Container extends Vue {
  @Prop({
    type: Object, default: () => ({
      total: 0
    })
  }) pagination!: {
    total: number
  }

  @Prop({
    type: Object, default: () => ({
      page: 1,
      limit: 30
    })
  }) query!: {
    page: number
    limit: number
  }

  paginationHandle(pageInfo: any) {
    this.$emit('pagination', pageInfo)
  }
}
</script>