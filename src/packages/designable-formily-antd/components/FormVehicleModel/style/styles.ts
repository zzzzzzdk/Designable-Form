import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFormVehicleModelStyle = (
  prefixCls: string,
): CSSInterpolation => {
  return {
    ['.vehicle-model-wrapper']: {
      position: 'relative',

      [`.${prefixCls}-trigger`]: {
        position: 'absolute',
        zIndex: 1050,

        [`.${prefixCls}-trigger-hidden`]: {
          display: 'none',
        },
      },

      [`.${prefixCls}-size-mini`]: {
        fontSize: 'var(--font-size-sm)',

        [`.${prefixCls}-view`]: {
          minHeight: '22px',
          lineHeight: '22px',
        },
      },

      [`.${prefixCls}-size-small`]: {
        [`.${prefixCls}-view`]: {
          minHeight: '26px',
          lineHeight: '26px',
        },
      },

      [`.${prefixCls}-size-large`]: {
        fontSize: 'var(--font-size-lg)',

        [`.${prefixCls}-view`]: {
          minHeight: '38px',
          lineHeight: '38px',
        },
      },
    },

    [`.${prefixCls}`]: {
      position: 'relative',
      display: 'inline-flex',
      width: '100%',
      padding: '0 8px',
      border:
        'var(--vehicle-model-border-width) solid var(--vehicle-model-border-color)',
      borderRadius: 'var(--vehicle-model-border-radius)',
      outline: 'none',
      color: 'var(--vehicle-model-color)',
      verticalAlign: 'middle',
      fontSize: '14px',
      backgroundColor: 'var(--vehicle-model-background-color)',
      cursor: 'pointer',
      boxSizing: 'border-box',

      [`.${prefixCls}-view`]: {
        position: 'relative',
        width: '100%',
        minWidth: 0,
        minHeight: '30px',
        lineHeight: '30px',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      [`.${prefixCls}-placeholder`]: {
        width: '100%',
        color: 'var(--vehicle-model-placeholder-color)',
        pointerEvents: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
      },

      [`.${prefixCls}-suffix`]: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '4px',
        color: 'var(--vehicle-model-icon-color)',
        boxSizing: 'border-box',
      },

      '&-open': {
        [`.${prefixCls}-arrow-icon`]: {
          transform: 'rotate(180deg)',
        },
      },

      '&-focused, &-hover': {
        borderColor: 'var(--vehicle-model-hover-border-color)',
      },

      '&-no-border': {
        border: 'none',
      },

      '&-disabled': {
        cursor: 'no-drop',
        borderColor: 'var(--vehicle-model-disabled-border-color)',
        backgroundColor: 'var(--vehicle-model-disabled-background-color)',
        color: 'var(--vehicle-model-disabled-color)',
      },

      '&-error': {
        position: 'relative',
        borderColor: 'var(--vehicle-model-error-border-color)',

        '&:hover': {
          borderColor: 'var(--vehicle-model-error-border-color)',
        },
      },
    },

    [`.${prefixCls}-wrapper`]: {
      display: 'flex',
      color: 'var(--text-color)',

      [`.${prefixCls}-empty`]: {
        paddingTop: '20px',
        color: 'var(--vehicle-model-icon-color)',

        [`.${prefixCls}-empty-icon`]: {
          height: '40px',
          marginBottom: '8px',
          fontSize: '36px',
          textAlign: 'center',
        },

        [`.${prefixCls}-empty-description`]: {
          textAlign: 'center',
          fontSize: 'var(--font-size-sm)',
        },
      },

      [`.${prefixCls}-list`]: {
        background: 'var(--vehicle-model-wrapper-background-color)',
      },

      [`.${prefixCls}-list-brand`]: {
        display: 'flex',
      },

      [`.${prefixCls}-letter`]: {
        width: '30px',
        borderRight: '1px solid var(--vehicle-model-wrapper-border-color)',
        background: 'var(--vehicle-model-letter-background-color)',
      },

      [`.${prefixCls}-letter-item`]: {
        height: '20px',
        lineHeight: '20px',
        textAlign: 'center',
        color: 'var(--vehicle-model-wrapper-color)',
        fontSize: '12px',
        cursor: 'pointer',

        '&:not(&-active):hover': {
          color: '#fff',
          backgroundColor: 'var(--vehicle-model-letter-hover-background-color)',
        },

        '&-active': {
          color: '#fff',
          background: 'var(--vehicle-model-letter-active-background-color)',
        },
      },

      [`.${prefixCls}-column`]: {
        width: '130px',
        height: '100%',
        border: '1px solid var(--vehicle-model-wrapper-border-color)',
        borderLeft: 'none',
      },

      [`.${prefixCls}-search`]: {
        height: '30px',
        padding: '3px 6px',
        borderBottom: '1px solid var(--vehicle-model-wrapper-border-color)',
        background: 'var(--vehicle-model-letter-background-color)',

        ['.ant-input']: {
          background: 'var(--vehicle-model-search-background-color)',
          width: '100%',
          display: 'block',
          height: '24px',
        },
      },

      [`.${prefixCls}-column-list`]: {
        height: 'calc(100% - 30px)',
      },

      [`.${prefixCls}-column-item`]: {
        height: '26px',
        padding: '0 4px',
        borderRadius: 'var(--vehicle-model-border-radius)',
        marginBottom: '1px',
        lineHeight: '25px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        '&:last-child': {
          marginBottom: 0,
        },

        '&:not(&-letter)': {
          cursor: 'pointer',
        },

        '&:not(&-letter):hover, &-active:hover': {
          background: 'var(--vehicle-model-item-active-background-color)',
          color: 'var(--vehicle-model-item-active-color)',
        },

        [`&.${prefixCls}-column-item-letter`]: {
          background: 'var(--vehicle-model-letter-background-color)',
          fontWeight: 700,
        },

        [`&.${prefixCls}-column-item-active`]: {
          color: 'var(--vehicle-model-item-active-color)',
          background: 'var(--vehicle-model-item-active-background-color)',
          border: 'none',
        },
      },
    },
  };
};
