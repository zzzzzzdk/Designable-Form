import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genResourceWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flexWrap: 'wrap',
      overflow: 'hidden',
      [`&-header`]: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 8px',
        color: 'var(--dn-collapse-header-color)',
        borderBottom: `1px solid var(--dn-panel-border-color)`,
        backgroundColor: `var(--dn-panel-active-bg-color)`,
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        fontSize: '13px',
        [`&-expand`]: {
          transform: 'rotate(-90deg)',
          fontSize: '12px',
          transition: 'all 0.15s ease-in-out',
          marginRight: '3px',
        },
      },
      [`&-content-wrapper`]: {
        display: 'flex',
        justifyContent: 'center',
        background: 'var(--dn-resource-content-bg-color)',
      },
      [`&-content`]: {
        width: '100%',
        // display: 'flex',
        flexWrap: 'wrap',
        display: 'none',
      },
      [`&.expand`]: {
        [`.dn-resource-content`]: {
          display: 'grid',
          gridTemplateColumns: ' repeat(3, 33.3333%)',
          gridGap: '1px',
          backgroundColor: 'var(--dn-panel-border-color)',
          borderBottom: `1px solid var(--dn-panel-border-color)`,
        },
        [`.dn-resource-header-expand`]: {
          transform: 'rotate(0)',
        },
      },
      [`&-item`]: {
        position: 'relative',
        userSelect: 'none',
        background: 'var(--dn-composite-panel-tabs-content-bg-color)',
        minHeight: '40px',
        color: 'var(--dn-resource-item-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'grab',
        transition: 'color 0.1s ease-out',
        [`&:hover`]: {
          color: 'var(--dn-resource-item-hover-color)',
          boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        },
        [`&-icon`]: {
          margin: '12px 0',
        },
        [`&-text`]: {
          textAlign: 'center',
          fontSize: '12px',
          lineHeight: 1,
          marginBottom: '12px',
        },
        [`&-remain`]: {
          background: 'var(--dn-resource-content-bg-color)',
        },
      },
    },
  },
];
