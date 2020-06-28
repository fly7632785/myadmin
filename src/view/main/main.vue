<template>
  <div>
    <img :src="img" style="width: 100%;height: 100%"/>
  </div>
</template>
<script>

  import './main.less'
  import {mapActions} from "vuex";
  import img from '@/assets/images/main.jpg'

  export default {
    name: "main",
    data() {
      return {
        img:img
      }
    },
    methods: {
      ...mapActions([]),
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
