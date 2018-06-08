<template>
  <section>
    <el-form ref='form' :model='deployInfo' :rules='rules' label-width='200px'>
      <el-form-item label='项目'>
        <el-input :value='deployInfo.projectInfo.name' :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='主分支' prop='mainBranchInfo.id'>
        <el-select v-model='deployInfo.mainBranchInfo.id'>
          <el-option
            v-for='branchInfo in branchInfoList'
            :label='branchInfo.name'
            :value='branchInfo.id'
            :key='"branchInfo_" + branchInfo.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称' prop='name'>
        <el-input v-model='deployInfo.name'></el-input>
      </el-form-item>
      <el-form-item label='描述' prop='description'>
        <el-input v-model='deployInfo.description'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveDeploy'>保存</el-button>
        <el-button @click='$router.go(-1)'>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'deploy'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findDeploy`, {
      session,
      projectId: route.query.projectId,
      deployId: route.query.id
    })
  },
  data () {
    return {
      rules: {
        'mainBranchInfo.id': [{ required: true, message: '请选择主分支', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    session: state => state.session,
    deployInfo: state => state.deployInfo,
    branchInfoList: state => state.branchInfoList
  }),
  methods: {
    saveDeploy () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          this.$store.dispatch(`${NS}/saveDeploy`, {
            session: this.session,
            deployInfo: JSON.parse(JSON.stringify(this.deployInfo))
          }).then(_ => {
            loadingInstance.close()
            this.$alert('保存成功').then(() => this.$router.push({ path: '/project?id=' + this.deployInfo.projectInfo.id }))
          }).catch(error => {
            loadingInstance.close()
            this.$alert('保存失败：' + error.message)
          })
        }
      })
    }
  }
}
</script>
