<template>
  <div id='app'>
    <el-container>
      <el-header>
        <el-menu :default-active='defaultActive' mode='horizontal' :router='true'>
          <el-menu-item index='0' route='/'>Cici</el-menu-item>
          <el-menu-item index='1' route='projects'>项目</el-menu-item>
          <el-menu-item index='2' route='branches'>分支</el-menu-item>
          <el-menu-item index='3' route='profile'>我的</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive (...args) {
      if (this.$store.state.route.path.indexOf('/project') === 0) {
        return '1'
      } else if (this.$store.state.route.path.indexOf('/branch') === 0) {
        return '2'
      } else if (this.$store.state.route.path.indexOf('/profile') === 0) {
        return '3'
      } else {
        return '0'
      }
    }
  }
}
</script>
