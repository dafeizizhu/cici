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
            <router-link :to='"/project?id=" + scope.row.id'><el-button size='small'>编辑</el-button></router-link>
            <el-button
              type='danger'
              size='small'
              v-if='session.user.id === scope.row.ownerInfo.id'
              @click='deleteProject(scope.row.id, scope.row.name)'>删除</el-button>
            <el-button
              type='danger'
              size='small'
              v-if='session.user.id !== scope.row.ownerInfo.id'
              @click='deleteUserProject(scope.row.id, scope.row.name)'>退出</el-button>
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
    return store.dispatch(`${NS}/findProjects`, { session })
  },
  computed: mapState(NS, {
    session: state => state.session,
    projectInfoList: state => state.projectInfoList
  }),
  methods: {
    deleteProject (id, name) {
      return this.$confirm('确定删除该项目' + name  + '么？')
        .then(_ => {
          let loadingInstance = this.$loading()
          return this.$store.dispatch(`${NS}/deleteProject`, {
            session: this.session,
            projectId: id
          })
          .then(ret => {
            loadingInstance.close()
          })
          .catch(error => {
            loadingInstance.close()
            this.$alert('项目删除失败：' + error.message)
          })
        },  _ => {})
    },
    deleteUserProject (id, name) {
      return this.$confirm('确定退出该项目' + name  + '么？')
        .then(_ => {
          let loadingInstance = this.$loading()
          return this.$store.dispatch(`${NS}/deleteUserProject`, {
            session: this.session,
            projectId: id
          })
          .then(ret => {
            loadingInstance.close()
          })
          .catch(error => {
            loadingInstance.close()
            this.$alert('项目退出失败：' + error.message)
          })
        },  _ => {})
    }
  }
}
</script>
