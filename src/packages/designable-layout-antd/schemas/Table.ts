import { ISchema } from "@formily/json-schema";
import { 
  Input, 
  Select, 
  Switch, 
  FormGrid, 
  FormItem, 
  ArrayTable, 
  ArrayCards,
  ObjectLayout,
  ObjectItem,
  Space
} from "@formily/antd-v5";

export const Table = (): ISchema => {
  return {
    type: "object",
    properties: {
      // 基础属性
      pagination: {
        type: "boolean",
        title: "显示分页",
        "x-decorator": "FormItem",
        "x-component": "Switch",
        default: false,
      },

      size: {
        type: "string",
        title: "表格大小",
        "x-decorator": "FormItem",
        "x-component": "Select",
        "x-component-props": {
          placeholder: "请选择表格大小",
        },
        enum: ["small", "middle", "large"],
        enumNames: ["小", "中", "大"],
        default: "middle",
      },
      bordered: {
        type: "boolean",
        title: "显示边框",
        "x-decorator": "FormItem",
        "x-component": "Switch",
        default: false,
      },
      loading: {
        type: "boolean",
        title: "加载状态",
        "x-decorator": "FormItem",
        "x-component": "Switch",
        default: false,
      },

      // 样式设置
      className: {
        type: "string",
        title: "CSS类名",
        "x-decorator": "FormItem",
        "x-component": "Input",
      },

      // 高级配置
      rowKey: {
        type: "string",
        title: "行数据主键",
        "x-decorator": "FormItem",
        "x-component": "Input",
        default: "key",
        "x-component-props": {
          placeholder: "请输入行数据主键字段名",
        },
      },
      
      // 表格字段配置
      columns: {
        type: "array",
        title: "表格字段",
        "x-decorator": "FormItem",
        "x-component": "ArrayTable",
        "x-component-props": {
          addable: true,
          removable: true,
          draggable: true,
          titleWidth: 100,
        },
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              title: "列标题",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入列标题",
              },
            },
            dataIndex: {
              type: "string",
              title: "数据字段",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入数据字段名",
              },
            },
            key: {
              type: "string",
              title: "列标识",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入列标识",
              },
            },
            width: {
              type: "number",
              title: "列宽度",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入列宽度",
              },
            },
            ellipsis: {
              type: "boolean",
              title: "文字溢出省略",
              "x-decorator": "FormItem",
              "x-component": "Switch",
            },
          },
        },
      },
      
      // 表格数据配置
      dataSource: {
        type: "array",
        title: "表格数据",
        "x-decorator": "FormItem",
        "x-component": "ArrayCards",
        "x-component-props": {
          addable: true,
          removable: true,
          draggable: true,
          title: "行数据",
        },
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              title: "行标识",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "请输入行标识",
              },
            },
            // 这里可以根据实际需要添加更多的动态字段配置
            // 或者使用更复杂的配置方式来支持动态添加字段
          },
        },
      },
    },
  };
};
