<template>
  <div class="tags-nav">
    <div class="btn-con left-button">
      <Button type="text" @click="handleScroll(240)">
        <Icon type="ios-arrow-back" :size="18"/>
      </Button>
    </div>
    <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
    </ul>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{marginLeft:tagBodyLeft+'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag
            v-for="(item,index) in list"
            type="dot"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            @click.native="handleClick(item)"
            @on-close="handleClose(item)"
            :data-route-item="item"
            :closable="item.name !== $config.homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            @contextmenu.prevent.native="contextMenu(item, $event)"
          >
            {{showTitleInside(item)}}
          </Tag>
        </transition-group>
      </div>
    </div>
    <div class="btn-con right-button">
      <Button type="text" @click="handleScroll(-240)">
        <Icon type="ios-arrow-forward" :size="18"/>
      </Button>
    </div>
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="height: 100%">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline"/>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>

</template>

<script>
  import './tags-nav.less'
  import {routeEqual, showTitle} from "@/libs/util";
  import beforeClose from '@/router/before-close'

  export default {
    name: "tags-nav",
    props: {
      value: Object,
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        tagBodyLeft: 0,
        contextMenuLeft: 0,
        contextMenuTop: 0,
        visible: false,
        menuList: {
          others: '关闭其他',
          all: '关闭所有'
        }
      }
    },
    methods: {
      handlescroll(e) {
        var type = e.type
        let delta = 0
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
        }
        this.handleScroll(delta)
      },
      handleScroll(offset) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth
        const bodyWidth = this.$refs.scrollBody.offsetWidth

        console.log("outerWidth:" + outerWidth)
        console.log("bodyWidth:" + bodyWidth)
        console.log("offset:" + offset)

        if (offset > 0) {
          this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
        } else {
          if (outerWidth < bodyWidth) {
            if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
              this.tagBodyLeft = this.tagBodyLeft
            } else {
              this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
            }
          } else {
            this.tagBodyLeft = 0
          }
        }
        console.log("tagBodyLeft:" + this.tagBodyLeft)
      },
      showTitleInside(item) {
        return showTitle(item, this)
      },
      isCurrentTag(item) {
        return routeEqual(this.currentRouteObj, item)
      },
      moveToView(tag) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth
        const bodyWidth = this.$refs.scrollBody.offsetWidth

        console.log("outerWidth:" + outerWidth)
        console.log("bodyWidth:" + bodyWidth)

        if (bodyWidth < outerWidth) {
          this.tagBodyLeft = 0
        } else if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft
        } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
          // 标签在可视区域
          this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft)
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - tag.offsetWidth))
        }

        console.log("tagBodyLeft:" + this.tagBodyLeft)
      },
      handleClose(current) {
        if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
          new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
            if (close) {
              this.close(current)
            }
          })
        } else {
          this.close(current)
        }
      },
      close(route) {
        let res = this.list.filter(item => !routeEqual(route, item))
        this.$emit('on-close', res, undefined, route)
      },
      handleClick(item) {
        this.$emit('input', item)
      },
      handleTagsOption(type) {
        if (type.includes('all')) {
          // 关闭所有，除了home
          let res = this.list.filter(item => item.name === this.$config.homeName)
          this.$emit('on-close', res, 'all')
        } else if (type.includes('others')) {
          // 关闭除当前页和home页的其他页
          let res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === this.$config.homeName)
          this.$emit('on-close', res, 'others', this.currentRouteObj)
          setTimeout(() => {
            this.getTagElementByRoute(this.currentRouteObj)
          }, 100)
        }
      },
      getTagElementByRoute(route) {
        this.$nextTick(() => {
          this.refsTag = this.$refs.tagsPageOpened
          this.refsTag.forEach((item, index) => {
            if (routeEqual(route, item.$attrs['data-route-item'])) {
              let tag = this.refsTag[index].$el
              this.moveToView(tag)
            }
          })
        })
      },
      contextMenu(item, e) {
        if (item.name === this.$config.homeName) {
          return
        }
        this.visible = true
        this.contextMenuLeft = e.clientX
        this.contextMenuTop = e.clientY
      },
      closeMenu() {
        this.visible = false
      }
    },
    watch: {
      '$route'(to) {
        this.getTagElementByRoute(to)
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }

    },
    computed: {
      currentRouteObj() {
        const {name, params, query} = this.value
        return {name, params, query}
      }
    },
    mounted() {
      setTimeout(() => {
        this.getTagElementByRoute(this.$route)
      }, 200)
    }
  }
</script>

<style scoped>

</style>
