<template>
  <Layout style="height: 100%" class="main">
    <Sider ref="sider" class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
      <div class="logo-con">
        <img v-show="!isCollapsed" :src="maxLogo" class="max-logo" key="max-logo"/>
        <img v-show="isCollapsed" :src="minLogo" class="min-logo" key="min-logo"/>
      </div>
      <!--      展开状态-->
      <Menu class="open-menu" :active-name="$route.name" theme="dark" width="auto" v-show="!isCollapsed" @on-select="turnToPage">
        <template v-for="item in menuList">
          <!--          有children且只有1个-->
          <template v-if="item.children && item.children.length===1">
            <MenuItem :name='item.children[0].name'>
              <Icon :type="item.children[0].meta.icon"></Icon>
              <span>{{item.children[0].meta.title}}</span>
            </MenuItem>
          </template>
          <template v-else>
            <!--            有children 大于1个嵌套-->
            <template v-if="item.children && item.children.length>1">
              <Submenu :name='item.name'>
                <template slot="title">
                  <Icon :type="item.meta.icon || ''"/>
                  <Span>{{item.meta.title }}</Span>
                </template>
                <template v-for="subitem in item.children">
                  <MenuItem :name="subitem.name">
                    <Icon :type="subitem.meta.icon"></Icon>
                    <Span>{{subitem.meta.title }}</Span>
                  </MenuItem>
                </template>
              </Submenu>
            </template>
            <!--            没有children-->
            <template v-else>
              <MenuItem :name='item.name'>
                <Icon :type="item.meta.icon"></Icon>
                <Span>{{item.meta.title }}</Span>
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
                      <span>{{subitem.meta.title}}</span>
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </template>
          <template v-else>
            <Tooltip transfer placement="right" :content="item.meta.title">
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
        <Icon @click.native="turnToPage('home')" :style="{margin:'0 20px'}" type='md-home'
              size="24"></Icon>
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
      menuList() {
        return this.$store.getters.menuList
      },
    },
    methods: {
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
