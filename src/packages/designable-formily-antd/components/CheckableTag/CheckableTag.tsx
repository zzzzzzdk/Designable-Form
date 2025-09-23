import classNames from 'classnames';
import { Checkbox, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DnFC } from '@/packages/designable-react';
import { useField } from '@formily/react';
import Icon from '../Icon';
import type {
  CheckableTagProps,
  characterDataType,
  CheckableTagDataItemType,
} from './interface';
import useMergeValue from '@/hooks/useMergeValue';
import { isUndefined, isArray } from '@/utils/is';

// 确保值始终是数组格式
export function formatValue(value: any) {
  // 如果值已存在且是数组，深拷贝以避免引用问题
  if (value !== null && !isUndefined(value)) {
    // 如果是数组，直接返回深拷贝
    if (isArray(value)) {
      return JSON.parse(JSON.stringify(value));
    }
    // 如果是字符串且包含逗号，按逗号分割成数组
    if (typeof value === 'string' && value.includes(',')) {
      return value.split(',').map(item => item.trim());
    }
    // 如果不是数组但有值，包装成数组
    return [value];
  }
  // 如果值不存在或为null/undefined，返回空数组
  return [];
}

const CheckableTag: DnFC<CheckableTagProps> = (props) => {
  const field = useField();
  const fieldEnum = field?.dataSource || [];
  const normalizedEnum = Array.isArray(fieldEnum)
    ? fieldEnum.map((item) =>
        typeof item === 'object' && item !== null
          ? {
              ...item,
              text: item.label || item.text || item.value,
              value: item.value,
            }
          : {
              text: String(item),
              value: item,
            },
      )
    : [];

  const {
    style,
    className,
    dataSource = normalizedEnum.length > 0
      ? normalizedEnum
      : (props as any).enum || [],
    // labelName = '标签选择',
    fieldName = 'checkableTag',
    showAsRadio = false,
  } = props as CheckableTagProps & { enum?: characterDataType[] };
  const prefixCls = 'checkable-tag';

  // 确保propValue始终是数组格式
  const propValue = 'value' in props ? formatValue(props.value) : [];
  // 确保defaultValue始终是数组格式或undefined
  const defaultValue = 
    'defaultValue' in props ? formatValue(props.defaultValue) : undefined;

  // 从数据源中获取默认选项（如果没有指定默认值）
  const defaultValueFromOptions = 
    !isUndefined(dataSource) && isArray(dataSource) && dataSource.length > 0
      ? [dataSource[0].value]
      : [];

  // 使用useMergeValue管理内部状态，确保默认值正确处理为数组格式
  const [value, setValue] = useMergeValue(defaultValueFromOptions, {
    defaultValue: defaultValue || defaultValueFromOptions,
    value: propValue,
  });
  // console.log('CheckableTag props:', props);
  // console.log(
  //   'CheckableTag value:',
  //   defaultValue,
  //   defaultValueFromOptions,
  //   propValue,
  //   value,
  // );
  const cn = classNames(className, prefixCls);

  const cancelOtherIds = dataSource
    .filter((o: any) => o.cancelOther)
    .map((o: any) => o.value);

  const handleCheckboxChange = (
    event: CheckboxChangeEvent,
    elem: characterDataType,
  ) => {
    const { value: targetValue, checked } = event.target;
    const { cancelOther } = elem;
    // 确保 value 是数组

    if (showAsRadio) {
      handleValueChange(event, [targetValue]);
      return true;
    }
    if (cancelOther) {
      handleValueChange(event, [targetValue]);
    } else {
      const filterCheckGroupValue = value.filter(
        (id: any) => !cancelOtherIds.includes(id),
      );

      if (checked) {
        handleValueChange(event, [...filterCheckGroupValue, targetValue]);
      } else {
        // 如果只剩最后一个选中选项想要取消，有"不限"的话，选中"不限"，没有"不限"不让取消
        if (filterCheckGroupValue.length === 1) {
          if (cancelOtherIds.length) {
            handleValueChange(event, [cancelOtherIds[0]]);
          }
          return;
        }
        handleValueChange(
          event,
          filterCheckGroupValue.filter((elem: any) => elem !== targetValue),
        );
      }
    }
  };

  const handleValueChange = (
    event: CheckboxChangeEvent,
    newValue: string[],
  ) => {
    // 更新内部状态
    if (!('value' in props)) {
      setValue(newValue);
    }

    // 更新 Formily field 的值
    if (field) {
      (field as any).setValue(newValue);
    }

    const items: CheckableTagDataItemType[] = [];
    dataSource.forEach((elem: any) => {
      if (newValue.includes(elem.value)) {
        items.push({
          text: elem.text,
          value: elem.value,
        });
      }
    });

    // 调用外部 onChange 回调
    // props.onChange?.(event, {
    //   componentType: 'checkbox',
    //   formItemName: fieldName,
    //   formItemNameText: labelName,
    //   formItemData: items,
    // });
    props.onChange?.(newValue);
  };

  const renderText = (node: characterDataType) => {
    if (node.showStyle) {
      switch (node.showStyle) {
        case 'icon':
          return typeof node.icon === 'string' ? (
            <span className={node.icon + ' show-style-icon'} title={node.text}>
              <Icon type={node.icon} />
            </span>
          ) : (
            node.icon
          );
        case 'colorBlock':
          return (
            <span
              className="show-style-color-block"
              style={
                // 确保 value 是数组后再调用 includes 方法
                (isArray(value) ? value : []).includes(node.value)
                  ? {
                      color:
                        node.color === '#FFFFFF' || node.text === '新绿'
                          ? '#22619c'
                          : '#fff',
                      borderColor: node.borderColor,
                      backgroundColor:
                        (node.color ?? '').indexOf('linear-gradient') > -1
                          ? 'transparent'
                          : node.color,
                      backgroundImage:
                        (node.color ?? '').indexOf('linear-gradient') > -1
                          ? node.color
                          : 'inherit',
                    }
                  : {}
              }
            >
              {node.text}
            </span>
          );
        default:
          return <span className="show-style-text">{node.text}</span>;
      }
    } else {
      return <span className="show-style-text">{node.text}</span>;
    }
  };

  return (
    <div className={cn} style={style}>
      <div className={`${prefixCls}-children`}>
        {/* <div className={`${prefixCls}-name`}>{labelName}</div> */}
        <Checkbox.Group
          className={`${prefixCls}-content`}
          value={value}
          name={fieldName}
        >
          <Space size={8}>
            {dataSource.map((elem: any) => (
              <Checkbox
                value={elem.value}
                key={elem.value}
                onChange={(event) => handleCheckboxChange(event, elem)}
              >
                {renderText(elem)}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default CheckableTag;
