<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  /* 50= navbar  50  */
  //  min-height: calc(100vh - 40px);
  height: calc(100vh - 74px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 40px;
  height: 100vh;
}

.hasTagsView {
  // .app-main {
  //   /* 84 = navbar + tags-view = 50 + 34 */
  //   min-height: calc(100vh - 74px);
  // }

  .fixed-header+.app-main {
    padding-top: 74px;
  }
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
