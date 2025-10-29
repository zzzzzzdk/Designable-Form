import { createBehavior } from '@/packages/designable-core';
import { Paragraph as ParagraphSchema } from '../schemas/Paragraph';
import { Paragraph as ParagraphLocales } from '../locales/Paragraph';

export const ParagraphBehavior = createBehavior({
  name: 'Paragraph',
  selector: (node) => node.componentName === 'Paragraph',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: ParagraphSchema(),
  },
  designerLocales: ParagraphLocales || {},
});