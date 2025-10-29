// 导出所有组件行为
import { ComponentBehavior } from './Component';
import { TitleBehavior } from './Title';
import { ParagraphBehavior } from './Paragraph';
import { DividerBehavior } from './Divider';

export {
  ComponentBehavior,
  TitleBehavior,
  ParagraphBehavior,
  DividerBehavior,
};

export default {
  Component: ComponentBehavior,
  Title: TitleBehavior,
  Paragraph: ParagraphBehavior,
  Divider: DividerBehavior,
};