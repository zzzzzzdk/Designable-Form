import { CSSInterpolation } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd';

export const genDrawerSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      bottom: 0,
      background: 'var(--dn-composite-panel-tabs-content-bg-color)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      
      [`.${prefixCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        flexGrow: 0,
        padding: '5px 10px',
        color: token.colorText,
        borderBottom: `1px solid ${token.colorBorder}`,
        cursor: 'pointer',
        
        [`.${prefixCls}-header-text`]: {
          marginLeft: '4px',
        },
      },
      
      [`.${prefixCls}-body`]: {
        padding: '10px 20px',
        overflow: 'overlay',
        overflowX: 'hidden',
        flexGrow: 2,
      },
    },
    
    [`.${prefixCls}-wrapper`]: {
      transition: 'all 0.16s ease-in-out',
      
      [`&-enter`]: {
        transform: 'translateX(100%)',
      },
      
      [`&-enter-active`]: {
        transform: 'translateX(0)',
      },
      
      [`&-exit`]: {
        transform: 'translateX(0)',
      },
      
      [`&-exit-active`]: {
        transform: 'translateX(100%)',
      },
    },
  };
};
