<template>
  <Card>
    <div>
      <div class="parent">
        <div class="item-1"></div>
        <div class="item-2"></div>
        <div class="item-3"></div>
      </div>
      <div v-for="count in 100">
        {{count+"sdfasf"}}}
      </div>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "test3",
  }
</script>

<style scoped>
  .parent {
    display: flex;
    width: 600px;
  }

  .parent > div {
    height: 100px;
  }

  .item-1 {
    width: 140px;
    flex: 2 1 0;
    background: blue;
  }

  .item-2 {
    width: 100px;
    flex: 2 1 auto;
    background: darkblue;
  }

  .item-3 {
    flex: 1 1 200px;
    background: lightblue;
  }
</style>
