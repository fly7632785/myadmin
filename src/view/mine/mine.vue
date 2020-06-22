<template>
  <div id="root">
    <Card id="card">
      <div id="info">

        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleUploadSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleUploadFormatError"
          :on-exceeded-size="handleUploadMaxSize"
          :headers="header"
          type="drag"
          :action="uploadUrl"
          style="display: inline-block;width:150px;height:150px;margin-bottom: 50px">
          <div style="width: 150px;height: 150px">
            <Avatar :src='avatar' style="width: 150px;height: 150px"/>
          </div>
        </Upload>


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
            <i-input :value.sync="name" @input="onNameChange" placeholder="请输入..."></i-input>
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
        <Row class="row">
          <i-col span="8" class="col-left">
            <Span class="key">手机</Span>
          </i-col>
          <i-col span="16" class="col-right">
            <i-input :value.sync="mobile" @input="onMobileChange" placeholder="请输入..."></i-input>
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
        mobile: this.$store.state.user.mobile,
        avatar: this.$store.state.user.avatar,
        name: this.$store.state.user.name,
        header: {'token': this.$store.state.user.token},
        uploadUrl: this.$config.baseUrl.dev + "upload"
      }
    },
    computed: {
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
      onMobileChange(val) {
        this.mobile = val;
      },
      save() {
        console.log('name', this.name)
        console.log('password', this.password)
        this.handleUpdateUserInfo({name: this.name, password: this.password, mobile: this.mobile,avatar:this.avatar}).then(data => {
          if (this.password) {
            Message.success('修改密码成功,重新登录')
            this.$router.push('login')
          } else {
            Message.success('修改成功')
            this.getUserInfo()
          }
        })
      },
      handleUploadSuccess(res, file) {
        console.log(file.response)
        this.avatar = file.response

      },
      handleUploadFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleUploadMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
    },
    mounted() {
      console.log("upload url:",this.$config.baseUrl.dev + "upload")
      console.log("token:", this.$store.state.user.token)
    }
  };
</script>
