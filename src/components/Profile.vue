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
        <el-button type='primary' @click='addVCS'>新增版本控制信息</el-button>
      </el-form-item>
      <el-form-item v-for='(vcsInfo, i) in vcsInfoList' :key='"vcs_" + vcsInfo.id'>
        <el-col :span='4'>
          <el-input placeholder='描述' v-model='vcsInfo.description'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-select placeholder='请选择版本控制类型' v-model='vcsInfo.type'>
            <el-option label='svn' :value='1'></el-option>
            <el-option label='git' :value='2'></el-option>
          </el-select>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='用户名' v-model='vcsInfo.username'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='密码' type='password' v-model='vcsInfo.password'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-button type='danger' @click='removeVCS(vcsInfo.id)'>删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label='项目'>
        <el-button type='primary'>新增项目</el-button>
      </el-form-item>
      <el-form-item v-for='projectInfo in projectInfoList' :key='"project_" + projectInfo.id'>
        <el-col :span='4'>
          <el-input :readonly='true' placeholder='名称' v-model='projectInfo.name'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input :readonly='true' placeholder='描述' v-model='projectInfo.description'></el-input>
        </el-col>
        <el-col :span='10' :offset='1'>
          <el-button>编辑</el-button>
          <el-button type='danger' v-if='projectInfo.ownerInfo.id !== userInfo.id'>退出</el-button>
          <el-button type='danger' v-if='projectInfo.ownerInfo.id === userInfo.id'>删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveProfile'>保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'profile'

export default {
  asyncData({ store, session, route }) {
    return store.dispatch(`${NS}/findProfile`, { userId: session.user.id })
  },
  computed: mapState(NS, {
    id: state => state.id,
    userInfo: state => state.userInfo,
    vcsInfoList: state => state.vcsInfoList,
    projectInfoList: state => state.projectInfoList
  }),
  methods: {
    addVCS () {
      this.$store.commit(`${NS}/addVCS`)
    },
    removeVCS (vcsId) {
      this.$store.commit(`${NS}/removeVCS`, { vcsId })
    },
    saveProfile () {
      this.$store.dispatch(`${NS}/saveProfile`).then(() => console.info('done!'))
    }
  }
}
</script>
