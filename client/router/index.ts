// import { createRouter, createWebHashHistory } from 'vue-router';
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router';
import { App } from 'vue';

// const routerHistory = createWebHashHistory();

const Layout = () => import('@/layout/index.vue');

// // Auto generates routes from vue files under ./views
// // https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./views/*.vue')
// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
//   return {
//     path: name === '/home' ? '/' : name,
//     component: pages[path] // () => import('./views/*.vue')
//   }
// })

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        name: 'Index',
        meta: {
          auth: ['admin', 'test'],
          icon: 'carbon:rule-test',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页',
          index: '1',
        },
      },
    ],
  },
  {
    path: '/home',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home.vue'),
        name: 'home',
        meta: {
          auth: ['admin', 'test'],
          icon: 'carbon:rule-test',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页111',
          index: '1',
        },
      },
    ],
  },
];
const router = _createRouter({
  //@ts-ignore
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>): void {
  app.use(router);
}

export default router;

// export function createRouter() {

//     return _createRouter({
//         history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
//         routes,
//         scrollBehavior() {
//             // 始终滚动到顶部
//             return { top: 0 }
//         },
//     });
// }
