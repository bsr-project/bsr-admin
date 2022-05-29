<template>
  <el-pagination :background="true" :current-page.sync="currentPage" :page-size.sync="pageSize" :pager-count="7"
    :layout="layout" :page-sizes="[10, 20, 30, 50, 100, 150, 300, 400, 500]" :total="total" v-bind="$attrs"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'Pagination'
})
export default class Pagination extends Vue {
  @Prop({ required: false, type: String, default: 'total, sizes, prev, pager, next, jumper' }) layout!: string
  @Prop({ required: true, type: Number }) page!: number
  @Prop({ required: true, type: Number }) limit!: number
  @Prop({ required: true, type: Number }) total!: number

  set currentPage(page) {
    this.$emit('update:page', page)
  }

  get currentPage() {
    return this.page
  }

  set pageSize(limit) {
    this.$emit('update:limit', limit)
  }

  get pageSize() {
    return this.limit
  }

  handleSizeChange(value: number) {
    //每页条数
    this.$emit('pagination', {
      type: 1,
      value
    })
  }

  handleCurrentChange(value: number) {
    //第几页
    this.$emit('pagination', {
      type: 2,
      value
    })
  }

}
</script>