import { createBehavior } from '@/packages/designable-core';
import FlexSchemaFn from '../schemas/Flex';

export default createBehavior({
  name: 'Flex',
  extends: ['Component'],
  selector: (node) => node.componentName === 'Flex',
  designerProps: {
    draggable: true,
    droppable: true,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: FlexSchemaFn(),
  },
});