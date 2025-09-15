import { ISchema } from '@formily/react';

export const Input: ISchema & { TextArea?: ISchema } = {
  type: 'object',
  properties: {
    addonBefore: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    addonAfter: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    prefix: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    suffix: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    variant: {
      type: 'string',
      enum: ['outlined', 'borderless', 'filled'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'outlined',
      },
    },
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'middle', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'middle',
      },
    },
    // 添加新的autoFocus属性
    // autoFocus: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
  },
};

Input.TextArea = {
  type: 'object',
  properties: {
    variant: {
      type: 'string',
      enum: ['outlined', 'borderless', 'filled'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'outlined',
      },
    },
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    autoSize: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    showCount: {
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // 为TextArea也添加autoFocus属性
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};
