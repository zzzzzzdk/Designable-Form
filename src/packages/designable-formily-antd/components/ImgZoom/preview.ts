import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC, useCssInJs } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import ImgZoomComponent from './ImgZoom';
import { genImgZoomStyle } from './styles';
import type { ImgZoomProps } from './interface';

// 为设计器提供的ImgZoom组件
export const ImgZoom: DnFC<ImgZoomProps> = (props) => {
  const prefix = 'img-zoom';
  const { hashId, wrapSSR } = useCssInJs({ prefix, styleFun: genImgZoomStyle });
  
  return wrapSSR(
    React.createElement(ImgZoomComponent, {
      ...props,
      className: hashId
    })
  );
};

// 定义组件行为
ImgZoom.Behavior = createBehavior({
  name: 'ImgZoom',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'ImgZoom',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.ImgZoom),
  },
  designerLocales: AllLocales.ImgZoom,
});

// 定义组件资源
ImgZoom.Resource = createResource({
  icon: "Component",
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'ImgZoom',
        'x-decorator': 'FormItem',
        'x-component': 'ImgZoom',
      },
    },
  ],
});