import { MonacoInput } from '@/packages/designable-react-settings-form';
// 使用Vite的静态导入功能获取@formily/core的类型声明文件
import formilyCoreTypes from '@formily/core/dist/formily.core.all.d.ts?raw';

export interface IDependency {
  name: string;
  path: string;
}

const loadDependencies = async (deps: IDependency[]) => {
  // 直接返回预加载的静态类型声明，不再从CDN获取
  return deps.map(({ name, path }) => {
    // 根据依赖名称匹配对应的静态类型声明
    if (name === '@formily/core' && path === 'dist/formily.core.all.d.ts') {
      return {
        name,
        path,
        library: formilyCoreTypes,
      };
    }
    // 对于其他依赖，提供空的类型声明
    console.warn(`No local type declaration found for: ${name}/${path}`);
    return {
      name,
      path,
      library: '',
    };
  });
};

export const initDeclaration = async () => {
  return MonacoInput.loader.init().then(async (monaco) => {
    const deps = await loadDependencies([
      { name: '@formily/core', path: 'dist/formily.core.all.d.ts' },
    ]);
    deps?.forEach(({ name, library }) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare module '${name}'{ ${library} }`,
        `file:///node_modules/${name}/index.d.ts`,
      );
    });
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
    import { Form, Field } from '@formily/core'
    declare global {
      /*
       * Form Model
       **/
      declare var $form: Form
      /*
       * Form Values
       **/
      declare var $values: any
      /*
       * Field Model
       **/
      declare var $self: Field
      /*
       * create an persistent observable state object
       **/
      declare var $observable: <T>(target: T, deps?: any[]) => T
      /*
       * create a persistent data
       **/
      declare var $memo: <T>(callback: () => T, deps?: any[]) => T
      /*
       * handle side-effect logic
       **/
      declare var $effect: (callback: () => void | (() => void), deps?: any[]) => void
      /*
       * set initial component props to current field
       **/
      declare var $props: (props: any) => void
    }
    `,
      `file:///node_modules/formily_global.d.ts`,
    );
  });
};
