import { createBehavior } from '@/packages/designable-core';
import ParagraphSchemaFn from '../schemas/Paragraph';

export default createBehavior({
  name: 'Paragraph',
  extends: ['Component'],
  selector: (node) => node.componentName === 'Paragraph',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: ParagraphSchemaFn(),
  },
});