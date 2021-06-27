<template>
  <el-drawer
    :title="'业务项设置'"
    :visible.sync="dialogFormVisible"
    append-to-body
    custom-class="vab-drawer"
    direction="rtl"
    size="380px"
  >
    <el-scrollbar class="theme-scrollbar">
      <div class="el-drawer__body">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          size="mini"
          label-width="120px"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="业务名称" prop="companyName">
                <el-input
                  v-model="form.companyName"
                  placeholder="请输入业务名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="email">
                <el-input v-model="form.email" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs v-model="activeName">
          <el-tab-pane label="API设置" name="first">
            <el-tree
              ref="pcMenuTree"
              :data="pcMenuTreeData"
              show-checkbox
              node-key="id"
              :props="{ label: 'menuTitle', children: 'children' }"
            />
          </el-tab-pane>
        </el-tabs>
        <el-form ref="form" label-position="left">
          <!-- <el-divider content-position="left">
            <vab-icon icon="settings-3-line" />
            {{ '其它设置' }}
          </el-divider> -->
        </el-form>
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
  import { doEdit } from '@/api/table'

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
          { menuTitle: 'API名称1' },
          { menuTitle: 'API名称2' },
          { menuTitle: 'API名称3' },
        ],
        activeName: 'first',
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
