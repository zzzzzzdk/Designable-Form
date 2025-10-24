import { createBehavior } from '@/packages/designable-core';
import GridColSchemaFn from '../schemas/GridCol';

export default createBehavior({
  name: 'GridCol',
  extends: ['Component'],
  selector: (node) => node.componentName === 'GridCol',
  designerProps: {
    draggable: true,
    droppable: true,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: GridColSchemaFn(),
  },
});