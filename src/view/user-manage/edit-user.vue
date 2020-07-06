<template>
  <Modal :value="isShow" :title="title" @on-visible-change="handleVisible">
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
      style="display: inline-block;width:50px;height:50px;margin-bottom: 50px">
      <Avatar :src='user.avatar' style="width:50px;height: 50px"/>
    </Upload>
    <Form ref="user" :model="user" :rules="ruleValidate">
      <FormItem label="用户名" prop="username">
        <Input v-model="user.username"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="user.password"/>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="user.name"/>
      </FormItem>
      <FormItem label="手机" prop="mobile">
        <Input v-model="user.mobile"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="handleCancel">取消</Button>
      <Button type="primary" size="large" @click="handleConfirm('user')">确定</Button>
    </div>
  </Modal>
</template>
<script>
  export default {
    name: 'edit-user',
    props: {
      //姓名、头像、手机、用户名、密码、
      user: {
        uid: '',
        avatar:'',
        name: '',
        username: '',
        password:null,
        mobile: '',
      },
      //是否显示弹框
      isShow: false,
      //上传所需的token
      header: {},
      //上传地址
      uploadUrl: {},
      isEdit: {
        type: Boolean
      },
    },
    computed: {
      title() {
        return this.isEdit === true ? "修改用户信息" : "新建用户信息"
      },
      ruleValidate() {
        console.log('ruleValidate', this.isEdit)
        const rule = this.isEdit === true ? this.editRuleValidate : this.createRuleValidate
        console.log('ruleValidate', rule)
        return rule
      }
    },
    watch:{
      isShow(val){
        console.log('isShow',val)
      }
    },
    data() {
      return {
        editRuleValidate: {
          username: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mobile:[
            { required: false, message: "请输入手机号码", trigger: "blur" },
            { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur"}
          ]
        },
        createRuleValidate: {
          username: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'The password cannot be empty', trigger: 'blur'}
          ],
          mobile:[
            { required: false, message: "请输入手机号码", trigger: "blur" },
            { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      handleUploadSuccess(res, file) {
        console.log(file.response)
        this.user.avatar = file.response
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
      //处理确定
      handleConfirm(name) {
        this.$refs[name].validate((valid) => {
          console.log('handleConfirm validate',valid)
          if (valid) {
            //发送ok事件
            this.$emit('ok', {user: this.user, isEdit: this.isEdit})
            //关闭弹框
            this.$emit('visible', false)
          }
        })
      },
      handleCancel() {
        //关闭弹框
        this.$emit('visible', false)
      },
      handleVisible(visible) {
        //每次都清空验证信息 因为编辑和创建不一样
        this.$refs['user'].resetFields();
        //发送事件给父组件 修改自己的visible状态（注意这里 不能用v-model数据绑定 子组件不能修改父组件传来的prop的对象状态）
        this.$emit('visible', visible)
      }
    },
  };
</script>
