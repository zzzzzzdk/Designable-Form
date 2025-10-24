// 导出所有组件行为
import TitleBehavior from './Title';
import ParagraphBehavior from './Paragraph';
import DividerBehavior from './Divider';
import FlexBehavior from './Flex';
import GridRowBehavior from './GridRow';
import GridColBehavior from './GridCol';

export {
  TitleBehavior,
  ParagraphBehavior,
  DividerBehavior,
  FlexBehavior,
  GridRowBehavior,
  GridColBehavior,
};

export default {
  Title: TitleBehavior,
  Paragraph: ParagraphBehavior,
  Divider: DividerBehavior,
  Flex: FlexBehavior,
  GridRow: GridRowBehavior,
  GridCol: GridColBehavior,
};