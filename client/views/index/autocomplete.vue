<template>
  <div class="autocomplete">
    <el-autocomplete
      class="autocompleteinput"
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :placeholder="placeholders"
      @select="handleSelect"
    />
    <span class="autocompleteicon">
      <el-icon>
        <Search />
      </el-icon>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'indexAutocomplete',
    props: {
      placeholder: {
        type: String,
        require: true,
        default: '',
      },
    },
    setup(prop, ctx) {
      const loadAll = () => {
        return [
          { value: 'vue', link: 'https://github.com/vuejs/vue' },
          { value: 'element', link: 'https://github.com/ElemeFE/element' },
          { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
          { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
          { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
          { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
          { value: 'babel', link: 'https://github.com/babel/babel' },
        ];
      };
      const links = ref(loadAll());

      //下拉列表
      const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
        const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
        cb(results);
      };

      const createFilter = (queryString: string) => {
        return (restaurant: any) => {
          return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
        };
      };

      //选中触发
      const handleSelect = (item: any) => {
        console.log(item);
      };

      return {
        links,
        placeholders: prop.placeholder,
        state: ref(''),
        querySearchAsync,
        createFilter,
        loadAll,
        handleSelect,
      };
    },
  });
</script>

<style lang="less" scoped>
  @height: 40px;
  .autocomplete {
    position: relative;
    margin: 5px 0;
    height: @height;
    width: 100%;
    :deep(.el-autocomplete) {
      width: 100%;
    }
    :deep(.autocompleteinput) {
      .el-input__inner {
        padding-left: 54px;
        position: relative;
        border-radius: 0;
        border-color: #c6c5c5;
        color: #333;
        height: @height;
        width: 100%;
        font-size: @font_size_16;
      }
    }
    .autocompleteicon {
      position: absolute;
      top: 0;
      -webkit-transition: all 0.3s;
      text-align: center;
      height: 100%;
      color: #c0c4cc;
      left: 5px;

      :deep(.el-icon) {
        height: 40px;
        line-height: 40px;
        position: absolute;
        font-size: 24px;
        color: #333;
        left: 15px;
        top: 0;

        svg {
          position: relative;
          top: 3px;
        }
      }
    }
  }
</style>
