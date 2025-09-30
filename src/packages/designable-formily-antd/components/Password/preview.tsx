import React from 'react';
import { Password as FormilyPassword } from '@formily/antd-v5';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Password: DnFC<React.ComponentProps<typeof FormilyPassword>> =
  FormilyPassword;

Password.Behavior = createBehavior({
  name: 'Password',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Password',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Password),
  },
  designerLocales: AllLocales.Password,
});

Password.Resource = createResource({
  icon: 'PasswordSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Password',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          placeholder: '请输入密码',
        },
      },
    },
  ],
});
