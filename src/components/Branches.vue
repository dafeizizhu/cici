<template>
  <section>
    <el-row>
      <router-link to='/branch'>
        <el-button icon='el-icon-plus'>新增</el-button>
      </router-link>
    </el-row>
  </section>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return Promise.resolve('hello')
  }
}
</script>
