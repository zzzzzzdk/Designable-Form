import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createVoidFieldSchema, createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import React from 'react';
import SubmitButton from './SubmittButton';

export const FormButton: DnFC<
  React.ComponentProps<typeof SubmitButton>
> = SubmitButton;

FormButton.Behavior = createBehavior({
  name: 'FormButton',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'FormButton',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.FormButton),
  },
  designerLocales: AllLocales.FormButton,
});

FormButton.Resource = createResource({
  icon: 'Button',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormButton',
         'x-decorator': 'FormItem',
        'x-component-props': {
          type: 'primary',
          children: '提交表单',
          center: true,
          buttonType: 'submit',
        },
      },
    },
  ],
});
