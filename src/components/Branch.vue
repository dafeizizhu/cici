<template>
  <section>
    <el-form ref='form' label-width='200px' :model='branchInfo' :rules='rules'>
      <el-form-item label='项目' prop='projectId'>
        <el-select v-model='branchInfo.projectId'>
          <el-option 
            v-for='projectInfo in projectInfoList' 
            :label='projectInfo.name' 
            :value='projectInfo.id' 
            :key='"project_" + projectInfo.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='版本控制登陆信息' prop='vcsId'>
        <el-select v-model='branchInfo.vcsId'>
          <el-option
            v-for='vcsInfo in vcsInfoList'
            :label='vcsInfo.type.name + ":" + vcsInfo.description'
            :value='vcsInfo.id'
            :key='"vcs_" + vcsInfo.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称' prop='name'>
        <el-input v-model='branchInfo.name'></el-input>
      </el-form-item>
      <el-form-item label='描述' prop='description'>
        <el-input v-model='branchInfo.description'></el-input>
      </el-form-item>
      <el-form-item label='版本控制类型' prop='vcsType'>
        <el-select placeholder='请选择版本控制类型' v-model='branchInfo.vcsType.value'> 
          <el-option
            v-for='vcsType in vcsTypes'
            :label='vcsType.name'
            :value='vcsType.value'
            :key='"vcsType_" + vcsType.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='版本控制仓库' prop='vcsUri'>
        <el-input v-model='branchInfo.vcsUri'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveBranch'>保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'branch'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findBranch`, {
      branchId: route.query.id,
      userId: session.user.id
    })
  },
  data () {
    return {
      rules: {
        projectId: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        vcsType: [{ required: true, message: '请选择版本控制类型', trigger: 'blur' }],
        vcsUri: [{ required: true, message: '请输入版本控制仓库地址', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    vcsTypes: state => state.vcsTypes,
    branchInfo: state => state.branchInfo,
    projectInfoList: state => state.projectInfoList,
    vcsInfoList: state => state.vcsInfoList
  }),
  methods: {
    saveBranch () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          this.$store.dispatch(`${NS}/saveBranch`, {
            userId: this.$store.state.session.user.id,
            branchInfo: JSON.parse(JSON.stringify(this.branchInfo))
          }).then(ret => {
            loadingInstance.close()
            this.$alert('分支保存成功').then(() => this.$router.push({ path: '/branches' }))
          }).catch(error => {
            loadingInstance.close()
            this.$alert('分支保存失败：' + error.message)
          })
        }
      })
    }
  }
}
</script>
