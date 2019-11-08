<template>
  <Layout style="height: 100%" class="main">
    <Sider ref="sider" class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
      <div class="logo-con">
        <img v-show="!isCollapsed" :src="maxLogo" class="max-logo" key="max-logo"/>
        <img v-show="isCollapsed" :src="minLogo" class="min-logo" key="min-logo"/>
      </div>
      <!--展开状态-->
      <Menu :active-name="$route.name" theme="dark" width="auto" :open-names="['1']" v-show="!isCollapsed" @on-select="turnToPage">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            <Span>菜单1</Span>
          </template>
          <MenuItem name="home">
            <Icon class='micon' type="ios-navigate"></Icon>
            <Span>首页</Span>
          </MenuItem>
          <MenuItem name="login">
            <Icon type="ios-navigate"></Icon>
            <Span>退出登录</Span>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            <Span>测试</Span>
          </template>
          <MenuItem name="test1">
            <Icon type="ios-navigate"></Icon>
            <Span>测试1</Span>
          </MenuItem>
          <MenuItem name="test2">
            <Icon type="ios-navigate"></Icon>
            <Span>测试2</Span>
          </MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            <Span>菜单3</Span>
          </template>
          <MenuItem name="3-1">
            <Icon type="ios-navigate"></Icon>
            <Span>菜单3-1</Span>
          </MenuItem>
          <MenuItem name="3-2">
            <Icon type="ios-navigate"></Icon>
            <Span>菜单3-2</Span>
          </MenuItem>
        </Submenu>
      </Menu>
      <!-- 非展开状态     -->
      <div v-show="isCollapsed">
        <Dropdown ref="dropdown" placement="right-start">
          <a type="text" class="drop-menu-a">
            <Icon type="ios-navigate" class="menu-icon" size="30"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单1-1</span>
              </a>
            </DropdownItem>
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单1-2</span>
              </a>
            </DropdownItem>
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单1-3</span>
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown ref="dropdown" placement="right-start">
          <a type="text" class="drop-menu-a">
            <Icon type="ios-navigate" class="menu-icon" size="30"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单2-1</span>
              </a>
            </DropdownItem>
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单2-2</span>
              </a>
            </DropdownItem>
            <DropdownItem>
              <a type="text">
                <Icon type="ios-navigate"></Icon>
                <span>菜单2-3</span>
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown ref="dropdown" placement="right-start">
          <Tooltip transfer placement="right" content="只有一个菜单">
            <a type="text" class="drop-menu-a">
              <Icon type="ios-navigate" class="menu-icon" size="30"></Icon>
            </a>
          </Tooltip>
        </Dropdown>
      </div>
    </Sider>
    <layout>
      <Header class="header" :style="{padding:0}">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin:'0 20px'}" type='md-menu'
              size="24"></Icon>
        <Icon @click.native="turnToPage('home')" :style="{margin:'0 20px'}" type='md-home'
              size="24"></Icon>
      </Header>
      <Content class="content">
        <keep-alive >
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
  import router from "@/router";

  export default {
    name: "Main",
    data() {
      return {
        isCollapsed: false,
        minLogo,
        maxLogo,
      }
    },
    computed: {
      rotateIcon() {
        return [
          'menu-icon', this.isCollapsed ? 'rotate-icon' : ''
        ]
      },
      menuList () {
        return this.$store.getters.menuList
      },
    },
    methods: {
      turnToPage (route) {
        let { name, params, query } = {}
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
        })
      },
      collapsedSider() {
        this.$refs.sider.toggleCollapse();
      }
    },
  }
</script>

<style scoped>
</style>
