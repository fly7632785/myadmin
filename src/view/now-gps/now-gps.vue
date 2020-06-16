<template>
  <div id="container"></div>
</template>

<script src="//webapi.amap.com/ui/1.1/main.js"></script>
<script>

  import './now-gps.less'
  import AMap from 'AMap'
  import {mapActions} from "vuex";

  export default {
    name: "main",
    data() {
      return{
        map: {},
      }
    },
    methods: {
      ...mapActions([
        'getAllNowGps',
      ]),
      initMap() {
        const map = new AMap.Map('container', {
          resizeEnable: true,
          room: 11
        })
        this.map = map
        map.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
        })
      },
      allNowGps() {
        this.getAllNowGps().then(res => {
          this.addMarkers(res,this.map)
          console.log("res", JSON.stringify(res))
        })
      },
      addMarkers(data,map) {
        const markerList = [];
        data.forEach((item, index) => {
          const marker = new AMap.Marker({
            position: new AMap.LngLat(item.lng,item.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: data.name
          });
          console.log("marker", marker)
          markerList.push(marker)
        })
        console.log("map", map)
        map.add(markerList)
      }
    },
    mounted() {
      this.initMap()
      this.allNowGps()
    }
  }
</script>

<style scoped>

  div {
    background: #fff;
  }
</style>
