import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC, useCssInJs } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import YisaMapComponent from './YisaMap';
import './YisaMap.css';
import type { YisaMapProps } from './YisaMap';

// 为设计器提供的YisaMap组件
export const YisaMap: DnFC<YisaMapProps> = (props) => {
  const prefix = 'yisa-map';
  const { hashId, wrapSSR } = useCssInJs({ prefix });
  
  return wrapSSR(
    React.createElement(YisaMapComponent, {
      ...props,
      className: hashId
    })
  );
};

// 定义组件行为
YisaMap.Behavior = createBehavior({
  name: 'YisaMap',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'YisaMap',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.YisaMap),
  },
  designerLocales: AllLocales.YisaMap,
});

// 定义组件资源
YisaMap.Resource = createResource({
  icon: "Component",
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        title: '地图选择器',
        'x-decorator': 'FormItem',
        'x-component': 'YisaMap',
      },
    },
  ],
});