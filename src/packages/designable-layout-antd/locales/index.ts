import * as ComponentLocales from './Component';
import * as TitleLocales from './Title';
import * as ParagraphLocales from './Paragraph';
import * as DividerLocales from './Divider';
import * as GridRowLocales from './GridRow';
import * as GridColLocales from './GridCol';
import * as FlexLocales from './Flex';

// Export individual locales
export { TitleLocales, ParagraphLocales, DividerLocales };

export const GridLocales = {
  Row: GridRowLocales.default,
  Col: GridColLocales.default
};

export { FlexLocales };

export const locales = {
  Component: ComponentLocales.default,
  Title: TitleLocales.default,
  Paragraph: ParagraphLocales.default,
  Divider: DividerLocales.default,
  GridRow: GridRowLocales.default,
  GridCol: GridColLocales.default,
  Flex: FlexLocales.default,
};

export default locales;