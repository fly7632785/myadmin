<template>
  <div class="user-manage">
    <Button type="primary" style="margin-left: 20px" @click="createUser">创建新用户</Button>
    <Table style="margin:20px" border :columns="columns" :data="tableData"/>
    <div v-if="isShowEdit">
      <EditUser :user="newUser"
                :isEdit="isEdit"
                @visible="this.handleEditVisible"
                :header="{'token': this.$store.state.user.token}"
                :is-show="true"
                :upload-url="this.$config.baseUrl + 'upload'"
                @ok="handleEditOk"
      ></EditUser>
    </div>
  </div>
</template>

<script>
  import './user-manage.less'
  import {mapActions, mapGetters} from 'vuex'
  import {Message} from "iview";
  import moment from "moment";
  import EditUser from './edit-user'
  import logo from "@/assets/logo.png";

  export default {
    name: 'user-manage',
    data() {
      return {
        columns: [
          {
            title: '头像',
            width: 70,
            key: 'avatar',
            render: (h, {row}) => {
              return h('div', [
                h('img', {
                  domProps: {
                    src: row.avatar
                  },
                  style: {
                    width: '30px',
                    height: '30px',
                  }
                })
              ])
            }
          },
          {
            title: '姓名',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                // h('Icon', {
                //   props: {
                //     type: 'md-person'
                //   }
                // }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '手机',
            key: 'mobile'
          },
          {
            title: '上次登陆时间',
            key: 'lastLoginTime',
            render: (h, params) => {
              return h('div', this.formatDate(params.row.lastLoginTime)
              )
            }
          },
          {
            title: '角色',
            key: 'role'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        userdata: [],
        tableData: [],
        newUser: {},
        isShowEdit: false,
        editIndex: 0,
        isEdit: true,//true 编辑  false 新建
      }
    },
    components: {
      EditUser
    },
    computed: {},
    methods: {
      ...mapActions([
        'handleUpdateUserInfo',
        'handleGetAllUsers',
        'handleDeleteUser',
        'handleCreateUser',
      ]),
      allUsers() {
        this.handleGetAllUsers().then(data => {
          this.userdata = data
          this.handleTableData()
        })
      },
      remove(index) {
        console.log('this.tableData[index].uid.toString()', this.userdata[index].uid.toString())
        console.log('this.$store.state.user.userId.toString()', this.$store.state.user.userId.toString())
        this.$Modal.confirm({
          title: '确定删除吗',
          onOk: () => {
            if (this.userdata[index].uid.toString() === this.$store.state.user.userId.toString()) {
              Message.error('不能删除自己')
            } else {
              // this.handleDeleteUser().then(data => {
              Message.success('删除成功')
              // })
              this.userdata.splice(index, 1);
              this.handleTableData()
            }
          }
        })
      },
      edit(index) {
        //copy一份新的，避免数据绑定导致 修改过程中 实际数据已经被修改 如果取消修改 元数据应该不变
        this.newUser = Object.assign({}, this.userdata[index])//克隆一个
        //编辑的index
        this.editIndex = index
        this.isEdit = true
        //显示编辑弹框
        this.isShowEdit = true
      },
      formatDate(time) {
        console.log('formatDate', time)
        if (time === null) {
          return '从未登陆'
        }
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm')
      },
      handleTableData() {
        this.tableData = this.userdata.map((item, index) => {
          let res = item
          return res
        })
        console.log('handleTableData', this.tableData)
      },
      handleEditVisible(visible) {
        console.log('handleEditVisible', visible)
        if (visible === false) {
          this.isShowEdit = false
        }
      },
      handleEditOk(data) {
        console.log('handleEditOk', data)
        let {user, isEdit} = data

        if (isEdit) {
          this.userdata[this.editIndex] = this.newUser
          console.log(this.newUser)
          this.handleUpdateUserInfo({
            uid: this.newUser.uid,
            username: this.newUser.username,
            name: this.newUser.name,
            password: this.newUser.password,
            mobile: this.newUser.mobile,
            avatar: this.newUser.avatar
          })
          .then(data => {
            Message.success('修改成功')
            //本地刷新
            this.handleTableData()
          })
        } else {
          //新建
          console.log('handleEditOk', user.username)
          this.handleCreateUser({
            username: user.username,
            name: user.name,
            password: user.password,
            mobile: user.mobile,
            avatar: user.avatar
          })
          .then(data => {
            Message.success('创建成功')
            this.allUsers()
          })
        }
      },
      createUser() {
        this.newUser = {
          avatar: logo //如果默认的没有图片，上传返回url重新设置不会马上刷新  有默认就可以
        }
        //显示编辑弹框
        this.isEdit = false
        this.isShowEdit = true
      }
    },
    mounted() {
      this.allUsers()
    }
  };
</script>
