import React from 'react';
import { Divider as AntDivider } from 'antd';
import { createResource } from '@/packages/designable-core';
import type { DnFC } from '@/packages/designable-react';
import { DividerLocales } from '../../locales';
import DividerBehavior from '../../behaviors/Divider';
// 暂时注释掉图标导入

export interface DividerProps extends React.ComponentProps<typeof AntDivider> {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  plain?: boolean;
  dashed?: boolean;
  children?: React.ReactNode;
}

export const Divider: DnFC<DividerProps> = AntDivider;

// 使用我们创建的独立Behavior
Divider.Behavior = {
  ...DividerBehavior,
  designerLocales: DividerLocales,
};

Divider.Resource = createResource({
  icon: 'Divider',
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

// 增强Preview组件，更好地处理默认值
export const Preview: React.FC<DividerProps> = (props) => {
  const { 
    type = 'horizontal',
    orientation = 'center',
    plain = false,
    dashed = false,
    children,
    className,
    style,
    ...rest 
  } = props;
  
  return (
    <AntDivider 
      type={type}
      orientation={orientation}
      plain={plain}
      dashed={dashed}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </AntDivider>
  );
};

export default Divider;