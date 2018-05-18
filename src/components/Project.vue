<template>
  <section>
    <el-form ref='form' label-width='200px'>
      <el-form-item label='项目名称'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='项目描述'>
        <el-input></el-input>
      </el-form-item>
      <el-form-item label='创建人'>
        <el-input :readonly='true'></el-input>
      </el-form-item>
      <el-form-item label='分支'>
        <router-link to='/branch'>
          <el-button type='primary'>新建分支</el-button>
        </router-link>
      </el-form-item>
      <el-form-item v-for='i in 2' :key='i'>
        <el-col :span='4'>
          <el-input placeholder='名称' :readonly='true'></el-input>
        </el-col>
        <el-col :span='4' :offset='1'>
          <el-input placeholder='描述' :readonly='true'></el-input>
        </el-col>
        <el-col :span='10' :offset='1'>
          <el-button>编辑</el-button>
          <el-button type='danger'>删除</el-button>
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
export default {
  asyncData({ store, route }) {
    return Promise.resolve('hello')
  }
}
</script>
