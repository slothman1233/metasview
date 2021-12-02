<template>
  <div class="layout-header">
    <div class="container header">
      <a href="/" class="logo">
        <img src="/assets/image/logo.png" />
      </a>

      <div class="navlist">
        <a href="/">{{ layout.home }}</a>
        <a href="/">{{ layout.game }}</a>
        <a href="/">{{ layout.ICO }}</a>
        <a href="/">{{ layout.consult }}</a>
        <a href="/">{{ layout.exposure }}</a>
      </div>

      <div class="user">{{ layout.loginIn }}</div>
    </div>
  </div>
</template>

<script scoped lang="ts">
  // import { reactive, toRefs } from 'vue';
  // import { useStore } from 'store/index';
  // interface State {
  //   isCollapseWidth: boolean;
  // }
  import { getLanguage } from '@/common/utils/libs/language';
  export default {
    name: 'layoutHeader',
    components: {},
    setup() {
      const lang = getLanguage();

      return {
        layout: lang.layout,
      };
    },
  };
</script>

<style lang="less">
  .layout-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9900;
    width: 100%;
    height: @headerHeight;
    background-color: @default_color;
    border-bottom: 1px solid @border_color;
    color: #fff;
  }
  .container {
    width: @DefindWidth;
    margin: 15px auto;
    display: flex;
    @size: 34px;
    .logo {
      height: @size;
      img {
        height: @size;
      }
    }

    .navlist {
      flex-grow: 1;
      line-height: @size;
      a {
        padding: 0 20px;
        .fade_color(#fff);
        font-size: @font_size_16;
      }
    }

    .user {
      line-height: @size;
      height: @size;
      padding: 0 20px;
      background-color: @theme_color_1;
      .lighten_color(@theme_color_1, background-color, 10%);
      cursor: pointer;
    }
  }
</style>
