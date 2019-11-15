<template>
  <Layout style="height: 100%" class="main">
    <Sider ref="sider" class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
      <div class="logo-con">
        <img v-show="!isCollapsed" :src="maxLogo" class="max-logo" key="max-logo"/>
        <img v-show="isCollapsed" :src="minLogo" class="min-logo" key="min-logo"/>
      </div>
      <!--      展开状态-->
      <Menu class="open-menu" ref="menu" :active-name="$route.name" theme="dark" width="auto" v-show="!isCollapsed"
            @on-select="turnToPage">
        <template v-for="item in menuList">
          <!--          有children且只有1个-->
          <template v-if="item.children && item.children.length===1">
            <MenuItem :name='item.children[0].name'>
              <Icon :type="item.children[0].meta.icon"></Icon>
              <span>{{showTitle(item.children[0])}}</span>
            </MenuItem>
          </template>
          <template v-else>
            <!--            有children 大于1个嵌套-->
            <template v-if="item.children && item.children.length>1">
              <Submenu :name='item.name'>
                <template slot="title">
                  <Icon :type="item.meta.icon || ''"/>
                  <Span>{{showTitle(item) }}</Span>
                </template>
                <template v-for="subitem in item.children">
                  <MenuItem :name="subitem.name">
                    <Icon :type="subitem.meta.icon"></Icon>
                    <Span>{{showTitle(subitem)}}</Span>
                  </MenuItem>
                </template>
              </Submenu>
            </template>
            <!--            没有children-->
            <template v-else>
              <MenuItem :name='item.name'>
                <Icon :type="item.meta.icon"></Icon>
                <Span>{{showTitle(item)}}</Span>
              </MenuItem>
            </template>

          </template>

        </template>
      </Menu>
      <!--      收缩状态-->
      <div v-show="isCollapsed" class="close-menu">
        <template v-for="item in menuList">
          <template v-if="item.children && item.children.length>0">
            <Dropdown placement="right-start" @on-click="turnToPage" class='dropdown'>
              <a type="text" class="drop-menu-a">
                <Icon :type="item.meta.icon"></Icon>
              </a>
              <template v-for="subitem in item.children">
                <DropdownMenu slot="list">
                  <DropdownItem :name="subitem.name">
                    <a type="text" class="drop-item-a">
                      <Icon :type="subitem.meta.icon"></Icon>
                      <span>{{showTitle(subitem)}}</span>
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </template>
          <template v-else>
            <Tooltip transfer placement="right" :content="showTitle(item)">
              <a @click="turnToPage(item.name)" type="text" class="drop-menu-a">
                <Icon :type="item.meta.icon"></Icon>
              </a>
            </Tooltip>
          </template>
        </template>
      </div>
    </Sider>
    <layout>
      <Header class="header" :style="{padding:0}">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin:'0 20px'}" type='md-menu'
              size="24"></Icon>
        <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
        <div class="header-right">
          <user :message-unread-count="10" :user-avatar="userAvatar" :user-name="userName"/>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </div>
      </Header>
      <Content class="content">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </Content>
      <Footer class="footer">Footer</Footer>
    </layout>
  </Layout>
</template>

<script>
  import './main.less'
  import minLogo from '@/assets/images/logo-min.jpg'
  import maxLogo from '@/assets/images/logo.jpg'
  import {mapActions, mapGetters, mapMutations} from "vuex";
  import routers from '@/router/routers'
  import mixin from './mixin'
  import customBreadCrumb from './custom-bread-crumb'
  import User from './user'
  import Fullscreen from './fullscreen'

  export default {
    name: "Main",
    mixins: [mixin],
    components: {
      customBreadCrumb,
      User,
      Fullscreen,
    },
    data() {
      return {
        isCollapsed: false,
        minLogo,
        maxLogo,
        isFullscreen: false
      }
    },
    computed: {
      ...mapGetters([
        'errorCount'
      ]),
      breadCrumbList() {
        return this.$store.state.app.breadCrumbList
      },
      rotateIcon() {
        return [
          'menu-icon', this.isCollapsed ? 'rotate-icon' : ''
        ]
      },
      hasReadErrorPage() {
        return this.$store.state.app.hasReadErrorPage
      },
      menuList() {
        return this.$store.getters.menuList
      },
      unreadCount() {
        return this.$store.state.user.unreadCount
      },
      userAvatar() {
        return this.$store.state.user.avatarImgPath
      },
      userName() {
        return this.$store.state.user.userName
      }
    },
    methods: {
      ...mapMutations([
        'setBreadCrumb',
        'setHomeRoute'
      ]),
      ...mapActions([]),
      turnToPage(route) {
        let {name, params, query} = {}
        if (typeof route === 'string') name = route
        else {
          name = route.name
          params = route.params
          query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
        }
        this.$router.push({
          name,
          params,
          query
        }, complete => {
          console.log('complete')
        }, err => {
          console.log('err')
          //如果出错回退菜单按钮点击
          this.$refs.menu.currentActiveName = this.$route.name
        })
      },
      collapsedSider() {
        this.$refs.sider.toggleCollapse();
      }
    },
    watch: {
      '$route'(newRoute) {
        const {name, params, query, meta} = newRoute
        this.setBreadCrumb(newRoute)
      }
    },
    mounted() {
      this.setHomeRoute(routers);
      this.setBreadCrumb(this.$route)
      console.log(this.$route)
      console.log(this.$router)
    },

  }
</script>

<style scoped>
</style>
