// 按需加载element
import type { App } from 'vue';

// import {
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubMenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload,
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// } from 'element-plus'

// import locale from 'element-plus/lib/locale'
// import lang from 'element-plus/lib/locale/lang/zh-cn'

// const components = [
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubMenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload
// ]

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// ]

import ElementPlus from 'element-plus';

// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons';

export function setupElementPlus(app: App<Element>): void {
  // 设置语言
  // locale.use(lang)
  // components.forEach((component: any) => {
  //   app.component(component.name, component)
  // })

  // plugins.forEach((plugin: any) => {
  //   app.use(plugin)
  // })

  // 统一注册el-icon图标
  for (const iconName in ElIconModules) {
    app.component(ElIconModules[iconName].name, ElIconModules[iconName].render());
  }

  app.use(ElementPlus);
  // 全局配置
  app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
}
