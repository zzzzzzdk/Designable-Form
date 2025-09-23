import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

/**
 * 生成CheckableTag组件的CSS样式
 * @param prefixCls 组件前缀类名
 * @param token Ant Design全局Token
 */
export const genCheckableTagStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  // 定义CSS变量
  const cssVariables = {
    '--checkable-tag-button-border-color': token.colorBorder,
    '--checkable-tag-button-border-active-color': token.colorPrimary,
  };

  return {
    [`.${prefixCls}`]: {
      ...cssVariables,
      display: 'inline-block',
      [`.${prefixCls}-children`]: {
        display: 'flex',
        [`.${prefixCls}-name`]: {
          marginRight: '10px',
          lineHeight: '30px',
        },
        [`.${prefixCls}-content`]: {
          ['&.ant-checkbox-group']: {
            padding: 0,
            ['.ant-checkbox-wrapper']: {
              ['.ant-checkbox']: {
                display: 'none',
              },
              '& > span': {
                padding: 0,
                display: 'inline-block',
                height: '30px',
                lineHeight: '30px',
                ['.show-style-text, .show-style-icon, .show-style-color-block']: {
                  borderRadius: '4px',
                  border: '1px  solid var(--checkable-tag-button-border-color)',
                },
                ['.show-style-text, .show-style-icon']: {
                  display: 'inline-block',
                  padding: '0 7px',
                  height: '30px',
                  lineHeight: '30px',
                },
                ['.show-style-color-block']: {
                  display: 'inline-block',
                  padding: '0 7px',
                  lineHeight: '28px',
                },
              },
              ['&.ant-checkbox-wrapper-checked']: {
                color: 'var(--checkable-tag-button-border-active-color)',
                ['& > span']: {
                  ['.show-style-text, .show-style-icon, .show-style-color-block']: {
                    borderColor: 'var(--checkable-tag-button-border-active-color)',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}