import { Component } from './Component';
import { Title } from './Title';
import { Paragraph } from './Paragraph';
import { Divider } from './Divider';
import { Table } from './Table';

// 修复AllLocales对象结构，确保每个组件的本地化对象直接包含语言版本
export const AllLocales = {
  Component: Component || {},
  Title: Title || {},
  Paragraph: Paragraph || {},
  Divider: Divider || {},
  Table: Table || {}
};

// 同时单独导出每个组件的本地化对象，以保持兼容性
export { Component, Title, Paragraph, Divider, Table };
