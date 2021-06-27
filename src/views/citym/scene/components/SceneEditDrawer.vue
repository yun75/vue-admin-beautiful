<template>
  <el-drawer
    :title="'场景设置'"
    :visible.sync="dialogFormVisible"
    append-to-body
    custom-class="vab-drawer"
    direction="rtl"
    size="650px"
  >
    <el-scrollbar class="theme-scrollbar">
      <div class="el-drawer__body">
        <el-form ref="form" :model="form" :rules="rules" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="场景名称" prop="companyName">
                <el-input
                  v-model="form.companyName"
                  placeholder="请输入场景名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="email">
                <el-input v-model="form.email" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="display: flex">
          <div style="width: 240px; margin-right: 10px">
            <el-tabs v-model="activeName">
              <el-tab-pane label="业务项目" name="first">
                <el-tree
                  ref="pcMenuTree"
                  :data="pcMenuTreeData"
                  show-checkbox
                  node-key="id"
                  :props="{ label: 'menuTitle', children: 'children' }"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div style="flex: 1">
            <el-table
              ref="tableSort"
              v-loading="listLoading"
              :data="list"
              :element-loading-text="elementLoadingText"
              :height="height"
              @selection-change="setSelectRows"
              @sort-change="tableSortChange"
            >
              <el-table-column
                show-overflow-tooltip
                type="selection"
                width="55"
              ></el-table-column>
              <el-table-column show-overflow-tooltip label="序号" width="80">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="title"
                label="API名称"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                label="数据DEMO"
                prop="apiurl"
              ></el-table-column>
            </el-table>
            <el-pagination
              small
              :background="background"
              :current-page="queryForm.pageNo"
              :layout="layout"
              :page-size="queryForm.pageSize"
              :total="total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :pager-count="2"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="el-drawer__footer">
      <el-button type="primary" @click="save">保存</el-button>
      <!-- <el-button>
        {{ translateTitle('恢复默认') }}
      </el-button> -->
    </div>
  </el-drawer>
</template>

<script>
  import { doEdit, getList } from '@/api/table'

  export default {
    name: 'BusEditDialog',
    data() {
      return {
        form: {
          title: '',
          author: '',
        },
        rules: {
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
        },
        title: '',
        dialogFormVisible: false,
        pcMenuTreeData: [
          { menuTitle: '市监（2）' },
          { menuTitle: '公安' },
          { menuTitle: '社会事业局' },
          { menuTitle: '资规局（1）' },
          { menuTitle: '审批局' },
          { menuTitle: '执法局' },
        ],
        activeName: 'first',
        listLoading: false,
        list: [],
        total: 0,
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
        this.fetchData()
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .theme-scrollbar {
    height: calc(100vh - 118px) !important;
    overflow: hidden;
  }
</style>
<style lang="scss">
  .vab-drawer {
    .el-drawer__header {
      margin-bottom: 20px;
    }

    .el-drawer__body {
      padding: 0px 5px 5px 5px;

      .el-divider--horizontal {
        margin: 28px 0 28px 0;
      }

      .el-form-item {
        display: flex;
        align-items: center;

        .el-form-item__label {
          flex: 1 1;
        }

        .el-form-item__content {
          flex: 0 0 auto;
        }
      }

      .el-form-item--small.el-form-item {
        .el-input__inner {
          width: 115px;
        }
      }
    }

    .el-drawer__footer {
      padding: 10px;
      border-top: 1px solid #cccccc;
    }
  }
</style>
