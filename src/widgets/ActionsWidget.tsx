import React, { useEffect } from 'react'
import { Space, Button, Radio, Select } from 'antd'
// import { GithubOutlined } from '@ant-design/icons'
import { useDesigner, TextWidget } from '@/packages/designable-react'
import { GlobalRegistry } from '@/packages/designable-core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema } from '../service'
import { useTheme, themeOptions } from '../theme/ThemeContext.tsx'

export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    loadInitialSchema(designer)
  }, [])
  
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])
  
  return (
    <Space style={{ marginRight: 10 }}>
      {/* <Button href="https://designable-antd.formilyjs.org">Ant Design</Button> */}
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />
      
      <Select
        value={theme}
        options={themeOptions}
        onChange={setTheme}
        style={{ width: 120 }}
      />
      
      {/* <Button href="https://github.com/alibaba/designable" target="_blank">
        <GithubOutlined />
        Github
      </Button> */}
      <Button
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  )
})
