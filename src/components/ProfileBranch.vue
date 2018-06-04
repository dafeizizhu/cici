<template>
  <section>
    <el-form ref='form' label-width='200px' :model='userBranchInfo' :rules='rules'>
      <el-form-item label='项目'>
        <el-input :value='userBranchInfo.branchInfo.projectInfo.name' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='分支'>
        <el-input :value='userBranchInfo.branchInfo.name' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='地址'>
        <el-input :value='userBranchInfo.branchInfo.vcsUri' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='版本控制类型'>
        <el-input :value='userBranchInfo.branchInfo.vcsType.name' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='版本控制账号' prop='vcsInfo.id'>
        <el-select v-model='userBranchInfo.vcsInfo.id'>
          <el-option
            v-for='vcsInfo in vcsInfoList'
            :label='vcsInfo.description'
            :value='vcsInfo.id'
            :key='"vcsInfo_" + vcsInfo.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveProfileBranch'>保存</el-button>
        <el-button @click='$router.go(-1)'>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'profileBranch'

export default {
  asyncData ({ store, route, session }) {
    return store.dispatch(`${NS}/findProfileBranch`, {
      session,
      branchId: route.query.branchId
    })
  },
  data () {
    return {
      rules: {
        'vcsInfo.id': [{ required: true, message: '请选择版本控制', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    session: state => state.session,
    vcsInfoList: state => state.vcsInfoList,
    userBranchInfo: state => state.userBranchInfo
  }),
  methods: {
    saveProfileBranch () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          return this.$store.dispatch(`${NS}/saveProfileBranch`, {
            session: this.session,
            userBranchInfo: JSON.parse(JSON.stringify(this.userBranchInfo))
          }).then(_ => {
            loadingInstance.close()
            this.$alert('保存成功').then(_ => this.$router.push({ path: '/branches' }))
          }).catch(error => {
            loadingInstance.close()
            this.$alert(`保存失败：${error.message}`)
          })
        }
      })
    }
  }
}
</script>
