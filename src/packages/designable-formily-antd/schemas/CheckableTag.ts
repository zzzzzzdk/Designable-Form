import type { ISchema } from '@formily/json-schema';

export const CheckableTag: ISchema = {
  type: 'object',
  properties: {
    fieldName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    showAsRadio: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
  },
};