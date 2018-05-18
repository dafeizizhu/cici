<template>
  <section>
    <el-form rel='form' label-width='200px'>
      <el-form-item label='项目'>
        <el-select value=''>
          <el-option :label='"项目" + i' :value='i' v-for='i in 2' :key='i'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='版本控制登陆信息'>
        <el-select value=''>
          <el-option :label='"版本控制" + i' :value='i' v-for='i in 2' :key='i'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='描述'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='版本控制类型'>
        <el-select placeholder='请选择版本控制类型' value=''>
          <el-option label='svn' :value='1'></el-option>
          <el-option label='git' :value='2'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='版本控制仓库'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary'>保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

const NS = 'branch'

export default {
  asyncData({ store, route }) {
    return store.dispatch(`${NS}/findBranch`, { id: route.query.id })
  }
}
</script>
