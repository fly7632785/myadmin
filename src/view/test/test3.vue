<template>
  <EditUser style="width: 100%;height: 100%" :user="user" :header="header" :is-show="true"
            :upload-url="uploadUrl"></EditUser>
</template>

<script>
  import EditUser from '../user-manage/edit-user/edit-user'

  export default {
    name: "test3",
    components: {
      // EditUser
    },
    data() {
      return {
        isShow: true,
        user: {},
        header: {},
        uploadUrl: {}
      }
    }
  }
</script>
