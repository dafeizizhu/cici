<template>
  <section>
    <el-form ref='form' label-width='80px'>
      <el-form-item label='用户名'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='YYUID'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='描述'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item :label='i === 1 ? "版本控制" : ""' v-for='i in 2' :key='"vcs_" + i'>
        <el-col :span='4'>
          <el-input placeholder='描述'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-select value='svn'>
            <el-option label='svn' value='svn'></el-option>
            <el-option label='git' value='git'></el-option>
          </el-select>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='用户名'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='密码' type='password'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-button type='danger'>删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type='primary'>新增版本控制信息</el-button>
      </el-form-item>
      <el-form-item :label='i === 1 ? "项目" : ""' v-for='i in 2' :key='"project_" + i'>
        <el-col :span='15'>
          <el-input value='???' :readonly='true'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-select value='1'>
            <el-option label='1' value='1'></el-option>
            <el-option label='2' value='2'></el-option>
          </el-select>
        </el-col>
        <el-col :span='3' :offset='1'>
          <el-button type='info'>前往</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type='primary'>保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

const NS = 'profile'

export default {
  asyncData({ store, session, route }) {
    console.info(session)
    return Promise.resolve('hello')
  }
}
</script>
