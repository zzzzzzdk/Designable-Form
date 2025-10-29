import { globalThisPolyfill } from '@/packages/designable-shared';
import * as Core from './exports';

export * from './exports';

if (globalThisPolyfill?.['Designable']?.['Core']) {
  // 兼容CommonJS环境，但在浏览器中跳过
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['Core'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].Core = Core;
}
