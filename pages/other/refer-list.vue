<template>
    <Empty v-if="showEmpty" :empty-text="emptyText">
        <nuxt-link v-if="!this.$auth.user.job" to="/job/add">
            <el-button type="primary" size="small" round>发布内推职位</el-button>
        </nuxt-link>
    </Empty>
    <div v-else>
        <el-table :data="refers" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="姓名" width="180"/>
            <el-table-column prop="createdAt" label="提交日期" width="180">
                <template slot-scope="scope">
                    {{getCreatedAt(scope.row.createdAt)}}
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column label="经验">
                <template slot-scope="scope">
                    <span>{{getLevel(scope.row.experience)}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <nuxt-link tag="span" :to="`/other/refer/${scope.row.referId}`">
                        <el-link type="primary">查看</el-link>
                    </nuxt-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination
                hide-on-single-page
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'nuxt-property-decorator'
  import dayjs from 'dayjs'
  import {LEVEL_MAPPER} from '~/constants/level'
  import {DATETIME_FORMAT} from '~/constants/format'
  import Empty from '~/components/Empty.vue'

  @Component({
    components: {Empty}
  })
  export default class extends Vue {
    refers: TRefer[] = []
    page: number = 1
    limit: number = 10
    total: number = 0
    loading = true
    showEmpty = false

    get emptyText() {
      return !this.$auth.user.job ? '还没有发布内推职位哦~' : '还没有人申请内推哦~'
    }

    mounted() {
      this.loadOtherReferList(this.page)
    }

    getLevel(experience: number) {
      return LEVEL_MAPPER[experience]
    }

    getCreatedAt(createdAt: string) {
      return dayjs(createdAt).format(DATETIME_FORMAT)
    }

    async loadOtherReferList(page: number) {
      this.loading = true
      const data = await this.$axios.$get('/refers', {
        params: {role: 'other', page, limit: this.limit}
      })
      this.loading = false

      this.refers = data.referList as TRefer[]
      this.total = data.total

      this.showEmpty = (this.total === 0)
    }

    @Watch('page')
    onPageChange(page: number) {
      this.loadOtherReferList(page)
    }
  }
</script>

<style scoped lang="scss">
    .pages {
        text-align: center;
        padding: 20px 0;
    }
</style>
