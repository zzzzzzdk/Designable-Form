import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC, useCssInJs } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import CheckableTagComponent from './CheckableTag';
import { genCheckableTagStyle } from './styles';
import type { CheckableTagProps } from './interface';

// 为设计器提供的CheckableTag组件
export const CheckableTag: DnFC<CheckableTagProps> = (props) => {
  const prefix = 'checkable-tag';
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genCheckableTagStyle,
  });

  return wrapSSR(
    React.createElement(CheckableTagComponent, {
      ...props,
      className: hashId,
    }),
  );
};

// 定义组件行为
CheckableTag.Behavior = createBehavior({
  name: 'CheckableTag',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'CheckableTag',
  designerProps: {
    propsSchema: createFieldSchema(
      AllSchemas.CheckableTag,
      AllSchemas.FormItem,
      { includeEnum: true, includeDefault: true },
    ),
  },
  designerLocales: AllLocales.CheckableTag,
});

// 定义组件资源
CheckableTag.Resource = createResource({
  icon: 'TagSelect',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number> | string',
        title: 'CheckableTag',
        'x-decorator': 'FormItem',
        'x-component': 'CheckableTag',
        'x-component-props': {
          labelName: '标签选择',
          fieldName: 'checkableTag',
        },
        // 直接在Field级别定义enum，与Radio和Checkbox组件保持一致
        enum: [
          {
            value: '-1',
            label: '不限',
            cancelOther: true,
          },
          {
            value: '2',
            label: '红',
            showStyle: 'colorBlock',
            color: '#FF0A0E',
            borderColor: '#FF0A0E',
          },
          {
            value: '3',
            label: '北',
            showStyle: 'icon',
            icon: 'bei',
          },
          {
            value: '4',
            label: '绿',
            showStyle: 'colorBlock',
            color: '#65DB16',
            borderColor: '#65DB16',
          },
        ],
        // 默认值
        default: ['-1']
      },
    },
  ],
});
