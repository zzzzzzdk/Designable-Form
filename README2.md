# Triones Designable 表单设计器项目文档
## 项目概述
Triones Designable 是一个基于 React、TypeScript 和 Vite 构建的可视化表单设计器，采用模块化架构，提供了从设计到渲染的完整表单解决方案。该项目能够帮助用户通过拖拽方式快速构建表单，并将设计结果转换为可直接使用的 Formily 表单配置。

## 项目结构
项目采用模块化设计，由多个核心包组成，每个包负责不同的功能模块：

- examples/basic/: 项目主目录，包含示例应用
    - src/: 源代码目录
        - App.tsx: 应用主入口，整合各个设计器组件
        - PreviewWidget.tsx: 表单预览组件
        - packages/: 核心包集合
            - designable-core: 设计器核心，负责拖拽、节点树、事件等底层逻辑
            - designable-formily-antd: 基于 Ant Design 的表单组件库
            - designable-formily-transformer: 设计树与 Formily schema 之间的转换器
            - designable-react: React UI 组件封装，提供设计器界面元素
            - designable-react-settings-form: 设置表单组件
            - designable-shared: 共享工具和方法
## 核心包结构

1.  designable-core: 设计器核心，负责拖拽、节点树、事件等底层逻辑

drivers/: 驱动模块，处理各种用户交互事件
effects/: 效果模块，处理视图变换和交互效果
models/: 数据模型，如 TreeNode、Engine、History 等
events/: 事件系统 
2. designable-react: React UI 组件封装，提供设计器界面元素

3.  designable-formily-antd: 基于 Ant Design 的表单组件库

4.  designable-formily-transformer: 设计树与 Formily schema 之间的转换器

5.  designable-react-settings-form: 设置表单组件

6.  designable-shared: 共享工具和方法

## 核心功能模块

### 1. 设计器引擎 (Engine)
   设计器引擎是整个系统的核心，负责管理设计器状态、节点树、操作历史等。在 App.tsx 中通过 createDesigner() 创建引擎实例，并配置快捷键等功能。

```TSX
const engine = useMemo( () =>
    createDesigner({
     shortcuts: [/* 快捷键配置 */], 
     rootComponentName: 'Form',
    }), [])
```

### 2. 组件库管理

项目提供了丰富的表单组件，包括基础输入组件、布局组件、数组组件等，并通过 ResourceWidget 进行分类展示：

```TSX
<ResourceWidgettitle="输入控件"sources={[Input, Password, NumberPicker, Rate, Slider, MyCustom]}/>
<ResourceWidget title="布局控件" sources={[Card, FormGrid, Space]} />
<ResourceWidgettitle="数组控件"sources={[ArrayCards, ArrayTable]}/>
```

### 3.设计树与 Schema 转换

designable-formily-transformer 包提供了两个核心函数：

- transformToSchema(): 将设计树(TreeNode)转换为 Formily 可识别的 schema
- transformToTreeNode(): 将 schema 转回设计树结构

转换流程：

1.  查找根节点（componentName 为 Form）
2.  递归遍历子节点，构建 schema 对象
3.  处理特殊情况，如数组类型组件
4.  表单预览功能
    PreviewWidget 组件负责将设计树渲染为实际的表单：

### 4.单预览功能

1.  接收设计树作为 props
2.  通过 transformToSchema 将设计树转为 schema
3.  使用 Formily 的 createForm 和 createSchemaField 创建表单实例
4.  渲染最终表单

```TSX
const { form: formProps, schema } = transformToSchema(props.tree)return (  <Form {...formProps} form={form}>    <SchemaField schema={schema} />  </Form>)
```

主要工作流程

1.  初始化设计器：创建设计器引擎，注册组件和快捷键
2.  组件拖拽设计：用户从左侧资源面板拖拽组件到工作区
3.  属性配置：选中组件后，在右侧属性面板配置组件属性
4.  实时预览：切换到预览视图查看表单实际效果
5.  导出配置：点击保存按钮，将设计树转换为 JSON 格式的 schema
    技术栈
    前端框架: React 18.3.1
    构建工具: Vite 5.4.8
    类型系统: TypeScript 5.5.3
    UI 组件库: Ant Design 5.8.0
    表单解决方案: Formily 2.2.27
    样式方案: @ant-design/cssinjs
    开发与构建
    项目提供了以下脚本命令：

npm run dev: 启动开发服务器
npm run build: 构建生产版本
npm run lint: 运行 ESLint 检查
npm run preview: 预览生产构建结果
扩展性
项目设计具有良好的扩展性，开发者可以：

1.  添加自定义组件（如示例中的 MyCustom）
2.  扩展设计器功能
3.  自定义转换规则
4.  对接不同的后端系统
    这个项目为快速构建复杂表单提供了强大的可视化工具，结合 Formily 和 Ant Design 的优势，既提供了良好的用户体验，又保证了开发效率和灵活性。
