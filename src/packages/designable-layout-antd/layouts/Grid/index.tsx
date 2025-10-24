import React from 'react';
import { Row, Col } from 'antd';
import { createResource } from '@/packages/designable-core';
import type { DnFC } from '@/packages/designable-react';
import { GridLocales } from '../../locales';
import GridRowBehavior from '../../behaviors/GridRow';
import GridColBehavior from '../../behaviors/GridCol';

export interface GridRowProps extends React.ComponentProps<typeof Row> {
  gutter?: number | [number, number];
  type?: 'flex';
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface GridColProps extends React.ComponentProps<typeof Col> {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
  xs?: number | object;
  sm?: number | object;
  md?: number | object;
  lg?: number | object;
  xl?: number | object;
  xxl?: number | object;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const GridRow: DnFC<GridRowProps> = Row;
export const GridCol: DnFC<GridColProps> = Col;

// 使用我们创建的独立Behavior
GridRow.Behavior = {
  ...GridRowBehavior,
  designerLocales: GridLocales.Row,
};

GridCol.Behavior = {
  ...GridColBehavior,
  designerLocales: GridLocales.Col,
};

GridRow.Resource = createResource({
  icon: 'gridRow',
  elements: [
    {
      componentName: 'GridRow',
      props: {
        gutter: 16,
        children: [
          {
            componentName: 'GridCol',
            props: {
              span: 12,
              children: '列 1',
            },
          },
          {
            componentName: 'GridCol',
            props: {
              span: 12,
              children: '列 2',
            },
          },
        ],
      },
    },
    {
      componentName: 'GridRow',
      props: {
        gutter: 16,
        type: 'flex',
        justify: 'space-between',
        children: [
          {
            componentName: 'GridCol',
            props: {
              span: 8,
              children: '左侧列',
            },
          },
          {
            componentName: 'GridCol',
            props: {
              span: 8,
              children: '中间列',
            },
          },
          {
            componentName: 'GridCol',
            props: {
              span: 8,
              children: '右侧列',
            },
          },
        ],
      },
    },
  ],
});

GridCol.Resource = createResource({
  icon: 'gridCol',
  elements: [
    {
      componentName: 'GridCol',
      props: {
        span: 12,
        children: '列内容',
      },
    },
    {
      componentName: 'GridCol',
      props: {
        span: 8,
        offset: 4,
        children: '带偏移的列',
      },
    },
  ],
});

// 增强GridRow的Preview组件，更好地处理默认值和提供更好的预览体验
export const Preview: React.FC<GridRowProps> = (props) => {
  const { 
    gutter = 16,
    type = 'flex',
    align = 'top',
    justify = 'start',
    wrap = true,
    children,
    className,
    style,
    ...rest 
  } = props;
  
  // 如果没有子元素，提供默认的预览内容
  const defaultChildren = children ? children : (
    <>
      <Col span={8}>
        <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          列 1
        </div>
      </Col>
      <Col span={8}>
        <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          列 2
        </div>
      </Col>
      <Col span={8}>
        <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          列 3
        </div>
      </Col>
    </>
  );
  
  return (
    <Row 
      gutter={gutter}
      type={type}
      align={align}
      justify={justify}
      wrap={wrap}
      className={className}
      style={{ 
        ...style,
        minHeight: '60px', // 确保即使没有内容也有一定高度
        border: '1px dashed #d9d9d9',
        borderRadius: '4px',
        padding: '8px',
      }}
      {...rest}
    >
      {defaultChildren}
    </Row>
  );
};

// 增强GridCol的Preview组件，更好地处理默认值和提供更好的预览体验
export const ColPreview: React.FC<GridColProps> = (props) => {
  const { 
    span = 12,
    order,
    offset,
    push,
    pull,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    children,
    className,
    style,
    ...rest 
  } = props;
  
  // 如果没有子元素，提供默认的预览内容
  const defaultChildren = children ? children : (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
      列内容
    </div>
  );
  
  return (
    <Col 
      span={span}
      order={order}
      offset={offset}
      push={push}
      pull={pull}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={className}
      style={{ 
        ...style,
        minHeight: '60px', // 确保即使没有内容也有一定高度
        border: '1px dashed #d9d9d9',
        borderRadius: '4px',
      }}
      {...rest}
    >
      {defaultChildren}
    </Col>
  );
};

export default GridRow;