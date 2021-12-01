<template>
  <div class="home-layout">
    <Header />

    <div class="con-box">
      <router-view class="app-con"></router-view>
    </div>

    <Foot />
  </div>
</template>

<script lang="ts">
  import Header from '@/layout/component/header.vue';
  import Foot from '@/layout/component/foot.vue';
  export default {
    name: 'DefaultLayout',
    components: { Header, Foot },
    setup() {
      return {};
    },
  };
</script>

<style scoped lang="less">
  .home-layout {
    min-height: 100%;
    display: flex;
    padding: @headerHeight 0 @footHeight 0;
    .con-box {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      box-sizing: border-box;
      .app-con {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #fff;
      }
    }
  }
</style>
