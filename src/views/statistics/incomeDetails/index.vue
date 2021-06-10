<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:57:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-08 14:25:46
 * @Desc: 主播管理 - 收入明细
-->
<template>
  <div class="incomeDetails">
    <searchForm :formOptions="formOptions" :btnItems="btnItems" @onSearch="handleSearch" @onExport="handleExport" />

    <div class="listBox">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="userId" label="ID" min-width="100"></el-table-column>
          <el-table-column prop="userName" label="昵称" min-width="120"></el-table-column>
          <el-table-column
            prop="guildName"
            label="所属公会"
            :formatter="guildFormatter"
            min-width="140"
          ></el-table-column>
          <el-table-column prop="totalIncome" label="总流水(TST)" min-width="120"></el-table-column>
          <el-table-column prop="givenRate" label="分成比例" min-width="80"></el-table-column>
          <el-table-column prop="givenIncome" label="分成后收入(TST)" min-width="120"></el-table-column>
          <el-table-column label="操作" min-width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="onGiftDetails(scope.row)">礼物流水详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :currentPage.sync="pagination.currentPage"
        :pageSize.sync="pagination.pageSize"
        :total="pagination.total"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      />
    </div>
    <giftDetails ref="myChild" :visible.sync="isGift" :formData="giftDetailsObj" />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import giftDetails from '@/views/statistics/components/income/handleGiftDetails'
import { getIncomeList } from '@/api/statistics'
import { exportExcel } from '@/api/common'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      btnItems: 'search,export',
      searchData: {
        infoSearch: '',
        startDate: '',
        endDate: ''
      },
      tableList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      initTimes: tools.getLatelyDays(30, '{y}-{m}-{d} {h}:{i}:{s}'),
      isGift: false,

      giftDetailsObj: {}
    }
  },

  computed: {
    formOptions() {
      let options = [
        {
          label: 'ID/昵称',
          prop: 'infoSearch',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID/昵称'
        },

        {
          label: '时间',
          prop: 'times',
          element: 'el-date-picker',
          initValue: this.initTimes,
          placeholder: ''
        }
      ]
      return options
    }
  },
  created() {
    // console.log(this.initTimes)
    this.searchData.startDate = this.initTimes[0]
    this.searchData.endDate = this.initTimes[1]
    this.getData()
  },
  mounted() {},
  methods: {
    guildFormatter(row) {
      return row.guildName || '/'
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    // 搜索
    handleSearch(data) {
      console.log('-search-', data)
      this.searchData.infoSearch = data.infoSearch
      this.searchData.startDate = data.times ? data.times[0] : ''
      this.searchData.endDate = data.times ? data.times[1] : ''
      this.getInitData()
    },
    handleExport() {
      console.log('-export-params-', this.searchData)
      exportExcel('incomeList', this.searchData)
    },
    currentChange(pageNo) {
      this.getInitData(pageNo, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    onGiftDetails(item) {
      console.log('-item-', item)
      this.giftDetailsObj = item
      this.isGift = true
      this.$nextTick(() => {
        this.$refs.myChild.initCharts()
      })
    },
    // 数据请求
    getData() {
      const params = { pageSize: this.pagination.pageSize, pageNum: this.pagination.currentPage, ...this.searchData }
      console.log('-params-', params)
      getIncomeList(params).then(res => {
        console.log('-res-', res)
        const { totalCount, result } = res.data.page
        this.pagination.total = totalCount
        this.tableList = result
        // console.log(this.tableList)
      })
    }
  },
  components: { searchForm, pagination, giftDetails }
}
</script>

<style lang="less" scoped></style>
