import React from 'react';
import { Typography } from 'antd';
import { createBehavior, createResource } from '@/packages/designable-core';
import { AllSchemas } from '@/packages/designable-layout-antd/schemas';
import { AllLocales } from '@/packages/designable-layout-antd/locales';
import type { DnFC } from '@/packages/designable-react';

const { Paragraph: AntParagraph } = Typography;

export interface ParagraphProps extends React.ComponentProps<typeof AntParagraph> {
  children?: React.ReactNode;
}

export const Paragraph: DnFC<ParagraphProps> = (props) => {
  const { children = '这是一段默认文本内容', ...rest } = props;
  
  return (
    <div style={{ 
      minHeight: '40px', 
      padding: '8px', 
      border: '1px dashed #ccc',
      borderRadius: '4px'
    }}>
      <AntParagraph {...rest}>
        {children}
      </AntParagraph>
    </div>
  );
};

Paragraph.Behavior = createBehavior({
  name: 'Paragraph',
  selector: (node) => node.componentName === 'Paragraph',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: AllSchemas.Paragraph(),
  },
  designerLocales: AllLocales.Paragraph,
});

Paragraph.Resource = createResource({
  icon: 'ParagraphSource',
  elements: [
    {
      componentName: 'Paragraph',
      props: {
        children: '这是一段默认文本内容',
      },
    },
  ],
});

export const Preview: React.FC<ParagraphProps> = (props) => {
  const { children = '这是一段默认文本内容', ...rest } = props;
  
  return (
    <AntParagraph {...rest}>
      {children}
    </AntParagraph>
  );
};

export default Paragraph;