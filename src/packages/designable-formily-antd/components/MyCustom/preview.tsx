import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createVoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { useField } from '@formily/react';

export const MyCustom: DnFC<{ value?: string }> = (props) => {
  const field = useField();
  // console.log('MyCustom field', field);
  // value 可能在 props.xComponentProps 或 props.value
  const xComponentProps = field['componentProps'] || {};
  const value = props.value ?? xComponentProps.value ?? '这里是自定义内容';
  // console.log('MyCustom value', value);
  const { className, style, ...rest } = props as any;
  const selected = className?.includes('dn-selected');
  return (
    <div
      {...rest}
      className={className}
      style={{
        padding: 8,
        border: '1px solid #eee',
        borderRadius: 4,
        background: selected ? '#e6f7ff' : '#fff',
        boxShadow: selected ? '0 0 0 2px #1890ff' : undefined,
        ...(style || {}),
      }}
      title={value}
    >
      {value}
    </div>
  );
};

MyCustom.Behavior = createBehavior({
  name: 'MyCustom',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'MyCustom',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.MyCustom),
  },
  designerLocales: AllLocales.MyCustom,
});

MyCustom.Resource = createResource({
  icon: 'Component',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'MyCustom',
        'x-component-props': {
          value: '自定义内容111',
        },
      },
    },
  ],
});
