<template>
  <section>
    <el-row>
      <h1>分支：{{ branchInfo.name }}  <el-button @click='fetchCommits(branchInfo.id)'>更新</el-button></h1>
    </el-row>
    <el-row>
      <el-table :data='commitInfoList' style='width: 100%'>
        <el-table-column prop='key' label='标识' min-width='100'></el-table-column>
        <el-table-column prop='author' label='作者' min-width='100'></el-table-column>
        <el-table-column prop='message' label='注释' min-width='100'></el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'commits'

export default {
  asyncData ({ store, route, session }) {
    return store.dispatch(`${NS}/findCommits`, {
      session,
      branchId: route.query.branchId
    })
  },
  computed: mapState(NS, {
    session: state => state.session,
    branchInfo: state => state.branchInfo,
    commitInfoList: state => state.commitInfoList
  }),
  methods: {
    fetchCommits (branchId) {
      let loadingInstance = this.$loading()
      this.$store.dispatch(`${NS}/fetchCommits`, {
        session: this.session,
        branchId
      }).then(_ => {
        loadingInstance.close()
        this.$alert('更新完成').then(_ => global.location.reload())
      }).catch(error => {
        loadingInstance.close()
        this.$alert(`更新失败：${error.message}`)
      })
    }
  }
}

</script>
