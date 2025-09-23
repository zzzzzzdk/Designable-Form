import React from 'react';
import { createBehavior, createResource } from '@/packages/designable-core';
import { DnFC } from '@/packages/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import FormVehicleModelWrapper from './FormVehicleModelWrapper'

export const FormVehicleModel: DnFC<
  React.ComponentProps<typeof FormVehicleModelWrapper>
> = (props) => {
  // 在预览模式下设置previewMode为true
  const isPreviewMode = typeof window !== 'undefined' && window.location.pathname.includes('/preview');
  return <FormVehicleModelWrapper {...props} previewMode={isPreviewMode} />;
};

FormVehicleModel.Behavior = createBehavior({
  name: 'FormVehicleModel',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'FormVehicleModel', 
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.FormVehicleModel),
  },
  designerLocales: AllLocales.FormVehicleModel,
});


FormVehicleModel.Resource = createResource({
  icon: <div>车型选择</div>,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'FormVehicleModel',
        'x-decorator': 'FormItem',
        'x-component': 'FormVehicleModel', 
      },
    },
  ],
});
