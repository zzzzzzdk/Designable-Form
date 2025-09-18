import React, { useEffect, useMemo, useState } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd-v5';
import { FormPlate } from '@/packages/designable-formily-antd';
import { Card, Slider, Rate, Spin, App } from 'antd';
import { TreeNode } from '@/packages/designable-core';
import { transformToSchema } from '@/packages/designable-formily-transformer';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

// 解析 a/b/c 路径
function getByPath(obj: any, path: string): any {
  if (!path) return obj;
  const data = path
    .split('/')
    .reduce((acc, k) => (acc ? acc[k] : undefined), obj);
  //   console.log('getByPath', obj, path, data);
  return data;
}

function mapToEnum(
  list: any[],
  labelKey: string,
  valueKey: string,
  childrenKey?: string,
) {
  if (!Array.isArray(list)) return [];
  return list.map((item, index) => {
    // 确保 value 不为 undefined，如果为 undefined 则使用索引或空字符串作为默认值
    const itemValue = item?.[valueKey];
    const safeValue = itemValue !== undefined && itemValue !== null ? itemValue : (index.toString());
    
    const mapped: any = { 
      label: item?.[labelKey] || `选项${index + 1}`, 
      value: safeValue 
    };
    
    const children = childrenKey ? item?.[childrenKey] : undefined;
    if (children && Array.isArray(children)) {
      mapped.children = mapToEnum(children, labelKey, valueKey, childrenKey);
    }
    return mapped;
  });
}

function buildUrlWithQuery(url: string, query?: Record<string, any>) {
  if (!query || Object.keys(query).length === 0) return url;
  const usp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((vv) => usp.append(k, String(vv)));
    else usp.append(k, String(v));
  });
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + usp.toString();
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { message: messageApi } = App.useApp();
  const form = useMemo(() => createForm(), []);
  // 使用useMemo缓存schema，只有当props.tree发生变化时才重新计算
  const { form: formProps, schema } = useMemo(
    () => transformToSchema(props.tree),
    [props.tree],
  );

  const [runtimeSchema, setRuntimeSchema] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;
    const cloned = JSON.parse(JSON.stringify(schema));
    const fetchTasks: Promise<void>[] = [];

    console.time('schema');
    // console.log('PreviewWidget useEffect executed, schema:', JSON.stringify(schema));
    const traverse = (node: any) => {
      if (!node || typeof node !== 'object') return;
      if (
        Array.isArray(node.enum) &&
        node.enum[0] &&
        node.enum[0].__dynamic__
      ) {
        const cfg = node.enum[0].__dynamic__;
        const {
          url,
          method,
          path,
          labelKey,
          valueKey,
          childrenKey,
          headers,
          query,
          body,
          bodyType,
        } = cfg;
        const reqUrl = buildUrlWithQuery(url, query);
        const init: RequestInit = { method, headers: { ...(headers || {}) } };
        if (method !== 'GET' && method !== 'DELETE') {
          if (bodyType === 'form') {
            const formBody = new URLSearchParams();
            Object.entries(body || {}).forEach(([k, v]) => {
              if (Array.isArray(v))
                v.forEach((vv) => formBody.append(k, String(vv)));
              else if (v !== undefined && v !== null)
                formBody.append(k, String(v));
            });
            init.body = formBody;
            (init.headers as any)['Content-Type'] =
              'application/x-www-form-urlencoded;charset=UTF-8';
          } else {
            init.body =
              typeof body === 'string' ? body : JSON.stringify(body || {});
            (init.headers as any)['Content-Type'] =
              'application/json;charset=UTF-8';
          }
        }
        const task = fetch(reqUrl, init)
          .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
          .then((json) => {
            if (aborted) return;
            const data = getByPath(json, path);
            node.enum = mapToEnum(
              data,
              labelKey || 'label',
              valueKey || 'value',
              childrenKey,
            );
          })
          .catch((err) => {
            if (!aborted)
              messageApi.error(`可选项加载失败: ${err.message || '网络错误'}`);
            node.enum = [];
          });
        fetchTasks.push(task);
      }
      if (node.items && typeof node.items === 'object') traverse(node.items);
      if (node.properties && typeof node.properties === 'object') {
        Object.keys(node.properties).forEach((k) =>
          traverse(node.properties[k]),
        );
      }
    };
    traverse(cloned);

    console.timeEnd('schema');
    console.log(cloned);

    if (fetchTasks.length > 0) {
      setLoading(true);
      Promise.all(fetchTasks).finally(() => {
        if (!aborted) {
          setRuntimeSchema(cloned);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      setRuntimeSchema(cloned);
    }
    return () => {
      aborted = true;
    };
  }, [schema, messageApi]);

  // useEffect(() => {
  //   console.log('runtimeSchema changed:', runtimeSchema);
  // }, [runtimeSchema]);

  const SchemaField = useMemo(() => {
    return createSchemaField({
      components: {
        Space,
        FormGrid,
        FormLayout,
        FormTab,
        FormCollapse,
        ArrayTable,
        ArrayCards,
        FormItem,
        DatePicker,
        Checkbox,
        Cascader,
        Editable,
        Input,
        Text,
        NumberPicker,
        Switch,
        Password,
        PreviewText,
        Radio,
        Reset,
        Select,
        Submit,
        TimePicker,
        Transfer,
        TreeSelect,
        Upload,
        Card,
        Slider,
        Rate,
        FormPlate,
      },
    });
  }, []);

  return (
    <Form {...formProps} form={form}>
      <Spin spinning={loading} style={{ minHeight: '300px' }}>
        <SchemaField schema={runtimeSchema} />
      </Spin>
    </Form>
  );
};
