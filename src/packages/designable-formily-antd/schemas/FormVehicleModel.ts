import { ISchema } from '@formily/react';

export const FormVehicleModel: ISchema & { TabPane?: ISchema } = {
  type: 'object',
  properties: {
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入提示文字',
      },
    },
    searchPlaceholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入搜索提示文字',
      },
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    loading: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    bordered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    mode: {
      type: 'string',
      enum: ['single', 'multiple'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'single',
      },
    },
    size: {
      type: 'string',
      enum: ['mini', 'small', 'default', 'large'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
    separator: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '分隔符，默认为 /',
      },
    },
    maxHeight: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '下拉框最大高度',
        min: 200,
        max: 800,
        defaultValue: 540,
      },
    },
    destroyPopupOnHide: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    bmyApi: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入车型数据接口地址',
      },
    },
    hotBrandApi: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入热门品牌接口地址',
      },
    },
    requestHeaders: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '{"Content-Type": "application/json", ...}',
        rows: 3,
        tooltip: 'JSON格式的请求头配置',
      },
    },
    requestTimeout: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '30000',
        min: 1000,
        max: 120000,
      },
    },
    requestRetryCount: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '0',
        min: 0,
        max: 10,
        step: 1,
      },
    },
    requestRetryDelay: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '1000',
        min: 100,
        max: 5000,
        step: 100,
      },
    },
    brandTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换品牌数据格式的函数',
      },
    },
    modelTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换型号数据格式的函数',
      },
    },
    yearTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换年款数据格式的函数',
      },
    },
    hotBrandTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换热门品牌数据格式的函数',
      },
    },
    allBrandTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换全品牌数据格式的函数',
      },
    },
  },
};