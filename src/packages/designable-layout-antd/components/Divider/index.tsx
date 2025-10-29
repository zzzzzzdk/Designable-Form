import React from 'react';
import { Divider as AntDivider } from 'antd';
import { createBehavior, createResource } from '@/packages/designable-core';
import { AllSchemas } from '@/packages/designable-layout-antd/schemas';
import { AllLocales } from '@/packages/designable-layout-antd/locales';
import type { DnFC } from '@/packages/designable-react';

export interface DividerProps extends React.ComponentProps<typeof AntDivider> {
  children?: React.ReactNode;
}

export const Divider: DnFC<DividerProps> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <div style={{ 
      minHeight: '20px', 
      padding: '8px 0',
      border: '1px dashed #ccc',
      borderRadius: '4px'
    }}>
      <AntDivider {...rest}>
        {children}
      </AntDivider>
    </div>
  );
};

Divider.Behavior = createBehavior({
  name: 'Divider',
  selector: (node) => node.componentName === 'Divider',
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    resizable: false,
    propsSchema: AllSchemas.Divider(),
  },
  designerLocales: AllLocales.Divider,
});

Divider.Resource = createResource({
  icon: 'DividerSource',
  elements: [
    {
      componentName: 'Divider',
      props: {},
    },
    {
      componentName: 'Divider',
      props: {
        dashed: true,
        orientation: 'center',
        children: '分割线',
      },
    },
  ],
});

export const Preview: React.FC<DividerProps> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <AntDivider {...rest}>
      {children}
    </AntDivider>
  );
};

export default Divider;