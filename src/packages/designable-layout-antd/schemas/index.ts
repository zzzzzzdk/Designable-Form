import { ISchema } from '@formily/json-schema';
import { createSchemaField } from '@formily/react';

// Component schemas
import TitleSchemaFn from './Title';
import ParagraphSchemaFn from './Paragraph';
import DividerSchemaFn from './Divider';
import GridRowSchemaFn from './GridRow';
import GridColSchemaFn from './GridCol';
import FlexSchemaFn from './Flex';

// Execute schema functions to get actual schema objects
const TitleSchema = TitleSchemaFn();
const ParagraphSchema = ParagraphSchemaFn();
const DividerSchema = DividerSchemaFn();
const GridRowSchema = GridRowSchemaFn();
const GridColSchema = GridColSchemaFn();
const FlexSchema = FlexSchemaFn();

// Export individual schemas
export { TitleSchema, ParagraphSchema, DividerSchema };

export const GridSchema = {
  Row: GridRowSchema,
  Col: GridColSchema
};

export { FlexSchema };

const SchemaField = createSchemaField();

export const schemas = {
  Title: TitleSchema,
  Paragraph: ParagraphSchema,
  Divider: DividerSchema,
  GridRow: GridRowSchema,
  GridCol: GridColSchema,
  Flex: FlexSchema,
};

export default schemas;