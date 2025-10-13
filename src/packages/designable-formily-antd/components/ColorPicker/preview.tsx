import React from 'react';
import { ColorPicker as AntdColorPicker } from 'antd';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

// 封装 antd 的 ColorPicker 组件
export const ColorPicker: DnFC<React.ComponentProps<typeof AntdColorPicker>> = (props) => {
  return <AntdColorPicker {...props} />
};

ColorPicker.Behavior = createBehavior({
  name: 'ColorPicker',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ColorPicker',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.ColorPicker, AllSchemas.FormItem, {
      includeDefault: true,
    }),
  },
  designerLocales: AllLocales.ColorPicker,
});

ColorPicker.Resource = createResource({
  icon: 'colorPicker',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: '颜色选择器',
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
        'x-component-props': {
          placeholder: '请选择颜色',
        },
      },
    },
  ],
});