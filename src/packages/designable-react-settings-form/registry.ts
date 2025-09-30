import loader from '@monaco-editor/loader';

const Registry = {
  cdn: '//cdn.jsdelivr.net/npm',
};

export const setNpmCDNRegistry = () => { // registry: string 
  // Registry.cdn = registry;
  
  // 使用相对路径确保本地与线上环境的加载路径一致
  // 这种方式会根据当前页面的基础路径自动调整
  loader.config({
    paths: {
      // vs: `${registry}/monaco-editor@0.30.1/min/vs`,
      vs: './static/monaco/monaco-editor@0.30.1/min/vs',
    },
  });
};

export const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '');
