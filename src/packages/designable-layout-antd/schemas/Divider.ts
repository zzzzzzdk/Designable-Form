import { ISchema } from '@formily/json-schema';
import { FormGrid, FormItem, Select, Input, Switch } from '@formily/antd-v5';

export const Divider = (): ISchema => {
  return {
    type: 'object',
    properties: {
      // 基础配置
      type: {
        type: 'string',
        title: '分隔线类型',
        enum: ['horizontal', 'vertical'],
        enumNames: ['水平', '垂直'],
        default: 'horizontal',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择分割线类型'
        },
      },
      // 文本配置
      children: {
        type: 'string',
        title: '文本内容',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入分割线文本'
        },
      },
      // 外观设置
      'x-appearance': {
        type: 'object',
        title: '外观设置',
        'x-decorator': 'FormGrid',
        'x-component': 'FormItem',
        'x-component-props': {
          columns: 2,
          gap: 16
        },
        properties: {
          orientation: {
            type: 'string',
            title: '文本位置',
            enum: ['left', 'right', 'center'],
            enumNames: ['左', '右', '居中'],
            default: 'center',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
          },
          dashed: {
            type: 'boolean',
            title: '虚线',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false
          },
          plain: {
            type: 'boolean',
            title: '简单样式',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false
          }
        }
      },
    }
  };
};