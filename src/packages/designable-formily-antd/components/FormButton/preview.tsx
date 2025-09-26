import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createVoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { Submit } from '@formily/antd-v5';
import { useField } from '@formily/react';
import { usePrefix, useCssInJs } from '@/packages/designable-react';
import React from 'react';
import cls from 'classnames';
import { genFormButtonStyle } from './styles';

export const FormButton: DnFC<{
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  center?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  submitUrl?: string;
}> = (props) => {
  const prefixCls = usePrefix('form-button');
  const { hashId, wrapSSR } = useCssInJs({
    prefix: prefixCls,
    styleFun: genFormButtonStyle,
  });
  
  const field = useField();
  const xComponentProps = field['componentProps'] || {};
  
  // 合并props和xComponentProps，后者优先级更高
  const mergedProps = {
    ...props,
    ...xComponentProps,
    // 确保htmlType为submit
    htmlType: 'submit',
    children: props.children || xComponentProps.children || '提交表单',
  };
  
  // 移除在Submit组件中不需要的props
  const { className, style, submitUrl, onClick, center, ...submitProps } = mergedProps;
  
  // 处理submitUrl属性，如果存在则实现自定义的提交逻辑
  const handleSubmit = async (values) => {
    if (submitUrl) {
      try {
        // 如果有submitUrl，则使用自定义的提交逻辑
        const response = await fetch(submitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        
        if (!response.ok) {
          throw new Error('提交失败');
        }
        
        const data = await response.json();
        // 可以在这里处理成功的逻辑
        console.log('提交成功:', data);
      } catch (error) {
        // 可以在这里处理错误的逻辑
        console.error('提交失败:', error);
        throw error;
      }
    }
    
    // 如果用户提供了onClick回调，调用它
    if (onClick) {
      onClick();
    }
  };
  
  const selected = className?.includes('dn-selected');
  
  // 构建类名
  const classes = cls(
    prefixCls,
    {
      [`${prefixCls}-${submitProps.type}`]: submitProps.type,
      [`${prefixCls}-${submitProps.size}`]: submitProps.size,
      'dn-selected': selected,
      'ant-btn-block': submitProps.block,
    },
    className,
    hashId
  );
  
  // 创建按钮内容
  const ButtonContent = (
    <Submit
      {...submitProps}
      className={classes}
      style={style || {}}
      onSubmit={handleSubmit}
    />
  );

  // 根据center属性决定是否使用居中容器
  // 为了确保居中效果，我们使用两层容器并结合内联样式
  if (center) {
    return wrapSSR(
      <div 
        className={`${prefixCls}-center`}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        {ButtonContent}
      </div>
    );
  }

  return wrapSSR(ButtonContent);
};

FormButton.Behavior = createBehavior({
  name: 'FormButton',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'FormButton',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.FormButton),
  },
  designerLocales: AllLocales.FormButton,
});

FormButton.Resource = createResource({
  icon: 'Component',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormButton',
        'x-component-props': {
          type: 'primary',
          children: '提交表单',
          center: true,
        },
      },
    },
  ],
});