import { ISchema } from '@formily/json-schema';
import { FormGrid, FormItem, Input, Switch, NumberPicker } from '@formily/antd-v5';

export const Paragraph = (): ISchema => {
  return {
    type: 'object',
    properties: {
      // 基础属性
      children: {
        type: 'string',
        title: '段落内容',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请输入段落文本内容'
        },
        default: '这是一段默认文本内容'
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
          copyable: {
            type: 'boolean',
            title: '可复制',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false
          }
        }
      },
      // 省略设置（当ellipsis为true时显示）
      'x-ellipsis-settings': {
        type: 'object',
        title: '省略设置',
        'x-decorator': 'FormItem',
        'x-component': 'FormItem',
        'x-reactions': {
          dependencies: ['.ellipsis'],
          fulfill: {
            state: {
              visible: '{{$deps[0]}}'
            }
          }
        },
        properties: {
          rows: {
            type: 'number',
            title: '显示行数',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 1,
              max: 10
            }
          }
        }
      },
    }
  };
};