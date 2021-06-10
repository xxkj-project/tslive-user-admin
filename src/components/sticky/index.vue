<template>
  <div :style="{ height, zIndex }">
    <div
      :class="className"
      :style="{ top: (isSticky ? actualTop + 'px' : ''), zIndex, position, width, height }"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  computed: {
    ...mapState({
      fixedHeader: state => state.settings.fixedHeader
    }),
    actualTop () {
      let top = this.stickyTop
      if (this.fixedHeader) {
        const headerHeight = document.querySelector('.fixed-header').offsetHeight
        top = top + headerHeight
      }
      return top
    }
  },
  mounted () {
    this.height = this.$el.getBoundingClientRect().height + 'px'
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated () {
    this.handleScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sticky () {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    handleReset () {
      if (!this.active) {
        return
      }
      this.reset()
    },
    reset () {
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    handleScroll () {
      const width = this.$el.getBoundingClientRect().width
      this.width = width || 'auto'
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.actualTop) {
        this.sticky()
        return
      }
      this.handleReset()
    },
    handleResize () {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>
