import { ISchema, Schema } from '@formily/json-schema';
import { ITreeNode } from '@/packages/designable-core';
import { clone, uid } from '@/packages/designable-shared';

export interface ITransformerOptions {
  designableFieldName?: string;
  designableFormName?: string;
}

export interface IFormilySchema {
  schema?: ISchema;
  form?: Record<string, any>;
}

const createOptions = (options: ITransformerOptions): ITransformerOptions => {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Form',
    ...options,
  };
};

const findNode = (node: ITreeNode, finder?: (node: ITreeNode) => boolean) => {
  if (!node) return;
  if (finder && finder(node)) return node;
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    if (findNode(node.children[i], finder)) return node.children[i];
  }
  return;
};

export const transformToSchema = (
  node: ITreeNode,
  options?: ITransformerOptions,
): IFormilySchema => {
  const realOptions = createOptions(options);
  const root = findNode(node, (child) => {
    return child.componentName === realOptions.designableFormName;
  });
  const schema = {
    type: 'object',
    properties: {},
  };
  if (!root) return { schema };
  
  // 定义布局组件的componentName列表
  const layoutComponentNames = [
    'Title', 'Paragraph', 'Divider', 'Flex', 'Table'
  ];
  
  const createSchema = (node: ITreeNode, schema: ISchema = {}) => {
    if (node !== root) {
      Object.assign(schema, clone(node.props));
    }
    schema['x-designable-id'] = node.id;
    
    // 为designable-layout-antd组件设置x-component属性
    if (layoutComponentNames.includes(node.componentName)) {
      schema['x-component'] = node.componentName;
    }
    
    if (schema.type === 'array') {
      if (node.children[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName ||
          layoutComponentNames.includes(node.children[0].componentName)
        ) {
          schema.items = createSchema(node.children[0]);
          schema['x-index'] = 0;
        }
      }
      node.children.slice(1).forEach((child, index) => {
        if (
          child.componentName !== realOptions.designableFieldName &&
          !layoutComponentNames.includes(child.componentName)
        ) return;
        const key = child.props.name || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]['x-index'] = index;
      });
    } else {
      node.children.forEach((child, index) => {
        if (
          child.componentName !== realOptions.designableFieldName &&
          !layoutComponentNames.includes(child.componentName)
        ) return;
        const key = child.props.name || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]['x-index'] = index;
      });
    }
    return schema;
  };
  return { form: clone(root.props), schema: createSchema(root, schema) };
};

export const transformToTreeNode = (
  formily: IFormilySchema = {},
  options?: ITransformerOptions,
) => {
  const realOptions = createOptions(options);
  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: formily.form,
    children: [],
  };
  const schema = new Schema(formily.schema);
  
  // 定义布局组件的componentName列表，与transformToSchema保持一致
  const layoutComponentNames = [
    'Title', 'Paragraph', 'Divider', 'Flex', 'Table'
  ];
  
  const cleanProps = (props: any) => {
    if (props['name'] === props['x-designable-id']) {
      delete props.name;
    }
    delete props['version'];
    delete props['_isJSONSchemaObject'];
    return props;
  };
  
  const appendTreeNode = (parent: ITreeNode, schema: Schema) => {
    if (!schema) return;
    
    // 获取schema的JSON数据
    const schemaJson = schema.toJSON(false);
    
    // 确定组件名称：优先使用x-component（如果是布局组件），否则使用默认的designableFieldName
    let componentName = realOptions.designableFieldName;
    if (schemaJson['x-component'] && layoutComponentNames.includes(schemaJson['x-component'])) {
      componentName = schemaJson['x-component'];
    }
    
    const current = {
      id: schema['x-designable-id'] || uid(),
      componentName: componentName,
      props: cleanProps(schemaJson),
      children: [],
    };
    
    parent.children.push(current);
    
    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items);
    }
    
    schema.mapProperties((schema) => {
      schema['x-designable-id'] = schema['x-designable-id'] || uid();
      appendTreeNode(current, schema);
    });
  };
  
  schema.mapProperties((schema) => {
    schema['x-designable-id'] = schema['x-designable-id'] || uid();
    appendTreeNode(root, schema);
  });
  
  return root;
};
