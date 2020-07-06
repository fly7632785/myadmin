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
              <template v-for="(item,index) in this.users">
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
          <i-col span="6">
            日期范围：
            <Date-picker type="daterange" @on-change="this.pickDate" @on-ok="this.pickDateOk" confirm
                         placement="bottom-end" placeholder="选择日期" style="width: 140px"></Date-picker>
          </i-col>
          <Button @click="this.startAnimation">开始轨迹
          </Button>
          <Button @click="this.stopAnimation">停止轨迹
          </Button>
        </Row>
      </Card>
    </div>
    <div id="map"></div>
  </div>
</template>

<script src="//webapi.amap.com/ui/1.1/main.js"></script>
<script>

  import './gps-history.less'
  import AMap from 'AMap'
  import {mapActions, mapGetters} from "vuex";
  import personLogo from '@/assets/images/person.png'
  import {Message} from 'iview'

  export default {
    name: "gps-history",
    data() {
      return {
        map: {},
        marker: {},
        users: [],
        currentUser: {},
        startTime: {
          type: Number,
        },
        endTime: {
          type: Number,
        },
        followPath: [],
      }
    },
    methods: {
      ...mapActions([
        'getAllNowGps',
        'handleGetAllUsers',
        'getGpsHis',
      ]),
      initMap() {
        console.log("initMap")
        const map = new AMap.Map('map', {
          resizeEnable: true,
          zoom: 13
        })
        this.map = map
        map.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
        })
      },
      allUsers() {
        this.handleGetAllUsers().then(res => {
          console.log("users", JSON.stringify(res))
          let users = [];
          users = res;
          this.users = users
          if (res && users.length > 0) {
            users.forEach(item => {
              //默认获取自己的
              //注意从cookie里面拿出来默认是string   == 就可以比较
              console.log("this.$store.state.user.userId", this.$store.state.user.userId)
              console.log("item.uid.toString()", item.uid.toString())
              console.log("this.$store.state.user.userId", typeof this.$store.state.user.userId)
              console.log("item.uid.toString()", typeof item.uid)
              if (item.uid == this.$store.state.user.userId) {
                console.log("===")
                this.currentUser = item
                this.selectGpsHis(item.uid)
              }
            })
          }
        })
      },
      showGpsHis(data) {
        this.map.clearMap()
        this.followPath = []

        data.forEach((item, index) => {
          const gps = [item.lng, item.lat]
          this.followPath.push(gps)
        })
        //重组数据为 [[lng,lat],[lng2,lat2]]

        if (this.followPath.length === 0) {
          Message.warning('无历史数据')
          return
        }

        this.marker = new AMap.Marker({
          map: this.map,
          position: this.followPath[0],
          icon: personLogo,
          offset: new AMap.Pixel(-15, -66),
        });

        // 绘制轨迹
        var polyline = new AMap.Polyline({
          map: this.map,
          path: this.followPath,
          showDir: true,
          strokeColor: "#28F",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
        });

        var passedPolyline = new AMap.Polyline({
          map: this.map,
          // path: this.followPath,
          strokeColor: "#AF5",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
        });

        this.marker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
        });
        this.map.setFitView()
      },
      startAnimation() {
        this.marker.moveAlong(this.followPath, 5000);
      },
      stopAnimation() {
        this.marker.stopMove()
      },
      resumeAnimation() {
        this.marker.resumeMove()
      },
      pauseAnimation() {
        this.marker.pauseMove()
      },
      selectGpsHis(uid, from, to) {
        this.getGpsHis({uid, from, to}).then(data => {
          console.log("getGpsHis", JSON.stringify(data))
          this.showGpsHis(data)
        })
      },
      onUsersClick(index) {
        const item = this.users[index]
        this.currentUser = item
        this.selectGpsHis(item.uid)
      },
      pickDate(dates) {
        console.log("startTime", dates[0])
        console.log("endTime", dates[1])
        this.startTime = Number(new Date(dates[0])) / 1000;
        this.endTime = Number(new Date(dates[1])) / 1000;
      },
      pickDateOk() {
        console.log("pickDateOk")
        console.log('startTime:', this.startTime)
        console.log('endTime:', this.endTime)
        this.selectGpsHis(this.currentUser.uid, this.startTime, this.endTime)
      }
    },
    mounted() {
      this.initMap()
      this.allUsers()
    }
  }
</script>

<style scoped>

  div {
    background: #fff;
  }
</style>
