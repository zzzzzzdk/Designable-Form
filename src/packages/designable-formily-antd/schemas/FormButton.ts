export const FormButton: ISchema = {
  type: 'object',
  properties: {
    submitUrl: {
      type: 'string',
      title: '提交URL',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入提交地址',
      },
    },
    type: {
      type: 'string',
      title: '按钮类型',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
      enum: ['primary', 'default', 'dashed', 'link', 'text'],
    },

    size: {
      type: 'string',
      title: '按钮大小',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'middle',
      },
      enum: ['small', 'middle', 'large'],
    },

    children: {
      type: 'string',
      title: '按钮文本',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '提交表单',
      },
    },

    loading: {
      type: 'boolean',
      title: '加载状态',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },

    disabled: {
      type: 'boolean',
      title: '禁用状态',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },

    block: {
      type: 'boolean',
      title: '块状显示',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },

    center: {
      type: 'boolean',
      title: '居中显示',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
  },
};
