import { Engine } from '@/packages/designable-core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@/packages/designable-formily-transformer'

export const saveSchema = (designer: Engine, messageApi: any) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  messageApi.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema') || '{}'))
    )
  } catch {
    console.log('loadInitialSchema error')
  }
}
