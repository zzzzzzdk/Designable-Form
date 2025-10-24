import React from 'react';
import { Flex } from 'antd';
import { createResource } from '@/packages/designable-core';
import type { DnFC } from '@/packages/designable-react';
import { FlexLocales } from '../../locales';
import FlexBehavior from '../../behaviors/Flex';
// Flex图标已存在于icons目录中，但我们需要使用现有的导出

export interface FlexProps extends React.ComponentProps<typeof Flex> {
  direction?: 'horizontal' | 'vertical';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number | [number, number];
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const FlexLayout: DnFC<FlexProps> = Flex;

// 使用我们创建的独立Behavior
FlexLayout.Behavior = {
  ...FlexBehavior,
  designerLocales: FlexLocales,
};

FlexLayout.Resource = createResource({
  icon: 'flex',
  elements: [
    {
      componentName: 'Flex',
      props: {
        gap: 16,
        children: [
          {
            componentName: 'div',
            props: {
              children: '项目 1',
              style: { padding: '16px', backgroundColor: '#f0f2f5' },
            },
          },
          {
            componentName: 'div',
            props: {
              children: '项目 2',
              style: { padding: '16px', backgroundColor: '#f0f2f5' },
            },
          },
        ],
      },
    },
    {
      componentName: 'Flex',
      props: {
        justify: 'center',
        align: 'center',
        gap: 16,
        children: [
          {
            componentName: 'div',
            props: {
              children: '居中项目',
              style: { padding: '16px', backgroundColor: '#f0f2f5' },
            },
          },
        ],
      },
    },
    {
      componentName: 'Flex',
      props: {
        direction: 'vertical',
        gap: 16,
        children: [
          {
            componentName: 'div',
            props: {
              children: '垂直项目 1',
              style: { padding: '16px', backgroundColor: '#f0f2f5' },
            },
          },
          {
            componentName: 'div',
            props: {
              children: '垂直项目 2',
              style: { padding: '16px', backgroundColor: '#f0f2f5' },
            },
          },
        ],
      },
    },
  ],
});

// 增强Preview组件，更好地处理默认值和提供更好的预览体验
export const Preview: React.FC<FlexProps> = (props) => {
  const { 
    direction = 'horizontal',
    justify = 'start',
    align = 'stretch',
    gap = 16,
    wrap = false,
    children,
    className,
    style,
    ...rest 
  } = props;
  
  // 如果没有子元素，提供默认的预览内容
  const defaultChildren = children ? children : (
    <>
      <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
        项目 1
      </div>
      <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
        项目 2
      </div>
    </>
  );
  
  return (
    <Flex 
      direction={direction}
      justify={justify}
      align={align}
      gap={gap}
      wrap={wrap}
      className={className}
      style={{ 
        ...style,
        minHeight: '60px', // 确保即使没有内容也有一定高度
        border: '1px dashed #d9d9d9',
        borderRadius: '4px',
        padding: '16px',
      }}
      {...rest}
    >
      {defaultChildren}
    </Flex>
  );
};

export default FlexLayout;