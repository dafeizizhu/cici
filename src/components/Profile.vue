<template>
  <section>
    <el-form ref='form' label-width='200px'>
      <el-form-item label='用户名'>
        <el-input v-model='userInfo.name' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='YYUID'>
        <el-input v-model='userInfo.yyuid' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='描述'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='版本控制登陆信息'>
        <router-link to='/profileVCS'><el-button type='primary'>新增版本控制信息</el-button></router-link>
        <el-table :data='vcsInfoList' style='width: 100%'>
          <el-table-column prop='type.name' label='类型' min-width='200'></el-table-column>
          <el-table-column prop='description' label='描述' min-width='400'></el-table-column>
          <el-table-column prop='username' label='用户名' min-width='200'></el-table-column>
          <el-table-column fix='right' label='操作' min-width='200'>
            <template slot-scope='scope'>
              <router-link :to='"/profileVCS?id=" + scope.row.id'>
                <el-button size='small'>编辑</el-button>
              </router-link>
              <el-button type='danger' size='small' @click='removeVCS(scope.row.id)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveProfile'>保存</el-button>
        <el-button @click='$router.go(-1)'>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'profile'

export default {
  asyncData({ store, session, route }) {
    return store.dispatch(`${NS}/findProfile`, { session })
  },
  computed: mapState(NS, {
    session: state => state.session,
    vcsTypes: state => state.vcsTypes,
    userInfo: state => state.userInfo,
    vcsInfoList: state => state.vcsInfoList,
    projectInfoList: state => state.projectInfoList
  }),
  methods: {
    removeVCS (vcsId) {
      this.$confirm('确定删除？')
        .then(_ => {
          let loadingInstance = this.$loading()
          return this.$store.dispatch(`${NS}/removeVCS`, {
            session: this.session,
            vcsId
          }).then(_ => {
            loadingInstance.close()
          }).catch(error => {
            loadingInstance.close()
            this.$alert('删除失败：' + error.message)
          })
        }, _ => {})
    },
    saveProfile () {
      this.$store.dispatch(`${NS}/saveProfile`).then(() => console.info('done!'))
    }
  }
}
</script>
