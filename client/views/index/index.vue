<template>
  <div class="banner_container">
    <div class="content">
      <h2>{{ lang.title }}</h2>
      <p>
        {{ lang.description }}
      </p>
    </div>
    <Search :tabs="tabs" />
  </div>
</template>

<script lang="ts">
  import { getLanguage } from '@/common/utils/libs/language';
  import setupData from '@/common/utils/libs/setupData';
  import { getrandom } from '@/services/randomDataService/randomData';
  import { defineComponent } from 'vue';
  import Search from './search.vue';

  export type tabsType = {
    title: string;
    icon: string;
    content: string;
  };

  export default defineComponent({
    name: 'ViewsIndex',
    components: { Search },
    setup(prop) {
      const { pageindex } = getLanguage();

      const tabs: tabsType[] = [
        {
          title: pageindex.game,
          icon: 'Mouse',
          content: pageindex.gameplaceholder,
        },
        {
          title: pageindex.ICO,
          icon: 'SetUp',
          content: pageindex.ICOplaceholder,
        },
      ];

      return setupData(
        {},
        {
          tabs,
          lang: pageindex,
        },
      );
    },
  });
</script>

<style scoped lang="less">
  .banner_container {
    width: 100%;
    @height: 436px;
    height: @height;
    background: url('@{ImgUrl}/banner.png') no-repeat 50% #000;
    margin: 0;
    .content {
      text-align: center;
      color: #fff;
      overflow: hidden;
      h2 {
        margin: 64px auto 40px;
        height: 60px;
        font-size: 40px;
        font-weight: 700;
        line-height: 1.5;
      }
      p {
        margin: 0 auto 60px;
        width: 1000px;
        height: 40px;
        font-weight: 400;
        line-height: 1.71;
      }
    }
  }
</style>
