<template>
  <div id="root">
    <Card id="card">
      <div id="info">
        <Avatar :src='avatar' style="width: 150px;height: 150px;margin-bottom:50px"/>

        <Row class="row">
          <i-col span="8" class="col-left">
            <Span class="key">用户名</Span>
          </i-col>
          <i-col span="16" class="col-right">
            <Span class="value">{{username}}</Span>
          </i-col>
        </Row>

        <Row class="row">
          <i-col span="8" class="col-left">
            <Span class="key">姓名</Span>
          </i-col>
          <i-col span="16" class="col-right">
            <i-input :value.sync="name" @input="onNameChange" placeholder="请输入..." ></i-input>
          </i-col>
        </Row>
        <Row class="row">
          <i-col span="8" class="col-left">
            <Span class="key">密码</Span>
          </i-col>
          <i-col span="16" class="col-right">
            <i-input :value.sync="password" @input="onPwdChange" placeholder="请输入..."></i-input>
          </i-col>
        </Row>

        <Button type="primary" @click="save" style="margin-top: 40px">保存</Button>
      </div>
    </Card>
  </div>
</template>

<script>
  import './mine.less'
  import {mapActions, mapGetters} from 'vuex'
  import {updateUserInfo} from "@/api/user";
  import {Message} from "iview";

  export default {
    name: 'mine',
    data() {
      return {
        password: '',
        name: this.$store.state.user.name,
      }
    },
    computed: {
      avatar() {
        return this.$store.state.user.avatar
      },
      // name() {
      //   return this.$store.state.user.name
      // },
      username() {
        return this.$store.state.user.userName
      },
    },
    methods: {
      ...mapActions([
        'handleUpdateUserInfo',
        'getUserInfo'
      ]),
      onNameChange(val) {
        this.name = val;
      },
      onPwdChange(val) {
        this.password = val;
      },
      save() {
        console.log('name', this.name)
        console.log('password', this.password)
        this.handleUpdateUserInfo({name: this.name, password: this.password}).then(data => {
          if(this.password){
            Message.success('修改密码成功,重新登录')
            this.$router.push('login')
          }else {
            Message.success('修改成功')
            this.getUserInfo()
          }
        })
      }
    },
    mounted() {

    }
  };
</script>
