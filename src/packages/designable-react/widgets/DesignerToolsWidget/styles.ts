import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDesignerToolsWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      alignItems: 'center',
      [`.ant-input-number`]: {
        fontSize: '12px !important',
        background: `${token.colorBgContainer} !important`,
        borderColor: `${token.colorBorder} !important`,
        [`.ant-input-number-handler-wrap,.ant-input-number-handler`]: {
          background: `${token.colorBgContainer} !important`,
          borderColor: `${token.colorBorder} !important`,
          color: `${token.colorText} !important`,
        },
        [`.ant-input-number-handler-down-inner,.ant-input-number-handler-up-inner`]:
          {
            color: `${token.colorText} !important`,
          },
        [`&:hover`]: {
          borderColor: `${token.colorBorder} !important`,
        },
      },
    },
  },
];
