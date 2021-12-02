import { createSSRApp, createApp as _createApp } from 'vue';
import App from './App';
import { setupAxios } from './common/utils/libs/axios';

import { setupRouter } from './router'; // 路由
import { setupElementPlus } from './common/utils/libs/element';
import { setupVant } from './common/utils/libs/vant';
import { setupStore } from './store';

import './styles/plugin/index.less';
import './styles/public/index.less';
import { setupGlobalCom } from 'comps/index';
import 'virtual:svg-icons-register';

//不能修改
import env from '@/common/config/dev';

import { setupConfigmodel } from './common/utils/libs/configmodel';

import setupLanguage from './common/utils/libs/language';
import { setupMeta } from './common/utils/libs/meta';

export function createApp(ssr: boolean) {
  const app = ssr ? createSSRApp(App) : _createApp(App);

  setupLanguage(app);

  setupRouter(app); // 引入路由

  setupStore(app); // 引入状态管理

  setupElementPlus(app); // 引入element组件

  setupVant(app); // 引入vant组件

  setupGlobalCom(app); // 注册全局公用组件

  setupAxios(app); //axios  全局注入

  setupMeta(app); // ssr meta 注入

  setupConfigmodel(app, env); //注入全局配置文件

  return app;
}
