<template>
  <div style="background: #fff">

    <div style="flex-direction: row;display: flex">
      <div style="width: 50px;height: 50px;background-color: #67647D">

      </div>
      <div style="flex: 1;background-color: firebrick">

      </div>
      <div style="width: 50px;height: 50px;background-color: #67647D">

      </div>
    </div>
  </div>
</template>

<script>
  import './test2.less'

  export default {
    name: "test2",
    // beforeRouteLeave(to, from, next) {
    //   console.log('beforeRouteLeave')
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   console.log(from)
    //   if (from.name === "test2") {
    //     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    //     if (answer) {
    //       next()
    //     } else {
    //       //处理菜单栏点击后回退
    //       next(false)
    //     }
    //   } else {
    //     next()
    //   }
    // }
  }
</script>

<style scoped>

</style>
