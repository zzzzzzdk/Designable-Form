import { CSSInterpolation } from '@ant-design/cssinjs';

export const genIconStyle = (
  prefixCls: string,
): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      display: 'inline-block',

      [`> svg`]: {
        width: '1em',
        height: '1em',
        verticalAlign: '-0.148em',
        fill: 'currentColor',
        overflow: 'hidden',
      }
    },
  };
};
