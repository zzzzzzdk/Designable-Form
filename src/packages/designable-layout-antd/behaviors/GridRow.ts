import { createBehavior } from '@/packages/designable-core';
import GridRowSchemaFn from '../schemas/GridRow';

export default createBehavior({
  name: 'GridRow',
  extends: ['Component'],
  selector: (node) => node.componentName === 'GridRow',
  designerProps: {
    draggable: true,
    droppable: true,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: GridRowSchemaFn(),
  },
});