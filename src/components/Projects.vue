<template>
  <section>
    <el-row>
      <router-link to='/project'>
        <el-button icon='el-icon-plus'>新增</el-button>
      </router-link>
    </el-row>
    <el-row>
      <el-table :data='projectInfoList' style='width: 100%'>
        <el-table-column prop='name' label='名称' min-width='200'></el-table-column>
        <el-table-column prop='description' label='描述' min-width='400'></el-table-column>
        <el-table-column prop='ownerInfo.name' label='所有者' min-width='200'></el-table-column>
        <el-table-column fixed='right' label='操作' min-width='200'>
          <template slot-scope='scope'>
            <el-button size='small'>编辑</el-button>
            <el-button type='danger' size='small'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'projects'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findProjects`, { userId: session.user.id })
  },
  computed: mapState(NS, {
    projectInfoList: state => state.projectInfoList
  })
}
</script>
