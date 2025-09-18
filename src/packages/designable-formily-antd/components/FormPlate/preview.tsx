import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { Plate } from './Plate'

export const FormPlate: DnFC<
  React.ComponentProps<typeof Plate>
> = Plate;
// 为FormPlate组件添加Behavior属性
FormPlate.Behavior = createBehavior({
  name: 'FormPlate',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'FormPlate', 
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.FormPlate),
  },
  designerLocales: AllLocales.FormPlate,
});

// 为FormPlate组件添加Resource
FormPlate.Resource = createResource({
  icon: <div>车牌组件</div>,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'FormPlate',
        'x-decorator': 'FormItem',
        'x-component': 'FormPlate', // 确保这里使用大写的'FormPlate'
      },
    },
  ],
});
