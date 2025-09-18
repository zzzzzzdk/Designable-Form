import React, { useMemo, useEffect, useState, useRef } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ModalBody from './ModalBody';
import { PlateKeyboardProps } from './interface';
import classNames from 'classnames';
import { useCssInJs } from '@/packages/designable-react';
import { genFormPlateStyle } from './style/styles';

const data = [
  [
    '京',
    '津',
    '冀',
    '晋',
    '蒙',
    '辽',
    '吉',
    '黑',
    '沪',
    '苏',
    '浙',
    '皖',
    '闽',
    '赣',
    '鲁',
    '豫',
    '鄂',
    '湘',
    '粤',
    '桂',
    '琼',
    '渝',
    '川',
    '贵',
    '云',
    '藏',
    '陕',
    '甘',
    '青',
    '宁',
    '新',
    '台',
    '港',
    '澳',
    '使',
    '领',
  ],
  ['WJ', '军', '空', '警', '学', '挂'],
  [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['*', '?'],
];

function PlateKeyboard(props: PlateKeyboardProps) {
  const {
    onClick = () => {},
    onDel = () => {},
    onConfirm = () => {},
    remind,
    province,
    position,
    show = false,
    placement,
    verticalDis,
    horizontalDis,
    prefixCls,
    getPopupContainer,
    keyboardClassName,
    accurate = false,
  } = props;

  const { hashId, wrapSSR } = useCssInJs({
    prefix: prefixCls,
    styleFun: genFormPlateStyle,
  });

  const cn = classNames(keyboardClassName, prefixCls, hashId);

  const domRef = useRef<any>(null);

  const [platePosition, setPlatePosition] = useState({
    top: 0,
    left: 0,
  });

  const keyboardPositionH = () => {
    const obj: any = {
      opacity: 1,
    };
    switch (placement) {
      case 'bottom':
        obj.left = position.left - 9 + horizontalDis;
        obj.top = position.bottom + 2 + verticalDis;
        break;
      case 'top':
        obj.left = position.left - 9 + horizontalDis;
        obj.top = position.top - 2 - domRef.current.offsetHeight - verticalDis;
        break;
      case 'left':
        obj.left =
          position.left - domRef.current.offsetWidth - 9 - horizontalDis;
        obj.top = position.top - 2 + verticalDis;
        break;
      case 'right':
        obj.left = position.right + 9 + horizontalDis;
        obj.top = position.top - 2 + verticalDis;
        break;
    }
    setPlatePosition(obj);
  };

  const paltedata = useMemo(() => {
    const arrt = JSON.parse(JSON.stringify(data));
    // 如果是精确，删除*和？
    if (accurate) {
      arrt.pop();
    }
    if (arrt && arrt.length && arrt[0].length) {
      const arr: string[] = [];
      arrt[0].map((item: string) => {
        if (item == province) {
          arr.unshift(item);
        } else {
          arr.push(item);
        }
      });
      arrt[0] = arr;
    }
    return arrt;
  }, [data, province]);

  useEffect(() => {
    console.log('show', show);
    if (show) {
      keyboardPositionH();
    }
  }, [show]);

  return wrapSSR(
    <ModalBody getPopupContainer={getPopupContainer}>
      <div
        className={cn}
        ref={domRef}
        style={{ ...platePosition, display: show ? 'block' : 'none' }}
      >
        {paltedata.map((item: any, index: number) => {
          return (
            <span
              className={'keyboard-item ' + 'keyboard-item' + (index + 1)}
              key={index + 1}
            >
              {item.map((item2: string) => {
                return (
                  <span
                    className="keyboard-item-n"
                    onClick={() => {
                      onClick(item2);
                    }}
                    key={item2}
                  >
                    {item2}
                  </span>
                );
              })}
            </span>
          );
        })}
        <span
          className="keyboard-del-button"
          onClick={onDel}
          style={{ marginLeft: accurate ? '78px' : '2px' }}
        >
          <ArrowLeftOutlined />
        </span>
        <span
          className="keyboard-del-button keyboard-confirm"
          onClick={onConfirm}
        >
          确定
        </span>
        <div className="keyboard-remind-text">{remind}</div>
      </div>
    </ModalBody>,
  );
}

export default PlateKeyboard;
