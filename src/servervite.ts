import fs from 'fs';
import koa from 'koa';
import path from 'path';
import vite, { createServer as viteCreateServer } from 'vite';
import { Request } from 'koa';
import koaConnect from './common/utils/koa2-connect';

const root = '../';
// const express = require('express');

// 替换 node Promise，优化项，非必需
// global.Promise = require('bluebird')

const resolve = (p: string) => path.resolve(__dirname, root, p);
/**
 * 是否使用对象池
 * @type {boolean}
 */
const usePool = true;

// 环境
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev:seo';
const isTest = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:seo';
const isPre = process.env.NODE_ENV === 'pre' || process.env.NODE_ENV === 'pre:seo';
const isMock = process.env.NODE_ENV === 'mock' || process.env.NODE_ENV === 'mock:seo';
const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'prod:seo';
const isBuild =
  ['dev:start', 'test:start', 'pre:start', 'prod:start', 'mock:start'].indexOf(
    process.env.NODE_VITE,
  ) >= 0;
const isSeo =
  ['dev:seo', 'test:seo', 'pre:seo', 'prod:seo', 'mock:seo', 'mock:seo'].indexOf(
    process.env.NODE_ENV,
  ) >= 0;

/**
 * 复制 vitedist 文件至 run 文件夹下
 * @returns {void}
 */
function cp2run() {
  function copy(from: string, to: string) {
    const files = fs.readdirSync(from);
    for (const i in files) {
      //   files.hasOwnProperty(i);
      if (Object.prototype.hasOwnProperty.call(files, i)) {
        const _src = path.join(from, files[i]);
        const _run = path.join(to, files[i]);

        const _srcStat = fs.statSync(_src);
        if (_srcStat.isDirectory()) {
          if (!fs.existsSync(_run)) {
            fs.mkdirSync(_run);
          }
          copy(_src, _run);
        } else if (_srcStat.isFile()) {
          fs.copyFileSync(_src, _run);
        }
      }
    }
  }
  if (!fs.existsSync(resolve('run'))) {
    fs.mkdirSync(resolve('run'));
  }
  copy(resolve('vitedist'), resolve('run'));
}

/**
 * 判断是否是爬虫
 * @param req
 * @returns {boolean}
 */
function isSpider(req: Request) {
  // 根据 UA 判断
  // 如果需要防止伪造 UA，还可以继续使用 host 反查
  const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLocaleLowerCase() : '';
  return ua.indexOf('spider') >= 0 || ua.indexOf('bot') >= 0;
}

export default async function createServer(app: koa<koa.DefaultState, koa.DefaultContext>) {
  let vites: vite.ViteDevServer,
    seoRender: NodeRequire,
    spaTemplate: string,
    seoTemplate: string,
    manifest: any;
  if (!isBuild) {
    let mode = 'dev';
    if (isDev) {
      mode = 'dev';
    } else if (isTest) {
      mode = 'test';
    } else if (isPre) {
      mode = 'pre';
    } else if (isMock) {
      mode = 'mock';
    } else {
      mode = 'prod';
    }
    vites = await viteCreateServer({
      root: process.cwd(),
      mode,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });

    // // 使用 vite 的 Connect 实例作为中间件
    app.use(koaConnect(vites.middlewares));

    manifest = {};
  } else {
    /**
     * 复制文件，原因有二：
     * 1、过渡，打包后如果删除旧文件，客户端未刷新浏览器，可能会访问出错
     * 2、防止爬虫快照访问静态资源失败
     */
    await cp2run();

    spaTemplate = fs.readFileSync(resolve('run/client/index.html'), 'utf-8');
    // SEO模版，去掉JS文件引用，爬虫不需要运行 JS，且会有 Hydration 警告，因为服务端与客户端数据不一样，非必要
    seoTemplate = spaTemplate;
    // .replace(/<script\b[^>]*>[\s\S]*<\/script>/, '')
    // .replace(/<link rel="modulepreload" \b[^>]*>/, '');

    manifest = require(resolve('run/client/ssr-manifest.json'));
    seoRender = require(resolve('run/server/entry-server.js'));
  }

  const maxLen = 10;
  const AppList: any[] = [];
  app.use(async (ctx, next) => {
    try {
      const url = ctx.originalUrl;

      // // TODO 模拟接口测试
      // if (url === '/list.json') {
      //   ctx.status = 200;
      //   ctx.type = 'text/html';
      //   ctx.body = JSON.stringify({
      //     list: ['a', 'b', 'c'],
      //   });

      //   return;
      // }

      let template, entryServer;

      if (!isBuild) {
        // 开发环境

        template = fs.readFileSync(resolve('index.html'), 'utf-8');

        template = await vites.transformIndexHtml(url, template);
        if (isSeo) {
          // SEO 同样去掉 JS 代码，否则有 Hydration 警告
          template = template.replace(
            `<script type="module" src="/client/entry-client.ts"></script>`,
            '',
          );
        } else {
          ctx.status = 200;
          ctx.type = 'text/html';
          ctx.body = template;

          return;
        }

        entryServer = await vites.ssrLoadModule(resolve('./client/entry-server.ts'));
      } else {
        // 生产环境代码 SEO 测试
        template = seoTemplate;
        entryServer = seoRender;
      }

      // else if (isSeo) {
      //   // 生产环境代码 SEO 测试

      //   template = seoTemplate;
      //   entryServer = seoRender;
      // }
      //  else {
      //   // idProd
      //   // 生产环境代码
      //   if (await isSpider(ctx.request)) {
      //     template = seoTemplate;
      //   } else {
      //     ctx.status = 200;
      //     ctx.type = 'text/html';
      //     ctx.body = spaTemplate;

      //     return;
      //   }
      //   entryServer = seoRender;
      // }

      // SSR 渲染

      // 获取实例
      let vm;
      if (usePool) {
        vm = AppList.shift();
        if (!vm) {
          vm = entryServer.createApp();
        }
      } else {
        vm = entryServer.createApp();
      }

      /**
       * appHtml HTML 代码
       * preloadLinks 头部 Links （html）
       * meta 头部 meta 信息（html）
       */
      const [appHtml, preloadLinks, meta] = await entryServer.render(vm, url, manifest);

      // 保存实例
      if (AppList.length < maxLen) {
        AppList.push(vm);
      }

      const html = template
        .replace(`<!--meta-->`, meta)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      ctx.status = 200;
      ctx.type = 'text/html';
      ctx.body = html;
    } catch (e) {
      console.log(e.stack);
      ctx.status = 500;
      ctx.body = e.stack;
      //   res.status(500).end(e.stack);
    }
  });

  return app;
}
