import { ISchema } from '@formily/json-schema';
import { FormGrid } from '@formily/antd-v5';

export default (): ISchema => {
  return {
    type: 'object',
    properties: {
      // 基础列配置
      'x-col-config': {
        type: 'object',
        title: '基础列配置',
        'x-decorator': 'FormItem',
        'x-component': 'FormItem',
        properties: {
          span: {
            type: 'number',
            title: '栅格列数',
            description: '在24栏栅格系统中占据的列数',
            default: 24,
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              showSearch: true,
              optionFilterProp: 'label',
              placeholder: '请选择栅格列数'
            }
          }
        }
      },
      
      // 偏移与排序
      'x-position': {
        type: 'object',
        title: '位置设置',
        'x-decorator': 'FormGrid',
        'x-component': 'FormItem',
        'x-component-props': {
          columns: 3,
          gap: 12
        },
        properties: {
          order: {
            type: 'number',
            title: '排序',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: -24,
              max: 24,
              placeholder: '0'
            }
          },
          offset: {
            type: 'number',
            title: '左侧偏移',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 24,
              placeholder: '0'
            }
          },
          push: {
            type: 'number',
            title: '向右移动',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 24,
              placeholder: '0'
            }
          },
          pull: {
            type: 'number',
            title: '向左移动',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              min: 0,
              max: 24,
              placeholder: '0'
            }
          }
        }
      },
      
      // 响应式布局
      'x-responsive': {
        type: 'object',
        title: '响应式布局',
        'x-decorator': 'FormItem',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true
        },
        properties: {
          xs: {
            type: 'number',
            title: '超小屏幕 (<576px)',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-component-props': {
              placeholder: '自动'
            }
          },
          sm: {
            type: 'number',
            title: '小屏幕 (≥576px)',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-component-props': {
              placeholder: '自动'
            }
          },
          md: {
            type: 'number',
            title: '中等屏幕 (≥768px)',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-component-props': {
              placeholder: '自动'
            }
          },
          lg: {
            type: 'number',
            title: '大屏幕 (≥992px)',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-component-props': {
              placeholder: '自动'
            }
          },
          xl: {
            type: 'number',
            title: '超大屏幕 (≥1200px)',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            'x-component-props': {
              placeholder: '自动'
            }
          }
        }
      },
      
      // 样式设置
      className: {
        type: 'string',
        title: 'CSS类名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      style: {
        type: 'object',
        title: '样式设置',
        'x-decorator': 'FormItem',
        'x-component': 'Input.JSON',
        'x-component-props': {
          placeholder: '{"padding": "16px", "backgroundColor": "#f0f0f0"}'
        },
        default: {}
      }
    }
  };
};