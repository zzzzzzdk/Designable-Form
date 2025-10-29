import { createBehavior } from '@/packages/designable-core';
import { Component as ComponentLocales } from '../locales/Component';

export const ComponentBehavior = createBehavior({
  name: 'Component',
  selector: (node) => node.componentName === 'Component',
  designerProps: {
    draggable: true,
    droppable: true,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: {},
  },
  designerLocales: ComponentLocales || {},
});
