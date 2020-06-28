<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title='欢迎登录' :bordered="false">
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"/>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from "@/components/login/login-form";
  import {mapActions} from "vuex";

  export default {
    name: "login",
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      handleSubmit({userName, password}) {
        this.handleLogin({userName, password}).then(res => {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
              // name: 'gpsHis'
            })
          })
        }).catch(err=>{
          console.log("login:::",err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
