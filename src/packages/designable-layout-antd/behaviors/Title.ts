import { createBehavior } from '@/packages/designable-core';
import TitleSchemaFn from '../schemas/Title';

// 直接使用schema函数，不进行额外包装
export default createBehavior({
  name: 'Title',
  extends: ['Component'],
  selector: (node) => node.componentName === 'Title',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: TitleSchemaFn(),
  },
});