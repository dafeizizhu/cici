<template>
  <div>Profile Init</div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return Promise.resolve('hello')
  }
}
</script>
