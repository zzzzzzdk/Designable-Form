import React from 'react';
import classNames from 'classnames';
import { useCssInJs } from '@/packages/designable-react';
import { genIconStyle } from './style';
const prefixCls = 'ysd-icon';

const Icon = (props: any) => {
  const { type, className, style, onClick } = props;
  const { hashId, wrapSSR } = useCssInJs({
    prefix: prefixCls,
    styleFun: genIconStyle,
  });

  return wrapSSR(
    <span
      className={classNames(className, prefixCls, `icon-${type}`, hashId)}
      style={style}
      onClick={onClick}
    >
      <svg aria-hidden="true">
        <use xlinkHref={`#icon-${type}`}></use>
      </svg>
    </span>,
  );
};

Icon.toString = function (type: string, className?: string) {
  return `<span class="${classNames(className || '', `${prefixCls}`, `icon-${type}`)}">
    <svg aria-hidden="true">
      <use xlinkHref="#icon-${type}"></use>
    </svg>
  </span>`;
};

export default Icon;
