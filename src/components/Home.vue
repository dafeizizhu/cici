<template>
  <div>
    <h2>Home, fetch item {{ item.foo }}</h2>
    <div>In develop enviroment, try to modify something in this file</div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('home/test')
  },
  computed: {
    item() {
      return this.$store.state.home.item
    }
  }
}
</script>
