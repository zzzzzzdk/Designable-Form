import React from "react";
import { Table as AntTable } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createBehavior, createResource } from "@/packages/designable-core";
import { DnFC } from "@/packages/designable-react";
import { AllSchemas } from "@/packages/designable-layout-antd/schemas";
import { AllLocales } from "@/packages/designable-layout-antd/locales";

export interface TableProps {
  columns?: ColumnsType<any>;
  dataSource?: any[];
  pagination?: boolean | object;
  size?: "small" | "middle" | "large";
  bordered?: boolean;
  loading?: boolean;
  rowKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 确保columns属性的默认值是稳定的引用
const defaultColumns: ColumnsType<any> = [
  { title: "姓名", dataIndex: "name", key: "name", width: 100 },
  { title: "年龄", dataIndex: "age", key: "age", width: 80 },
  { title: "地址", dataIndex: "address", key: "address", ellipsis: true },
];

// 确保dataSource属性的默认值是稳定的引用
const defaultDataSource = [
  { key: "1", name: "张三", age: 32, address: "北京市朝阳区建国路88号" },
  { key: "2", name: "李四", age: 42, address: "上海市浦东新区陆家嘴金融中心" },
  { key: "3", name: "王五", age: 36, address: "广州市天河区珠江新城" },
];

export const Table: DnFC<TableProps> = (props) => {
  // 解构props，支持从schema配置中传递的所有属性
  const { 
    columns, 
    dataSource, 
    pagination, 
    size, 
    bordered, 
    loading, 
    rowKey = "key", 
    className,
    style,
    ...rest 
  } = props;

  // 处理columns - 确保它是有效的数组且包含必要的字段
  const processedColumns = React.useMemo(() => {
    // 如果columns是有效的数组且不为空，使用它
    if (Array.isArray(columns) && columns.length > 0) {
      // 确保每个列至少有title、dataIndex和key
      return columns.map(col => ({
        title: col.title || '未命名',
        dataIndex: col.dataIndex || '',
        key: col.key || col.dataIndex || Math.random().toString(36).substr(2, 9),
        ...col
      }));
    }
    // 否则使用默认列
    return defaultColumns;
  }, [columns]);

  // 处理dataSource - 确保它是有效的数组
  const processedDataSource = React.useMemo(() => {
    // 如果dataSource是有效的数组且不为空，使用它
    if (Array.isArray(dataSource) && dataSource.length > 0) {
      return dataSource.map(item => ({
        key: item.key || Math.random().toString(36).substr(2, 9),
        ...item
      }));
    }
    // 否则使用默认数据
    return defaultDataSource;
  }, [dataSource]);

  return (
    <AntTable
      columns={processedColumns}
      dataSource={processedDataSource}
      pagination={pagination !== undefined ? pagination : false}
      size={size || "middle"}
      bordered={bordered || false}
      loading={loading || false}
      rowKey={rowKey}
      {...rest}
      className={className}
      style={{
        ...style,
        border: "1px dashed #d9d9d9",
        borderRadius: "4px",
        padding: "8px",
      }}
    />
  );
};

Table.Behavior = createBehavior({
  name: "Table",
  selector: (node) => node.componentName === "Table",
  designerProps: {
    draggable: true,
    droppable: false,
    cloneable: true,
    deletable: true,
    propsSchema: AllSchemas.Table(),
    // 简化配置，确保基础选中功能正常
    selfRenderChildren: false
  },
  designerLocales: AllLocales.Table
});

Table.Resource = createResource({
  icon: "TableSource",
  elements: [
    {
      componentName: "Table",
      props: {
        pagination: false,
        size: "middle",
        bordered: false,
        // 初始化时使用默认的列和数据配置
        columns: defaultColumns,
        dataSource: defaultDataSource
      },
    },
  ],
});

export default Table;
