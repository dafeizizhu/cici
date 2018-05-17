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
      <el-form-item :label='"版本控制_" + (i + 1)' v-for='(vcsInfo, i) in vcsInfoList' :key='vcsInfo.id'>
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
      <el-form-item>
        <el-button type='primary' @click='addVCS'>新增版本控制信息</el-button>
      </el-form-item>
      <el-form-item :label='i === 1 ? "项目" : ""' v-for='i in 2' :key='"project_" + i'>
        <el-col :span='14'>
          <el-input value='???' :readonly='true'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-select placeholder='请选择版本控制信息' value=''>
            <el-option v-for='vcsInfo in vcsInfoList' :label='vcsInfo.description' :value='vcsInfo.id' :key='vcsInfo.id'></el-option>
          </el-select>
        </el-col>
        <el-col :span='3' :offset='1'>
          <el-button type='info'>前往</el-button>
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
