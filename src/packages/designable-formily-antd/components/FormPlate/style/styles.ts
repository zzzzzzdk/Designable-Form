import { CSSInterpolation } from '@ant-design/cssinjs';
import palteImg from './plate-color-select.png'; // 背景图片文件存在

export const genFormPlateStyle = (
  prefixCls: string,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      alignItems: 'center',
      height: '32px',
      position: 'relative',
      
      '.ant-select': {
        flex: 'none',
        width: '74px !important',
        borderRadius: '4px 0 0 4px',

        ['.ant-select-selector']:{
          borderRadius: '4px 0 0 4px',
        },
        
        '.ant-select-selection-item': {
          background: `url(${palteImg}) no-repeat center`,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          
          '&:not([title="不限"])': {
            color: 'transparent !important',
          },
        },
      },
      
      [`.${prefixCls}-form-input`]: {
        flex: 'auto',
        width: 0,
        
        '.ant-input-affix-wrapper': {
          marginLeft: '-1px',
          borderRadius: '0 4px 4px 0',
          
          '.ant-input': {
            textTransform: 'uppercase',
          },
        },
      },
      
      '.ant-radio-group': {
        marginLeft: '8px',
        flex: 'none',
        
        '.ant-radio-wrapper': {
          margin: 0,
        },
        
        'span.ant-radio + *': {
          paddingRight: 0,
        },
      },
    },
    
    [`.${prefixCls}-plate-type`]: {
      '.ant-select-dropdown': {
        width: '162px !important',
        
        '.ant-select-item-option': {
          background: `url(${palteImg}) no-repeat left 0`,
          height: '20px',
          lineHeight: '20px',
          minHeight: '20px',
          padding: '0 0 0 40px',
          marginBottom: '10px',
          
          '&:nth-child(1)': {
            backgroundPosition: 'left -209px',
          },
          '&:nth-child(2)': {
            backgroundPosition: 'left 0',
          },
          '&:nth-child(3)': {
            backgroundPosition: 'left -30px',
          },
          '&:nth-child(4)': {
            backgroundPosition: 'left -60px',
          },
          '&:nth-child(5)': {
            backgroundPosition: 'left -90px',
          },
          '&:nth-child(6)': {
            backgroundPosition: 'left -120px',
          },
          '&:nth-child(7)': {
            backgroundPosition: 'left -150px',
          },
          '&:nth-child(8)': {
            backgroundPosition: 'left -180px',
            marginBottom: 0,
          },
        },
      },
    },
    
    [`.${prefixCls}-no-limit`]: {
      '.ant-select-option': {
        '&:nth-child(1)': {
          display: 'none',
        },
      },
    },
    
    [`.${prefixCls}-keyboard-box`]: {
      position: 'absolute',
      zIndex: 1050,
      top: '0px',
      left: '0px',
      width: '342px',
      height: 'auto',
      border: '1px solid var(--formplate-keyboard-border)',
      backgroundColor: 'var(--formplate-keyboard-bg)',
      padding: '8px',
      opacity: 0,
      transition: 'opacity 0.1s 0.2ms',
      
      '.keyboard-item': {
        '& .keyboard-item-n': {
          position: 'relative',
          userSelect: 'none',
          display: 'inline-block',
          width: '34px',
          height: '34px',
          textAlign: 'center',
          lineHeight: '34px',
          borderRadius: '4px',
          margin: '2px',
          cursor: 'pointer',
          
          '&::after': {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'none',
            zIndex: 1,
            backgroundColor: 'var(--formplate-keyboard-item-hover-color)',
            content: '" "',
          },
          
          '&:hover': {
            '&::after': {
              display: 'block',
            },
          },
        },
      },
      
      '.keyboard-item1': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--formplate-keyboard-item-bg1)',
          color: 'var(--formplate-keyboard-item-color1)',
        },
      },
      
      '.keyboard-item2': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--formplate-keyboard-item-bg2)',
          color: 'var(--formplate-keyboard-item-color2)',
        },
      },
      
      '.keyboard-item3': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--formplate-keyboard-item-bg3)',
          color: 'var(--formplate-keyboard-item-color3)',
        },
      },
      
      '.keyboard-item4': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--formplate-keyboard-item-bg4)',
          color: 'var(--formplate-keyboard-item-color4)',
        },
      },
      
      '.keyboard-item5': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--formplate-keyboard-item-bg5)',
          color: 'var(--formplate-keyboard-item-color5)',
        },
      },
      
      '.keyboard-del-button': {
        position: 'relative',
        userSelect: 'none',
        backgroundColor: 'var(--formplate-keyboard-del-bg)',
        display: 'inline-block',
        width: '53px',
        color: 'var(--formplate-keyboard-del-color)',
        height: '34px',
        textAlign: 'center',
        lineHeight: '31px',
        borderRadius: '4px',
        margin: '2px',
        cursor: 'pointer',
        fontSize: '18px',
        
        '&.keyboard-confirm': {
          backgroundColor: 'var(--button-primary-background-color)',
          fontSize: '16px',
        },
        
        '&::after': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: 'none',
          zIndex: 1,
          backgroundColor: 'var(--formplate-keyboard-item-hover-color)',
          content: '" "',
        },
        
        '&:hover': {
          '&::after': {
            display: 'block',
          },
        },
      },
      
      '.keyboard-remind-text': {
        padding: '10px 2px 0',
        letterSpacing: '1px',
        color: 'var(--formplate-keyboard-remind-color)',
        lineHeight: '20px',
        fontSize: '14px',
      },
    },
    
    '.plate-keyboard-box-technology': {
      backgroundColor: 'rgba(0, 32, 93, 0.53)',
      
      '.keyboard-item': {
        '& .keyboard-item-n': {
          backgroundColor: 'var(--primary-color-30)',
          color: '#fff',
        },
      },
      
      '.keyboard-remind-text': {
        color: '#fff',
      },
    },
  },
];