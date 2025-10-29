import { ISchema } from '@formily/json-schema';
import { Input, Select, Switch, FormGrid, FormItem } from '@formily/antd-v5';

export const Title = (): ISchema => {
  return {
    type: 'object',
    properties: {
      // 基础属性
      children: {
        type: 'string',
        title: '标题内容',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '请输入标题内容'
        },
      },
      // 配置属性
      level: {
        type: 'number',
        title: '标题级别',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择标题级别'
        },
        enum: [1, 2, 3, 4, 5, 6],
        enumNames: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        default: 3,
      },
      // 显示设置
      'x-layout': {
        type: 'object',
        title: '显示设置',
        'x-decorator': 'FormGrid',
        'x-component': 'FormItem',
        'x-component-props': {
          columns: 2,
          gap: 16
        },
        properties: {
          ellipsis: {
            type: 'boolean',
            title: '超出省略',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false
          },
          editable: {
            type: 'boolean',
            title: '可编辑',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false
          },
        }
      },
      // 样式设置
      className: {
        type: 'string',
        title: 'CSS类名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    }
  };
};