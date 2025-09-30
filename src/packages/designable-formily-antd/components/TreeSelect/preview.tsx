import React from 'react';
import { TreeSelect as FormilyTreeSelect } from '@formily/antd-v5';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { planepoint } from '@turf/turf';

export const TreeSelect: DnFC<React.ComponentProps<typeof FormilyTreeSelect>> =
  FormilyTreeSelect;

TreeSelect.Behavior = createBehavior({
  name: 'TreeSelect',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TreeSelect',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.TreeSelect, AllSchemas.FormItem, { includeEnum: true }),
  },
  designerLocales: AllLocales.TreeSelect,
});

TreeSelect.Resource = createResource({
  icon: 'TreeSelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'TreeSelect',
        'x-decorator': 'FormItem',
        'x-component': 'TreeSelect',
        'x-component-props': {
          placeholder: '请选择',
        },
      },
    },
  ],
});
