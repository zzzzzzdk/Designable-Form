import { ISchema } from '@formily/react';

export const ColorPicker: ISchema = {
  type: 'object',
  properties: {
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
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
    // variant: {
    //   type: 'string',
    //   enum: ['outlined', 'borderless', 'filled'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props': {
    //     defaultValue: 'outlined',
    //   },
    // },
    format: {
      type: 'string',
      enum: ['hex', 'rgb', 'hsb', 'hsl'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'hex',
        options: [
          { label: 'Hex', value: 'hex' },
          { label: 'RGB', value: 'rgb' },
          { label: 'HSB', value: 'hsb' },
          { label: 'HSL', value: 'hsl' },
        ],
      },
    },
    // presets: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input.TextArea',
    //   'x-component-props': {
    //     placeholder: '预设颜色列表，格式为逗号分隔的颜色值，如：#ff0000,#00ff00,#0000ff',
    //   },
    // },
    showText: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // triggerProps: {
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ObjectSetter',
    // },
  },
};