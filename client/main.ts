import { createSSRApp, createApp as _createApp } from 'vue';
import App from './App';
// import { createRouter } from './router'
import createMeta from './common/utils/libs/meta';
import createAxios from './common/utils/libs/axios';

import router, { setupRouter } from './router'; // 路由
import { setupElementPlus } from './common/utils/libs/element';
import { setupVant } from './common/utils/libs/vant';
import { setupStore } from './store';

import './styles/plugin/index.less';
import './styles/public/index.less';
import { setupGlobalCom } from 'comps/index';
import 'virtual:svg-icons-register';

//不能修改
import env from '@/common/config/dev';

import createconfigModel from './common/utils/libs/configmodel';
import createLanguage from './common/utils/libs/language';
import { languageType } from 'publicommon/enum/enums';
import setLanguage from './common/utils/libs/language';

export function createApp(ssr: boolean) {
  const app = ssr ? createSSRApp(App) : _createApp(App);
  // const router = createRouter()
  const myMeta = createMeta();
  const myAxios = createAxios();
  const configmodel = createconfigModel(env);

  app.use(router);
  app.use(myMeta, { mixin: true });
  app.use(myAxios);

  app.use(configmodel);

  setLanguage(app);

  setupRouter(app); // 引入路由

  setupStore(app); // 引入状态管理

  setupElementPlus(app); // 引入element组件

  setupVant(app); // 引入vant组件

  setupGlobalCom(app); // 注册全局公用组件

  return app;
}
