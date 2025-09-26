import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

// FormButton组件的样式生成函数
export const genFormButtonStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    // 基础样式
    [`.${prefixCls}`]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      boxSizing: 'border-box',
      userSelect: 'none',
      padding: '4px 15px',
      fontSize: '14px',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      border: '1px solid transparent',

      '&:hover': {
        textDecoration: 'none',
      },

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      // 选中状态样式
      '&.dn-selected': {
        outline: '2px solid rgba(24, 144, 255, 0.2)',
        outlineOffset: '1px',
      },

      // 加载状态样式
      '&[loading="true"]': {
        opacity: 0.8,
        pointerEvents: 'none',
      },

      // 块状按钮样式
      '&.ant-btn-block': {
        width: '100%',
        display: 'flex',
      },
    },

    // 不同类型按钮的样式
    [`.${prefixCls}-primary`]: {
      color: '#fff',
      backgroundColor: 'var(--dn-brand-color)',
      borderColor: 'var(--dn-brand-color)',

      '&:hover:not(:disabled)': {
        color: '#fff',
        backgroundColor: 'var(--dn-brand-hovering)',
        borderColor: 'var(--dn-brand-hovering)',
      },
    },

    [`.${prefixCls}-default`]: {
      color: 'rgba(0, 0, 0, 0.85)',
      backgroundColor: '#fff',
      borderColor: 'var(--dn-white-gray)',

      '&:hover:not(:disabled)': {
        color: 'var(--dn-brand-color)',
        borderColor: 'var(--dn-brand-hovering)',
      },
    },

    [`.${prefixCls}-dashed`]: {
      color: 'rgba(0, 0, 0, 0.85)',
      backgroundColor: '#fff',
      borderColor: 'var(--dn-white-gray)',
      borderStyle: 'dashed',

      '&:hover:not(:disabled)': {
        color: 'var(--dn-brand-color)',
        borderColor: 'var(--dn-brand-hovering)',
      },
    },

    [`.${prefixCls}-text`]: {
      color: 'rgba(0, 0, 0, 0.85)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',

      '&:hover:not(:disabled)': {
        color: 'var(--dn-brand-color)',
        backgroundColor: '#e6f7ff',
      },
    },

    [`.${prefixCls}-link`]: {
      color: 'var(--dn-brand-color)',
      backgroundColor: 'transparent',
      borderColor: 'transparent',

      '&:hover:not(:disabled)': {
        color: 'var(--dn-brand-hovering)',
        textDecoration: 'underline',
      },
    },

    // 不同大小按钮的样式
    [`.${prefixCls}-small`]: {
      padding: '2px 8px',
      fontSize: '12px',
      borderRadius: '4px',
    },

    [`.${prefixCls}-middle`]: {
      padding: '4px 15px',
      fontSize: '14px',
      borderRadius: '6px',
    },

    [`.${prefixCls}-large`]: {
      padding: '6px 16px',
      fontSize: '16px',
      borderRadius: '8px',
    },
  },
];
