import { ISchema } from '@formily/json-schema';

export default (): ISchema => {
  return {
    type: 'object',
    properties: {
      direction: {
        type: 'string',
        title: '排列方向',
        enum: ['horizontal', 'vertical'],
        enumNames: ['水平', '垂直'],
        default: 'horizontal',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      justify: {
        type: 'string',
        title: '主轴对齐',
        enum: ['start', 'end', 'center', 'between', 'around', 'evenly'],
        enumNames: ['起点', '终点', '居中', '两端', '分散', '均匀'],
        default: 'start',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      align: {
        type: 'string',
        title: '交叉轴对齐',
        enum: ['start', 'center', 'end', 'baseline', 'stretch'],
        enumNames: ['起点', '居中', '终点', '基线', '拉伸'],
        default: 'center',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      wrap: {
        type: 'boolean',
        title: '是否换行',
        default: false,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      size: {
        type: 'string',
        title: '间距大小',
        enum: ['small', 'middle', 'large'],
        enumNames: ['小', '中', '大'],
        default: 'middle',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      gap: {
        type: ['number', 'string'],
        title: '自定义间距',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '例如：16px 或 16',
        },
      },
      className: {
        type: 'string',
        title: 'CSS类名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      style: {
        type: 'object',
        title: '样式',
        'x-decorator': 'FormItem',
        'x-component': 'Input.JSON',
      },
    },
  };
};