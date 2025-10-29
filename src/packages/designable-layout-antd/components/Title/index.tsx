import React from 'react';
import { Typography } from 'antd';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { AllSchemas } from '@/packages/designable-layout-antd/schemas';
import { AllLocales } from '@/packages/designable-layout-antd/locales';

const { Title: AntTitle } = Typography;

export interface TitleProps extends React.ComponentProps<typeof AntTitle> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  ellipsis?: boolean | {
    rows?: number;
    expandable?: boolean;
    symbol?: string;
  };
  editable?: boolean;
}

export const Title: DnFC<TitleProps> = (props) => {
  const { children = '标题内容', level = 3, ...rest } = props;
  
  return (
    <AntTitle 
      level={level}
      {...rest}
      style={{ 
        ...rest.style,
        border: '1px dashed #d9d9d9',
        borderRadius: '4px',
        padding: '8px',
      }}
    >
      {children}
    </AntTitle>
  );
};

Title.Behavior = createBehavior({
  name: 'Title',
  selector: (node) => node.componentName === 'Title',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: AllSchemas.Title(),
  },
  designerLocales: AllLocales.Title,
});

Title.Resource = createResource({
  icon: 'TitleSource',
  elements: [
    {
      componentName: 'Title',
      props: {
        children: '标题内容',
        level: 3,
      },
    },
  ],
});

export default Title;