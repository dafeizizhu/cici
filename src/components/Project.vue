<template>
  <section>
    <el-form ref='form' :model='projectInfo' :rules='rules' label-width='200px'>
      <el-form-item label='项目名称' prop='name'>
        <el-input v-model='projectInfo.name'></el-input>
      </el-form-item>
      <el-form-item label='项目描述' prop='description'>
        <el-input v-model='projectInfo.description'></el-input>
      </el-form-item>
      <el-form-item label='创建人' v-if='projectInfo.id'>
        <el-input :readonly='true' v-model='projectInfo.ownerInfo.name'></el-input>
      </el-form-item>
      <el-form-item label='分支' v-if='projectInfo.id'>
        <router-link :to='"/branch?projectId=" + projectInfo.id'>
          <el-button type='primary'>新建分支</el-button>
        </router-link>
      </el-form-item>
      <el-form-item v-for='(branchInfo, i) in projectInfo.branchInfoList' :key='branchInfo.id'>
        <el-col :span='4'>
          <el-input placeholder='名称' :readonly='true' v-model='branchInfo.name'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='描述' :readonly='true' v-model='branchInfo.description'></el-input>
        </el-col>
        <el-col :span='10' :offset='1'>
          <el-button>编辑</el-button>
          <el-button type='danger'>删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveProject'>保存</el-button>
        <el-button @click='$router.go(-1)'>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'project'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findProject`, { projectId: route.query.id, session })
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入项目描述', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    projectInfo: state => state.projectInfo
  }),
  methods: {
    saveProject () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          this.$store.dispatch(`${NS}/saveProject`, {
            projectInfo: JSON.parse(JSON.stringify(this.projectInfo))
          }).then(ret => {
            loadingInstance.close()
            this.$alert('项目保存成功').then(() => this.$router.push({ path: '/projects' }))
          })
        }
      })
    }
  }
}
</script>
