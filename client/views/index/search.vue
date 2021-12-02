<template>
  <el-tabs type="border-card" class="tabs" @tab-click="tabClick">
    <el-tab-pane v-for="{ title, content, icon } in items" :key="title">
      <template #label>
        <span>
          <el-icon>
            <component :is="icon"> </component>
          </el-icon>
          {{ title }}
        </span>
      </template>
      <div class="autocomplete_box">
        <Autocomplete :placeholder="content" class="autocomplete" />
        <el-button type="success" class="button">{{ lang.search }}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import setupData from '@/common/utils/libs/setupData';

  import { defineComponent } from 'vue';
  import { tabsType } from './index.vue';
  import Autocomplete from './autocomplete.vue';
  import { getLanguage } from '@/common/utils/libs/language';

  export default defineComponent({
    name: 'IndexSearch',
    components: { Autocomplete },
    props: {
      tabs: {
        require: true,
        type: Array,
      },
    },
    setup(prop) {
      const { pageindex } = getLanguage();
      const tabClick = function (tab: any, event: any) {
        console.log(tab.index);
      };
      return {
        items: prop.tabs as tabsType[],
        tabClick,
        lang: pageindex,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tabs {
    width: @DefindWidth;
    margin: 0 auto;
    background-color: transparent;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    border: none;

    :deep(.el-tabs__header) {
      @height: 50px;
      height: @height;
      border: none;
      background-color: hsla(0, 0%, 100%, 0.1);
      .el-tabs__nav-wrap {
        height: @height;
      }
      .el-tabs__nav {
        .el-tabs__item {
          &:first-child {
            padding-left: 40px;
          }

          .fade_color(#fff);

          margin: 0;
          padding: 0 30px;
          height: @height;
          line-height: @height;
          font-size: @font_size_16;

          border: none;

          &.is-active {
            color: #222;
          }

          .el-icon {
            font-size: @font_size_22;
            position: relative;
            top: 4px;
            margin-right: 3px;
          }
        }
      }
    }

    :deep(.el-tabs__content) {
      height: 90px;
      padding: 20px;
      background-color: #fff;
      box-sizing: border-box;
    }
  }

  .autocomplete_box {
    position: relative;
    .autocomplete {
      padding-right: 150px;
      box-sizing: border-box;
    }

    .button {
      position: absolute;
      right: 0;
      top: 0;
      height: 40px;
      width: 150px;
      border-radius: 0;
      .fade_color(#60c86d,background);

      :deep(span) {
        font-size: @font_size_16;
      }
    }
  }
</style>
