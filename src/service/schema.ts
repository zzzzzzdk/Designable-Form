import { Engine } from '@/packages/designable-core'
import {
  transformToSchema,
  transformToTreeNode,
  IFormilySchema
} from '@/packages/designable-formily-transformer'
import { uid } from '@/packages/designable-shared'

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

// 发布表单到指定接口
export const publishSchema = async (designer: Engine, submitUrl: string, fieldName: string, messageApi: any) => {
  try {
    // 转换当前设计的表单为schema
    const schema = transformToSchema(designer.getCurrentTree())
    
    // 生成唯一ID
    const formId = uid()
    
    
    const payload = {
      id: formId,
      [fieldName]: schema
    }
    
    // 发送请求到指定接口
    const response = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    messageApi.success('发布成功')
    
    // 跳转到预览页面，通过URL参数传递ID
    window.location.href = `/preview?id=${formId}`
    
    return result
  } catch (error) {
    console.error('发布失败:', error)
    messageApi.error(`发布失败: ${error instanceof Error ? error.message : '未知错误'}`)
    throw error
  }
}
