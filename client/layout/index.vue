<template>
  <div class="home-layout">
    <Header />

    <div>
      <router-view></router-view>
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

<style lang="less">
  body {
    padding: @headerHeight 0 @footHeight 0;
    .box-sizing();
  }
</style>
