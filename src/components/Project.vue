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
      <el-form-item label='部署域名' prop='domain'>
        <el-input v-model='projectInfo.domain'></el-input>
      </el-form-item>
      <el-form-item label='分支' v-if='projectInfo.id'>
        <router-link :to='"/branch?projectId=" + projectInfo.id'>
          <el-button type='primary'>新建分支</el-button>
        </router-link>
        <el-table :data='branchInfoList' style='width: 100%'>
          <el-table-column prop='name' label='名称' min-width='200'></el-table-column>
          <el-table-column prop='description' label='描述' min-width='200'></el-table-column>
          <el-table-column fix='right' label='操作' min-width='200'>
            <template slot-scope='scope'>
              <router-link :to='"/branch?id=" + scope.row.id'>
                <el-button size='small'>编辑</el-button>
              </router-link>
              <el-button type='danger' size='small'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label='部署' v-if='projectInfo.id'>
        <router-link :to='"/deploy?projectId=" + projectInfo.id'>
          <el-button type='primary'>新建部署</el-button>
        </router-link>
        <el-table :data='deployInfoList' style='width: 100%'>
          <el-table-column prop='name' label='名称' min-width='200'></el-table-column>
          <el-table-column prop='description' label='描述' min-width='200'></el-table-column>
          <el-table-column prop='dist' label='部署路径' min-width='200'></el-table-column>
          <el-table-column fix='right' label='操作' min-width='200'>
            <template slot-scope='scope'>
              <router-link :to='"/deploy?id=" + scope.row.id'>
                <el-button size='small'>编辑</el-button>
              </router-link>
              <el-button type='danger' size='small'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        description: [{ required: true, message: '请输入项目描述', trigger: 'blur' }],
        domain: [{ required: true, message: '请输入部署域名', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    session: state => state.session,
    projectInfo: state => state.projectInfo,
    branchInfoList: state => state.branchInfoList,
    deployInfoList: state => state.deployInfoList
  }),
  methods: {
    saveProject () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          this.$store.dispatch(`${NS}/saveProject`, {
            session: this.session,
            projectInfo: JSON.parse(JSON.stringify(this.projectInfo))
          }).then(ret => {
            loadingInstance.close()
            this.$alert('项目保存成功').then(() => this.$router.push({ path: '/projects' }))
          }).catch(error => {
            loadingInstance.close()
            this.$alert(`项目保存失败：${error.message}`)
          })
        }
      }, _ => {})
    }
  }
}
</script>
