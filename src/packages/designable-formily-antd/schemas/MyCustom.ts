import { ISchema } from '@formily/react';

export const MyCustom: ISchema = {
  type: 'object',
  properties: {
    value: {
      type: 'string',
      title: '内容',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入内容',
      },
    },
  },
};
