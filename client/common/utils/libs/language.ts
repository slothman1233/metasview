import { languageType } from 'publicommon/enum/enums';
import cn from 'publicommon/language/cn';
import en from 'publicommon/language/en';
import { App, inject } from 'vue';

function createLanguage(lang: number) {
  return {
    install(app: App) {
      // axios 封装优化
      const $language = (function () {
        let langobj: languageMdoel = cn;

        switch (lang) {
          case languageType.cn:
            langobj = cn;
            break;
          case languageType.en:
            langobj = en;
            break;
          default:
            break;
        }

        //@ts-ignore
        if (!import.meta.env.SSR) {
          window.languageobject = langobj;
        }
        return langobj;
      })();
      app.provide('languageobject', $language);
      app.config.globalProperties.$languageobject = $language;
    },
  };
}

export default function setLanguage(app: App<Element>) {
  const lang = createLanguage(languageType.cn);
  app.use(lang);
}

// 获取语言
export function getLanguage(): languageMdoel {
  return inject('languageobject');
}
