import { CSSProperties, ReactNode } from "react";
import { CheckboxChangeEvent } from "antd";

export type TagStyleType = 'outline' | 'solid';

// 
export type showStyleType = 'colorBlock' | 'icon';

// 特征类型
export type characterDataType = {
  /**
   * 选项字段值
   */
  value: string;
  /**
   * 选项文本描述
   */
  text: string;
  /**
   * 选中取消其他选项，
   */
   cancelOther?: boolean;
  /**
   * 选项块显示样式类型
   */
  showStyle?: showStyleType | string;
  /**
   * 选项块颜色，showStyle为colorBlock时生效， 例如：#FFFFFF；linear-gradient(180deg, #FBFFFC, #49F462)；
   */
  color?: string;
  /**
   * 选项块边框颜色，showStyle为colorBlock时生效
   */
  borderColor?: string;
  /**
   * 选项显示的图标，showStyle为icon时生效
   */
  icon?: string | ReactNode;

}

// 选中数据项类型
export type CheckableTagDataItemType = {
  text: string;
  value: string;
}

// 回调参数类型
export interface CheckableTagDataType {
  componentType: string;
  formItemName: string;
  formItemNameText: string;
  formItemData: CheckableTagDataItemType[];
}

export interface CheckableTagProps {
  className?: string;
  style?: CSSProperties;
  /**
   * 数据源
   */
  dataSource?: characterDataType[];
  /**
   * 选项组描述文字
   */
  // labelName?: string;
  /**
   * 字段名称
   */
  fieldName?: string;
  /**
   * 初始化的时候，默认选中的选项
   */
  defaultValue?: string[];
  /**
   * 通过value控制选中
   */
  value?: string[];
  /**
   * 选项变化时的回调函数
   */
  // onChange?: (event: CheckboxChangeEvent ,data: CheckableTagDataType) => void;
  onChange?: (data: string[]) => void;
  /**
   * 单选方式
   */
  showAsRadio?: boolean;
}