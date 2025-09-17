import { uid, clone, toArr } from '@formily/shared';
import { IDataSourceItem, INodeItem } from './types';

export interface INode {
  key?: string;
  map?: any;
  children?: INode[];
}

export const traverseTree = <T extends INode>(
  data: T[],
  callback: (dataItem: T, i: number, data: T[]) => any,
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data);
    if (data[i]?.children) {
      traverseTree(data[i].children as T[], callback);
    }
  }
};

export const transformValueToData = (value: IDataSourceItem[]): INodeItem[] => {
  // 如果包含动态数据标记，返回空数组
  if (Array.isArray(value) && value[0] && (value as any)[0]?.__dynamic__) {
    return [];
  }

  const data = clone(value) as any[];
  traverseTree(data, (_, i, dataSource) => {
    const dataItem: INodeItem = {
      key: '',
      duplicateKey: '',
      map: [],
      children: [],
    };
    for (const [key, value] of Object.entries(dataSource[i] || {})) {
      if (key !== 'children') {
        // 确保value属性有默认值，避免undefined
        const safeValue = value !== undefined && value !== null ? value : '';
        dataItem.map!.push({ 
          label: key, 
          value: safeValue 
        });
      }
    }
    
    const uuid = uid();
    dataItem.key = uuid;
    dataItem.duplicateKey = uuid;
    dataItem.children = dataSource[i].children || [];
    dataSource[i] = dataItem;
  });
  return data;
};

export const transformDataToValue = (data: INodeItem[]): IDataSourceItem[] => {
  const value = clone(data) as any[];
  traverseTree(value, (_, i, dataSource) => {
    const valueItem: IDataSourceItem = {
      children: [],
    };
    toArr(dataSource[i].map).forEach((mapItem) => {
      if (mapItem.label) {
        // 确保value属性有默认值，避免undefined
        const safeValue = mapItem.value !== undefined && mapItem.value !== null ? mapItem.value : '';
        (valueItem as any)[mapItem.label] = safeValue;
      }
    });
    
    valueItem.children = dataSource[i]?.children || [];
    dataSource[i] = valueItem;
  });
  return value;
};
