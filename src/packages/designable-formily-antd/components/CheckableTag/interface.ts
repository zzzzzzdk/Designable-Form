// 基础字符数据类型
export type characterDataType = {
  value: string;
  text: string;
  label?: string;
  cancelOther?: boolean;
  showStyle?: 'text' | 'icon' | 'colorBlock';
  icon?: string | React.ReactNode;
  color?: string;
  borderColor?: string;
};

// 标签数据项类型
export type CheckableTagDataItemType = {
  text: string;
  value: string;
};

// CheckableTag 组件属性接口
export interface CheckableTagProps {
  style?: React.CSSProperties;
  className?: string;
  dataSource?: characterDataType[];
  fieldName?: string;
  showAsRadio?: boolean;
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  // 控制组件状态
  disabled?: boolean;
  readOnly?: boolean;
}