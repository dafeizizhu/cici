<template>
  <section>
    <el-form ref='form' :model='vcsInfo' :rules='rules' label-width='200px'>
      <el-form-item label='类型' prop='type.value'>
        <el-select placeholder='请选择类型' v-model='vcsInfo.type.value'>
          <el-option
            v-for='vcsType in vcsTypes'
            :label='vcsType.name'
            :value='vcsType.value'
            :key='"vcsType_" + vcsType.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='描述' prop='description'>
        <el-input v-model='vcsInfo.description'></el-input>
      </el-form-item>
      <el-form-item label='用户名' prop='username'>
        <el-input v-model='vcsInfo.username'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='password'>
        <el-input v-model='vcsInfo.password' type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='saveVCS'>保存</el-button>
        <el-button @click='$router.go(-1)'>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'profileVCS'

export default {
  asyncData ({ store, route, session }) {
    return store.dispatch(`${NS}/findProfileVCS`, {
      session,
      vcsId: route.query.id
    })
  },
  data () {
    return {
      rules: {
        'type.value': [{ required: true, message: '请选择类型', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(NS, {
    session: state => state.session,
    vcsTypes: state => state.vcsTypes,
    vcsInfo: state => state.vcsInfo
  }),
  methods: {
    saveVCS () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let loadingInstance = this.$loading()
          this.$store.dispatch(`${NS}/saveVCS`, {
            session: this.session,
            vcsInfo: JSON.parse(JSON.stringify(this.vcsInfo))
          }).then(ret => {
            loadingInstance.close()
            this.$alert('保存成功').then(() => this.$router.push({ path: '/profile' }))
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
