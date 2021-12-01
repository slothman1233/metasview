<template>
  <div class="layout-foot"> 2022-2023 metasview Ltd. All Rights Reserved. </div>
</template>

<script lang="ts">
  // import { getLanguage } from '@/common/utils/libs/language';
  export default {
    name: 'layoutFoot',
    components: {},
    //   setup() {
    //     const lang = getLanguage();

    //     return {
    //       layout: lang.layout,
    //     };
    //   },
  };
</script>

<style scoped lang="less">
  .layout-foot {
    position: absolute;
    bottom: 0;
    @size: @footHeight;
    height: @size;
    line-height: @size;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: @font_size_16;
    background-color: @default_color;
  }
</style>
