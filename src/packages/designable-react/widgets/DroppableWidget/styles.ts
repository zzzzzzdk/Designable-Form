import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDroppableWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.dn-droppable-placeholder`]: {
      height: '60px',
      backgroundColor: `${token.colorBgContainer}`,
      border: `1px dashed ${token.colorBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: `${token.colorText}`,
      fontWeight: 'lighter',
      fontSize: '13px',
    },
  },
];
