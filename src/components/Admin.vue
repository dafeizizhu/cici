<template>
  <div>
    <header>
      <h1>项目权限</h1>
    </header>
    <section>
      <el-form ref='form' label-width='200px'>
        <el-form-item label='用户'>
          <el-select :value='userId' @change='changeAdminProjectUser'>
            <el-option
              v-for='userInfo in userInfoList'
              :label='userInfo.name'
              :value='userInfo.id'
              :key='"user_" + userInfo.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='项目'>
          <el-transfer
            v-model='projectTransfer.model'
            :data='projectTransfer.data'
            :titles='["没权限的项目", "有权限的项目"]'>
          </el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click='saveAdminProject'>保存</el-button>
          <el-button @click='$router.go(-1)'>取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<style>
.el-transfer-panel {
  width: 400px;
}
</style>

<script>

import { mapState } from 'vuex'

const NS = 'admin'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findAdmin`, { session })
  },
  computed: mapState(NS, {
    session: state => state.session,
    userId: state => state.userId,
    userInfoList: state => state.userInfoList,
    ownedProjectInfoList: state => state.ownedProjectInfoList,
    projectInfoList: state => state.projectInfoList,
    projectTransfer: state => state.projectTransfer
  }),
  methods: {
    saveAdminProject () {
      let ownedProjectIdList = this.ownedProjectInfoList
        .map(projectInfo => projectInfo.id)
      let projectIdList = this.projectTransfer.model
        .filter(id => ownedProjectIdList.indexOf(id) < 0)
      let userId = this.userId
      let session = this.session

      let loadingInstance = this.$loading()
      this.$store.dispatch(`${NS}/saveAdminProject`, { userId, projectIdList, session })
        .then(ret => {
          loadingInstance.close()
          this.$alert('项目权限保存成功')
        })
    },
    changeAdminProjectUser (newUserId) {
      return this.$store.dispatch(`${NS}/changeAdminProjectUser`, { 
        userId: newUserId,
        session: this.session
      })
    }
  }
}
</script>
