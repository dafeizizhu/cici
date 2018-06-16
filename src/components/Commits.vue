<template>
  <section>
    <el-row>
      <h1>分支：{{ branchInfo.name }}  <el-button>更新</el-button></h1>
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
  })
}

</script>
