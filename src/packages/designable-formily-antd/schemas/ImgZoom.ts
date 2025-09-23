import { ISchema } from '@formily/react';

export const ImgZoom: ISchema = {
  type: 'object',
  properties: {
    imgSrc: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    // position: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     defaultValue: 'right',
    //   },
    //   enum: [
    //     {
    //       label: '左',
    //       value: 'left',
    //     },
    //     {
    //       label: '右',
    //       value: 'right',
    //     },
    //   ],
    // },
    scale: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    draggable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
  },
};