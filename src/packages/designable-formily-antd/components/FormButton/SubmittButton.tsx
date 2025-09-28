import { Submit } from '@formily/antd-v5';
import { useField } from '@formily/react';
import { usePrefix, useCssInJs } from '@/packages/designable-react';
import React from 'react';
import cls from 'classnames';
import { genFormButtonStyle } from './styles';
import { useWorkbench } from '@/packages/designable-react';

export default function FormButton(props: {
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  block?: boolean;
  center?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  submitUrl?: string;
  returnUrl?: string;
  buttonType?: 'submit' | 'cancel' | 'reset';
  children?: React.ReactNode | string;
}) {
  console.log('FormButton props:', props);
  const workbench = useWorkbench();
  const prefixCls = usePrefix('form-button');
  const { hashId, wrapSSR } = useCssInJs({
    prefix: prefixCls,
    styleFun: genFormButtonStyle,
  });

  const field = useField();
  const xComponentProps = field['componentProps'] || {};
  console.log('FormButton xComponentProps:', xComponentProps);
  console.log('FormButton workbench type:', workbench.type);

  // 合并props和xComponentProps，但让外部传入的props.disabled优先级更高
  // 这样当从外部传入disabled属性时，它不会被xComponentProps覆盖
  const mergedProps = {
    ...xComponentProps,
    ...props,
    // 根据buttonType决定htmlType和默认文本
    htmlType:
      props.buttonType === 'reset'
        ? 'reset'
        : props.htmlType || xComponentProps.htmlType || 'submit',
    children:
      props.children ||
      xComponentProps.children ||
      (props.buttonType === 'cancel' ? '取消' : '提交表单'),
  };
  
  console.log('FormButton mergedProps:', mergedProps);

  // 移除在Submit组件中不需要的props
  const { className, style, submitUrl, onClick, center, returnUrl, buttonType, ...submitProps } = mergedProps;
  console.log('FormButton submitProps:', submitProps);

  // 处理按钮点击或提交事件
  const handleSubmit = async (values: any) => {
    // 如果按钮被禁用或处于只读状态，则不执行任何操作
    console.log('FormButton handleSubmit - disabled:', submitProps.disabled, 'readOnly:', submitProps.readOnly);
    if (submitProps.disabled || submitProps.readOnly) {
      return;
    }

    // 在非预览模式下不执行自定义提交逻辑
    if (workbench.type !== 'PREVIEW') {
      return;
    }
    // 如果是取消按钮且有返回地址，则执行页面跳转
    if (buttonType === 'cancel' && returnUrl) {
      window.location.href = returnUrl;
      return;
    }

    // 如果是重置按钮，重置表单数据
    if (buttonType === 'reset') {
      // 获取表单实例并重置数据
      const form = field?.form;
      if (form && typeof form.reset === 'function') {
        form.reset();
      }
    }

    // 对于提交按钮，处理表单提交逻辑
    if (buttonType === 'submit') {
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
    hashId,
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
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {ButtonContent}
      </div>,
    );
  }

  return wrapSSR(ButtonContent);
}
