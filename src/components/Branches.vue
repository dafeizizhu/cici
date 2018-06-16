<template>
  <section>
    <el-row>
      <el-form>
        <el-form-item>
          <router-link to='/branch'>
            <el-button icon='el-icon-plus'>新增</el-button>
          </router-link>
        </el-form-item>
        <el-form-item label='项目'>
          <el-select v-model='projectId'>
            <el-option label='全部' value=''></el-option>
            <el-option
              v-for='projectInfo in projectInfoList'
              :label='projectInfo.name'
              :value='projectInfo.id'
              :key='"project_" + projectInfo.id'>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table :data='branchInfoList' style='width: 100%'>
        <el-table-column prop='name' label='名称' min-width='100'></el-table-column>
        <el-table-column prop='description' label='描述' min-width='200'></el-table-column>
        <el-table-column prop='vcsType.name' label='版本控制' min-width='100'></el-table-column>
        <el-table-column prop='vcsUri' label='版本控制仓库' min-width='200'></el-table-column>
        <el-table-column prop='projectInfo.name' label='项目' min-width='100'></el-table-column>
        <el-table-column label='上次更新时间' min-width='100'>
          <template slot-scope='scope'>
            {{ scope.row.prevFetchTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column fixed='right' label='操作' min-width='200'>
          <template slot-scope='scope'>
            <router-link :to='"/branch?id=" + scope.row.id' v-if='scope.row.ownerInfo.id === session.user.id'>
              <el-button size='small'>编辑</el-button>
            </router-link>
            <router-link :to='"/profileBranch?branchId=" + scope.row.id'>
              <el-button size='small'>配置</el-button>
            </router-link>
            <el-button type='danger' size='small'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script>

import moment from 'moment'
import { mapState } from 'vuex'

const NS = 'branches'

export default {
  asyncData({ store, route, session }) {
    return store.dispatch(`${NS}/findBranches`, { session })
  },
  computed: mapState(NS, {
    session: state => state.session,
    projectId: state => state.projectId,
    projectInfoList: state => state.projectInfoList,
    branchInfoList: state => state.branchInfoList
  }),
  filters: {
    formatDate (time) {
      return moment(time).format('YYYY/MM/DD HH:mm:SS')
    }
  }
}
</script>
