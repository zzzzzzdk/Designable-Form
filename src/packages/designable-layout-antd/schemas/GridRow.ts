import { ISchema } from '@formily/json-schema';
import { FormGrid } from '@formily/antd-v5';

export default (): ISchema => {
  return {
    type: 'object',
    properties: {
      // 网格配置
      'x-grid-config': {
        type: 'object',
        title: '网格配置',
        'x-decorator': 'FormItem',
        'x-component': 'FormItem',
        properties: {
          gutter: {
            type: 'number',
            title: '列间距',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 100,
              step: 4
            },
            default: 0
          },
          wrap: {
            type: 'boolean',
            title: '自动换行',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: true
          }
        }
      },
      // 对齐设置
      'x-alignment': {
        type: 'object',
        title: '对齐设置',
        'x-decorator': 'FormGrid',
        'x-component': 'FormItem',
        'x-component-props': {
          columns: 2,
          gap: 16
        },
        properties: {
          align: {
            type: 'string',
            title: '垂直对齐',
            enum: ['top', 'middle', 'bottom'],
            enumNames: ['顶部', '居中', '底部'],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择垂直对齐方式'
            }
          },
          justify: {
            type: 'string',
            title: '水平排列',
            enum: ['start', 'end', 'center', 'space-around', 'space-between'],
            enumNames: ['左对齐', '右对齐', '居中', '等间距', '两端对齐'],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择水平排列方式'
            }
          }
        }
      },
      // 响应式设置
      'x-responsive': {
        type: 'object',
        title: '响应式设置',
        'x-decorator': 'FormItem',
        'x-component': 'FormItem',
        properties: {
          xs: {
            type: 'number',
            title: '超小屏幕列数',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 24
            }
          },
          sm: {
            type: 'number',
            title: '小屏幕列数',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 24
            }
          }
        }
      },
      // 样式设置
      style: {
        type: 'object',
        title: '样式设置',
        'x-decorator': 'FormItem',
        'x-component': 'Input.JSON',
        'x-component-props': {
          placeholder: '{"marginBottom": "16px"}'
        },
        default: {}
      },
      className: {
        type: 'string',
        title: 'CSS类名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      }
    }
  };
};