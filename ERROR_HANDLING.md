# 组件错误处理机制说明文档

## 概述

为了解决组件属性配置错误导致页面白屏的问题，我们实现了一套完整的错误处理机制，包括：

1. **ErrorBoundary（错误边界）** - 捕获组件渲染过程中的 JavaScript 错误
2. **PropValidator（属性验证器）** - 在组件渲染前验证属性配置
3. **EnhancedComponentWrapper（增强组件包装器）** - 结合错误边界和属性验证的完整解决方案

## 1. ErrorBoundary 错误边界

### 功能
- 捕获子组件树中的 JavaScript 错误
- 记录错误日志
- 显示友好的错误界面而不是白屏
- 提供重试机制

### 使用方法
```jsx
import { ErrorBoundary } from '@/widgets/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 自定义错误界面
```jsx
<ErrorBoundary fallback={<div>自定义错误界面</div>}>
  <MyComponent />
</ErrorBoundary>
```

## 2. PropValidator 属性验证器

### 功能
- 在组件渲染前验证属性配置
- 支持多种数据类型验证
- 支持自定义验证规则
- 提供详细的错误信息

### 使用方法
```jsx
import { PropValidator, CommonRules } from '@/widgets/PropValidator';

function MyComponentWrapper(props) {
  const rules = [
    CommonRules.string('title', true),  // 必需的字符串属性
    CommonRules.number('count'),        // 可选的数字属性
    CommonRules.boolean('disabled'),    // 布尔属性
  ];

  return (
    <PropValidator 
      componentName="MyComponent"
      props={props}
      rules={rules}
    >
      <MyComponent {...props} />
    </PropValidator>
  );
}
```

### 预定义验证规则
```jsx
// 常用验证规则
CommonRules.string(prop, required)      // 字符串验证
CommonRules.number(prop, required)      // 数字验证
CommonRules.boolean(prop, required)     // 布尔验证
CommonRules.array(prop, required)       // 数组验证
CommonRules.object(prop, required)      // 对象验证
CommonRules.function(prop, required)    // 函数验证

// 自定义验证规则
CommonRules.positiveNumber(prop, required)    // 正数验证
CommonRules.nonEmptyString(prop, required)    // 非空字符串验证
```

### 自定义验证规则
```jsx
const customRule = {
  prop: 'email',
  type: 'string',
  required: true,
  validator: (value) => /\S+@\S+\.\S+/.test(value),
  message: '请输入有效的邮箱地址'
};
```

## 3. EnhancedComponentWrapper 增强组件包装器

### 功能
- 结合错误边界和属性验证
- 提供预定义的组件验证规则
- 简化增强组件的创建过程

### 使用方法
```jsx
import { createEnhancedComponent, ComponentValidationRules } from '@/widgets/EnhancedComponentWrapper';

// 创建增强版组件
const EnhancedInput = createEnhancedComponent(
  'Input', 
  Input, 
  ComponentValidationRules.Input  // 使用预定义规则
);

// 或者使用自定义规则
const EnhancedCustomComponent = createEnhancedComponent(
  'CustomComponent',
  CustomComponent,
  [
    { prop: 'value', type: 'string', required: true },
    { prop: 'onChange', type: 'function' }
  ]
);
```

### 预定义组件验证规则
```jsx
ComponentValidationRules = {
  Input: [
    { prop: 'value', type: 'string' },
    { prop: 'placeholder', type: 'string' },
    { prop: 'disabled', type: 'boolean' }
  ],
  Select: [
    { prop: 'value', type: 'string' },
    { prop: 'options', type: 'array', required: true },
    { prop: 'placeholder', type: 'string' }
  ],
  Switch: [
    { prop: 'checked', type: 'boolean' },
    { prop: 'disabled', type: 'boolean' }
  ],
  Rate: [
    { prop: 'value', type: 'number' },
    { prop: 'count', type: 'number' },
    { prop: 'allowHalf', type: 'boolean' }
  ]
}
```

## 4. 在项目中的应用

### App.tsx 中的应用
```jsx
// 创建增强版组件
const EnhancedInput = createEnhancedComponent('Input', Input, ComponentValidationRules.Input);
const EnhancedSelect = createEnhancedComponent('Select', Select, ComponentValidationRules.Select);

// 在组件映射中使用
const components: IDesignerComponents = {
  Input: EnhancedInput,
  Select: EnhancedSelect,
  // 其他组件...
};
```

### 面板级错误处理
```jsx
<ViewPanel type="DESIGNABLE">
  {() => (
    <ErrorBoundary>
      <ComponentTreeWidget components={components} />
    </ErrorBoundary>
  )}
</ViewPanel>
```

## 5. 最佳实践

### 1. 为所有用户可见的组件添加错误边界
```jsx
// 推荐：在所有面板组件外层添加错误边界
<ErrorBoundary>
  <SettingsForm />
</ErrorBoundary>
```

### 2. 为核心业务组件添加属性验证
```jsx
// 推荐：为表单控件添加属性验证
const EnhancedInput = createEnhancedComponent(
  'Input', 
  Input, 
  ComponentValidationRules.Input
);
```

### 3. 合理使用 fallback 组件
```jsx
// 提供用户友好的错误界面
<ErrorBoundary fallback={
  <div className="error-fallback">
    <h3>组件加载失败</h3>
    <p>请检查组件配置或联系技术支持</p>
  </div>
}>
  <MyComponent />
</ErrorBoundary>
```

### 4. 记录错误日志
```jsx
// 错误边界会自动记录错误到控制台
// 在生产环境中，可以将错误发送到日志服务
```

## 6. 扩展和自定义

### 添加新的验证规则
```jsx
// 在 PropValidator.tsx 中添加新的验证规则
export const CommonRules = {
  // ... 现有规则
  
  // 新增规则示例
  email: (prop: string, required: boolean = false): ValidationRule => ({
    prop,
    type: 'string',
    required,
    validator: (value: string) => /\S+@\S+\.\S+/.test(value),
    message: `属性 "${prop}" 应该是有效的邮箱地址`,
  }),
};
```

### 添加新的组件验证规则
```jsx
// 在 EnhancedComponentWrapper.tsx 中添加
export const ComponentValidationRules: Record<string, Array<{ prop: string; type: string; required?: boolean }>> = {
  // ... 现有规则
  
  // 新增组件规则示例
  Upload: [
    { prop: 'action', type: 'string', required: true },
    { prop: 'multiple', type: 'boolean' },
    { prop: 'accept', type: 'string' }
  ],
};
```

## 7. 故障排除

### 问题：错误边界没有捕获到错误
**解决方案**：
1. 确保错误边界包裹了正确的组件树
2. 检查错误是否发生在事件处理器中（错误边界不捕获事件处理器中的错误）
3. 检查错误是否发生在异步代码中（需要手动捕获）

### 问题：属性验证过于严格
**解决方案**：
1. 调整验证规则的 required 属性
2. 添加更宽松的自定义验证器
3. 在设计模式下跳过验证

### 问题：错误界面不够友好
**解决方案**：
1. 使用 fallback 属性提供自定义错误界面
2. 根据不同的错误类型提供不同的提示信息
3. 添加重试或恢复功能