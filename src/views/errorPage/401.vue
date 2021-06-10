<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          哎呀!
        </h1>
        <h2>你没有权限浏览该页面</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
              返回
            </el-button>
            <el-button class="pan-back-btn" @click="goHome">
              回到首页
            </el-button>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/images/errorPage/401.png'

export default {
  name: 'Page401',
  data () {
    return {
      // errGif: errGif + '?' + +new Date(),
      errGif: errGif,
      dialogVisible: false
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    },
    goHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    padding: 100px 0;

    h2 {
      padding: 50px 0;
    }

    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .link-type,
    .link-type:focus {
      color: #337ab7;
      cursor: pointer;

      &:hover {
        color: rgb(32, 160, 255);
      }
    }
  }
</style>
