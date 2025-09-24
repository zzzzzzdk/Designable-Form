import { ISchema } from '@formily/react';

export const YisaMap: ISchema = {
  type: 'object',
  properties: {
    domId: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: `map-${Math.random().toString(36).substring(2, 15)}`,
      },
    },
    // center: {
    //   type: 'array',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['EXPRESSION'],
    //   },
    // },
    zoom: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 10,
      },
    },
    // zooms: {
    //   type: 'array',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     include: ['EXPRESSION'],
    //   },
    // },
    tileUrlTemplate: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: '${mapTileHost}/v3/tile?z={z}&x={x}&y={y}',
      },
    },
    mapTileHost: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: 'http://114.215.146.210:25003',
      },
    },
    // mapCRS: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    mapTileType: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    height: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: '400px',
      },
    },
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: '400px',
      },
    },
    // 点位数据接口配置
    locationDataApi: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入点位数据接口地址',
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
        defaultValue: 30000,
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
        defaultValue: 0,
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
        defaultValue: 1000,
      },
    },
    locationDataTransformer: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '(data) => { ... }',
        rows: 4,
        tooltip: '转换点位数据格式的函数',
      },
    },
  },
};