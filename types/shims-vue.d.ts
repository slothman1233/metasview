import { indexModel as languageModel } from '../publicommon/language/model/index';

declare module '*.vue' {
  import { defineComponent, DefineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;

  const component: DefineComponent<{}, {}, any>;

  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $configModel: clientEnv; // configModel
      //语言
      $languageobject: languageModel;
      $ELEMENT: object;
      $myMeta: any;
    }
  }

  export default Component;
}
