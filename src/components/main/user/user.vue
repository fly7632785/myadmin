<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
        {{userName}}
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import './user.less'

  export default {
    name: "user",
    props: {
      userAvatar: {
        type: String,
        default: ''
      },
      userName: {
        type: String,
        default: ''
      },
      messageUnreadCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut'
      ]),
      logOut() {
        this.handleLogOut().then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      },
      message() {
        this.$router.push({name: 'message'})
      },
      handleClick(name) {
        switch (name) {
          case 'logout':
            this.logOut()
            break
          case 'message':
            this.message()
        }
      },
    }
  }
</script>

<style scoped>

</style>
