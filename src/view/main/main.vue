<template>
  <div>
    主页
  </div>
</template>
<script>

  import './main.less'
  import {mapActions} from "vuex";

  export default {
    name: "main",
    data() {
      return{
      }
    },
    methods: {
      ...mapActions([
      ]),
    },
    mounted() {
    }
  }
</script>

<style scoped>

  div {
    background: #fff;
  }
</style>
