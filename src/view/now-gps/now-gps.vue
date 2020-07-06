<template>
  <div id="root">
    <div id="menu">
      <Card>
        <Row>
          <i-col span="4">
            <Dropdown @on-click="this.onUsersClick" class='dropdown'>
              <i-button>
                当前: {{this.currentUser.name}}
                <Icon type="arrow-down-b"></Icon>
              </i-button>
              <template v-for="(item,index) in this.data">
                <DropdownMenu slot="list">
                  <DropdownItem :name="index">
                    <a type="text" class="drop-item-a">
                      <img :src="item.avatar" style="width: 20px;height: 20px"/>
                      <span style="padding-left: 5px">{{item.name}}</span>
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </i-col>
        </Row>
      </Card>
    </div>
    <div id="map"></div>
  </div>
</template>

<script src="//webapi.amap.com/ui/1.1/main.js"></script>
<script>

  import './now-gps.less'
  import AMap from 'AMap'
  import Vue from 'vue'
  import {mapActions} from "vuex";
  import moment from "moment"
  import personLogo from '@/assets/images/person.png'

  export default {
    name: "now-gps",
    data() {
      return {
        map: {},
        geocoder: {},
        infoWindow: {},
        data: [],
        currentUser: {},
      }
    },
    methods: {
      ...mapActions([
        'getAllNowGps',
        'getNowGps',
        'handleGetAllUsers',
      ]),
      initMap() {
        const map = new AMap.Map('map', {
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
          this.data = res;
          this.addMarkers(res)
          this.addDropDown(res)
          console.log("res", JSON.stringify(res))
        })
      },
      nowGps() {
        console.log("nowGps ", JSON.stringify(res))
        this.getNowGps({}).then(res => {
          this.data = res;
          // var info = this.getContentByItem(res, marker);
          // marker.content = info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
          // marker.emit('mouseover', {target: marker});
          console.log("nowGps res", JSON.stringify(res))
        })
      },
      getContentByItem: function (item) {
        let time = moment(new Date(item.time * 1000)).format('YYYY-MM-DD HH:mm')
        var info = [];
        info.push('<img src=' + item.avatar + ' style=width:50px;height:50px>');
        info.push("姓名：" + item.name);
        info.push("时间：" + time);
        return info;
      },
      addMarkers(data) {
        this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -70)});
        data.forEach((item, index) => {
          var marker = new AMap.Marker({
            position: [item.lng, item.lat],
            icon: personLogo,
            offset: new AMap.Pixel(-15, -66),
            map: this.map,
            extData: item,
          });
          var info = this.getContentByItem(item);
          marker.content = info.join("<br/>") //使用默认信息窗体框样式，显示信息内容
          marker.on('mouseover', this.markerHover);
          // marker.emit('mouseover', {target: marker});
        })
        this.map.setFitView();
      },
      markerHover(e) {
        var _this = this
        this.geocoder.getAddress(e.target.getPosition(), function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress;
            console.dir(address);
            const content = e.target.content + '<br/>地址：' + address;
            const marker = e.target
            const item = e.target.getExtData()
            console.log('extData', e.target.getExtData());
            _this.infoWindow.setContent(content)
            _this.infoWindow.open(_this.map, e.target.getPosition());
          }
        });
      },
      addDropDown(res) {
        if (res && res.length > 0) {
          res.forEach(item => {
            //默认获取自己的
            //注意从cookie里面拿出来默认是string
            if (item.uid == this.$store.state.user.userId) {
              this.currentUser = item
              //设为中心 显示信息
              this.map.setCenter([item.lng, item.lat])
            }
          })
        }
      },
      onUsersClick(index) {
        const item = this.data[index]
        this.currentUser = item
        //设为中心
        this.map.setCenter([item.lng, item.lat])
      },
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
