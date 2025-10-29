import { createBehavior } from '@/packages/designable-core';
import { Title as TitleSchema } from '../schemas/Title';
import { Title as TitleLocales } from '../locales/Title';

export const TitleBehavior = createBehavior({
  name: 'Title',
  selector: (node) => node.componentName === 'Title',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: TitleSchema(),
  },
  designerLocales: TitleLocales || {},
});