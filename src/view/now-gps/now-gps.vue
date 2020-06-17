<template>
  <div id="container"></div>
</template>

<script src="//webapi.amap.com/ui/1.1/main.js"></script>
<script>

  import './now-gps.less'
  import AMap from 'AMap'
  import {mapActions} from "vuex";
  import moment from "moment"
  import personLogo from '@/assets/images/person.png'

  export default {
    name: "main",
    data() {
      return {
        map: {},
        geocoder: {},
        infoWindow: {}
      }
    },
    methods: {
      ...mapActions([
        'getAllNowGps',
      ]),
      initMap() {
        const map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 11
        })
        this.map = map
        map.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
        })
        AMap.service('AMap.Geocoder', this.getGeocoderCallBack)
      },
      getGeocoderCallBack() {//回调函数
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
      },
      allNowGps() {
        this.getAllNowGps().then(res => {
          this.addMarkers(res)
          console.log("res", JSON.stringify(res))
        })
      },
      addMarkers(data) {
        this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -70)});
        data.forEach((item, index) => {
          var marker = new AMap.Marker({
            position: [item.lng, item.lat],
            icon: personLogo,
            offset: new AMap.Pixel(-15, -66),
            map: this.map
          });
          const time = moment(new Date(item.time * 1000)).format('YYYY-MM-DD HH:mm')
          var info = [];
          info.push('<img src=' + item.avatar + ' style=width:50px;height:50px>');
          info.push("姓名：" + item.name);
          info.push("时间：" + time);
          marker.content = info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
          marker.on('mouseover', this.markerHover);
          // marker.emit('mouseover', {target: marker});
        })
        this.map.setFitView();
      },
      getAddrByloc(e) {  //逆地理编码
        var _this = this
        this.geocoder.getAddress(e.target.getPosition(), function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress;
            console.dir(address);
            const content = e.target.content + '<br/>地址：' + address;
            _this.infoWindow.setContent(content)
            _this.infoWindow.open(_this.map, e.target.getPosition());
          }
        });
      },
      getAddrCallBack(status, result) {

      },
      markerHover(e) {
        this.getAddrByloc(e)
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
