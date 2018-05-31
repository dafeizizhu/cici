<template>
  <div>
    <header>
      <h1>项目权限</h1>
    </header>
    <section>
      <el-transfer v-model='transfer.model' :data='transfer.data'></el-transfer>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

const NS = 'admin'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findAdmin`, { session })
  },
  data () {
    return {
      transfer: {
        model: [1, 4],
        data: (() => {
          const data = []
          for (let i = 0; i < 15; i++) {
            data.push({ key: i, label: '选项 ' + i })
          }
          return data
        })()
      }
    }
  },
  computed: mapState(NS, {
    projectInfoList: state => state.projectInfoList,
    transfer: state => state.transfer
  })
}
</script>
