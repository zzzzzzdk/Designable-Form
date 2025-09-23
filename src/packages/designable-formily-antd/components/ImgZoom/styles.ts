import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genImgZoomStyle = (
  prefixCls: string,
  // token: GlobalToken,
): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      // width: '100%',
      // height: '100%',
      width: '150px',
      height: '150px',
      backgroundColor: 'var(--img-zoom-card-bg)',
      border: '1px solid var(--dn-panel-border-color)',
      borderRadius: '2px',
      color: 'var(--img-zoom-color)',
      [`.${prefixCls}-wrap`]: {
        width: '100%',
        height: '100%',
        position: 'relative',
      },
      [`.${prefixCls}-original-pic-bg`]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      [`.${prefixCls}-original-pic-wrap`]: {
        position: 'relative',
        width: 'auto',
        float: 'left',
        display: 'flex',
        '&.original-pic-error': {
          width: '100%',
          height: '100%',
          img: {
            display: 'none',
          },
        },
        '.zoom-img-error-layer': {
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          color: '#d7d7d7',
          fontSize: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      [`.${prefixCls}-float`]: {
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        cursor: 'move',
        display: 'none',
        '&.show': {
          display: 'block',
        },
      },
      '.zoom-wrap': {
        position: 'relative',
      },
      [`.${prefixCls}-big-pic-wrap`]: {
        width: '300px',
        height: '300px',
        overflow: 'hidden',
        position: 'absolute',
        display: 'none',
        top: 0,
        marginLeft: '3px',
        zIndex: 10000,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        '&.show': {
          display: 'block',
        },
        img: {
          position: 'absolute',
          display: 'block',
        },
      },
    },
  };
};