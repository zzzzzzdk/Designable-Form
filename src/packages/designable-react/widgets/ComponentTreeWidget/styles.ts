import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genComponentTreeWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      minHeight: '100%',
      minWidth: '100%',
      backgroundColor: 'var(--dn-composite-panel-tabs-content-bg-color)',
    },
  },
];
