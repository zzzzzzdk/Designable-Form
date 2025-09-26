import React, { useEffect, useState } from 'react'
import { Space, Button, Radio, Select, App, Modal, Form, Input } from 'antd'
// import { GithubOutlined } from '@ant-design/icons'
import { useDesigner, TextWidget } from '@/packages/designable-react'
import { GlobalRegistry } from '@/packages/designable-core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema, publishSchema } from '../service'
import { useTheme, themeOptions } from '../theme/ThemeContext.tsx'
import dayjs from 'dayjs'

export const ActionsWidget = observer(() => {
  const { message: messageApi } = App.useApp();
  const designer = useDesigner()
  const { theme, setTheme } = useTheme()
  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const [publishForm] = Form.useForm()
  
  useEffect(() => {
    loadInitialSchema(designer)
  }, [])
  
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
      dayjs.locale('zh-cn');
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
          dayjs.locale(e.target.value);
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
          saveSchema(designer, messageApi)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          // 检查是否有组件配置
          const currentTree = designer.getCurrentTree()
          // 判断当前树是否为空或没有任何组件节点
          if (!currentTree || (!currentTree.children || currentTree.children.length === 0)) {
            messageApi.warning('请先添加组件配置，然后再进行发布操作')
            return
          }
          setPublishModalVisible(true)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
      
      {/* 发布弹窗 */}
      <Modal
        title="发布表单"
        open={publishModalVisible}
        onOk={async () => {
          try {
            const values = await publishForm.validateFields()
            await publishSchema(designer, values.submitUrl, values.fieldName, messageApi)
            setPublishModalVisible(false)
            publishForm.resetFields()
          } catch (info) {
            console.log('操作失败:', info)
          }
        }}
        onCancel={() => {
          setPublishModalVisible(false)
          publishForm.resetFields()
        }}
        okText="发布"
        cancelText="取消"
      >
        <Form
          form={publishForm}
          layout="vertical"
          initialValues={{
            fieldName: 'schema'
          }}
        >
          <Form.Item
            name="submitUrl"
            label="提交地址"
            rules={[
              { required: true, message: '请输入提交地址' },
              { type: 'url', message: '请输入有效的URL地址' }
            ]}
          >
            <Input placeholder="请输入API接口地址" />
          </Form.Item>
          
          <Form.Item
            name="fieldName"
            label="字段名称"
            rules={[
              { required: true, message: '请输入字段名称' }
            ]}
          >
            <Input placeholder="请输入提交时的字段名称" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
})
