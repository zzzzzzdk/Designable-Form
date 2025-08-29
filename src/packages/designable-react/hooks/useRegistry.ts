import { GlobalRegistry, IDesignerRegistry } from '@/packages/designable-core';
import { globalThisPolyfill } from '@/packages/designable-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
