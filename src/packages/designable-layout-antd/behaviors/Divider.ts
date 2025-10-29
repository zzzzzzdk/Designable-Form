import { createBehavior } from '@/packages/designable-core';
import { Divider as DividerSchema } from '../schemas/Divider';
import { Divider as DividerLocales } from '../locales/Divider';

export const DividerBehavior = createBehavior({
  name: 'Divider',
  selector: (node) => node.componentName === 'Divider',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: DividerSchema(),
  },
  designerLocales: DividerLocales || {},
});