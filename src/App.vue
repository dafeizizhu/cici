<template>
  <div id='app'>
    <el-container>
      <el-header>
        <el-menu :default-active='defaultActive' mode='horizontal' :router='true'>
          <el-menu-item index='0' route='/'>Cici</el-menu-item>
          <el-menu-item index='1' route='projects'>项目</el-menu-item>
          <el-menu-item index='2' route='profile'>我的</el-menu-item>
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
      switch (this.$store.state.route.path) {
        case '/projects':
          return '1'
        case '/profile':
          return '2'
        default:
          return '0'
      }
    }
  }
}
</script>
