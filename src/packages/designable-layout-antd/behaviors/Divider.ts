import { createBehavior } from '@/packages/designable-core';
import DividerSchemaFn from '../schemas/Divider';

export default createBehavior({
  name: 'Divider',
  extends: ['Component'],
  selector: (node) => node.componentName === 'Divider',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: DividerSchemaFn(),
  },
});