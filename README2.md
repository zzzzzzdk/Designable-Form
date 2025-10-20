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

## 保存发布操作

### 1. 核心保存功能

项目中的保存功能主要通过 `src/service/schema.ts` 中的 `saveSchema` 函数实现：

```typescript
export const saveSchema = (designer: Engine, messageApi: any, type: "save" | "publish") => {
  const formilySchema: IFormilySchema = transformToSchema(designer.getCurrentTree())
  localStorage.setItem('formily-schema', JSON.stringify(formilySchema))
  
  const params = new URLSearchParams(document.location.search);
  const origin = params.get('origin')

  if(origin) {
    window.parent.postMessage({
      type,
      payload: {formilySchema, screenType: designer.screen.type},
      source:'iframe'
    }, origin)
  }
}
```

**核心流程**：
- 将设计树转换为 Formily Schema
- 保存到本地存储 `localStorage`
- 如果存在 `origin` 参数，通过 `postMessage` 向父窗口发送消息

### 2. 发布功能

发布功能通过 `publishSchema` 函数实现：

```typescript
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
      headers: {'Content-Type': 'application/json'},
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
```

**发布流程**：
- 将设计树转换为 Schema
- 生成唯一 ID
- 构建发布数据
- 发送 POST 请求到指定接口
- 成功后跳转到预览页面 (`/preview?id=${formId}`)

### 3. 保存发布注意事项

1. **保存位置**：默认保存到浏览器 localStorage，支持通过 postMessage 与父应用通信
2. **数据格式**：使用 Formily Schema 格式进行保存和发布
3. **错误处理**：发布过程包含完整的错误捕获和提示
4. **预览功能**：发布成功后支持跳转预览

## 微前端嵌入与无界Bus通信

### 1. 无界微前端环境适配

项目支持作为无界(wujie)微前端框架的子应用，主要包括以下适配：

#### 1.1 跨域配置

在 `vite.config.ts` 中配置跨域：

```typescript
export default defineConfig({
  server: {
    cors: true,
    // 或更详细的配置
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    // },
  },
});
```

#### 1.2 入口文件改造

在 `src/main.tsx` 中实现无界生命周期：

```typescript
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

if (window.__POWERED_BY_WUJIE__) {
  window.__WUJIE_MOUNT = () => {
    root.render(
      <Provider store={store}>
        <APPRouter />
        <Update />
      </Provider>
    );
  };
  window.__WUJIE_UNMOUNT = () => {
    root.unmount();
  };
} else {
  root.render(
    <Provider store={store}>
      <APPRouter />
      <Update />
    </Provider>
  );
}
```

### 2. 无界Bus通信实现

#### 2.1 子应用向主应用发送事件

项目中提供了事件总线工具用于与主应用通信：

```typescript
export const subAppEventBus = {
  // 通知主应用登录
  notifyLogin: (userData: any) => {
    if (window.__POWERED_BY_WUJIE__) {
      window.$wujie?.bus.$emit('subApp:login', userData);
    } else {
      console.log('独立运行模式: 登录事件', userData);
    }
  },

  // 通知主应用登出
  notifyLogout: () => {
    if (window.__POWERED_BY_WUJIE__) {
      window.$wujie?.bus.$emit('subApp:logout');
    } else {
      console.log('独立运行模式: 登出事件');
    }
  },

  // 通知主应用路由变化
  notifyRouteChange: (path: string) => {
    if (window.__POWERED_BY_WUJIE__) {
      window.$wujie?.bus.$emit('subApp:routeChange', path);
    }
  },

  // 其他事件...
};
```

#### 2.2 监听主应用事件

项目提供了完整的事件监听机制，通过 `mainAppEventListener` 和 React Hooks 来方便地监听主应用事件：

```typescript
// 主应用事件监听器 (src/utils/eventBus.ts)
export const mainAppEventListener = {
  // 监听主应用的路由变化事件
  onRouterChange: (callback: (path: string) => void) => {
    if (window.__POWERED_BY_WUJIE__) {
      const handler = (path: string) => {
        console.log('主应用要求跳转到:', path);
        callback(path);
      };
      
      window.$wujie?.bus.$on('mainApp:routerChange', handler);
      
      // 返回清理函数
      return () => {
        window.$wujie?.bus.$off('mainApp:routerChange', handler);
      };
    }
    return () => {};
  },

  // 监听主应用的数据更新事件
  onDataUpdate: (callback: (data: any) => void) => {
    if (window.__POWERED_BY_WUJIE__) {
      const handler = (data: any) => {
        console.log('主应用下发新数据:', data);
        callback(data);
      };
      
      window.$wujie?.bus.$on('mainApp:dataUpdate', handler);
      
      // 返回清理函数
      return () => {
        window.$wujie?.bus.$off('mainApp:dataUpdate', handler);
      };
    }
    return () => {};
  },

  // 监听主应用的用户信息更新事件
  onUserInfoUpdate: (callback: (userInfo: any) => void) => {
    if (window.__POWERED_BY_WUJIE__) {
      const handler = (userInfo: any) => {
        console.log('主应用更新用户信息:', userInfo);
        callback(userInfo);
      };
      
      window.$wujie?.bus.$on('mainApp:userInfoUpdate', handler);
      
      // 返回清理函数
      return () => {
        window.$wujie?.bus.$off('mainApp:userInfoUpdate', handler);
      };
    }
    return () => {};
  },

  // 监听主应用的权限更新事件
  onPermissionUpdate: (callback: (permissions: string[]) => void) => {
    if (window.__POWERED_BY_WUJIE__) {
      const handler = (permissions: string[]) => {
        console.log('主应用更新权限信息:', permissions);
        callback(permissions);
      };
      
      window.$wujie?.bus.$on('mainApp:permissionUpdate', handler);
      
      // 返回清理函数
      return () => {
        window.$wujie?.bus.$off('mainApp:permissionUpdate', handler);
      };
    }
    return () => {};
  },

  // 监听主应用的配置更新事件
  onConfigUpdate: (callback: (config: any) => void) => {
    if (window.__POWERED_BY_WUJIE__) {
      const handler = (config: any) => {
        console.log('主应用更新配置:', config);
        callback(config);
      };
      
      window.$wujie?.bus.$on('mainApp:configUpdate', handler);
      
      // 返回清理函数
      return () => {
        window.$wujie?.bus.$off('mainApp:configUpdate', handler);
      };
    }
    return () => {};
  }
};
```

### 3. React Hooks 支持

为方便在 React 组件中使用，项目提供了专用的 React Hooks：

```typescript
// src/hooks/useMainAppEvents.ts
import { useEffect } from 'react';
import { mainAppEventListener } from '../utils/eventBus';

interface UseMainAppEventsOptions {
  onRouterChange?: (path: string) => void;
  onDataUpdate?: (data: any) => void;
  onUserInfoUpdate?: (userInfo: any) => void;
  onPermissionUpdate?: (permissions: string[]) => void;
  onConfigUpdate?: (config: any) => void;
}

/**
 * 监听主应用事件的Hook
 * 提供便捷的方式在React组件中监听主应用通过无界微前端传递的事件
 */
export const useMainAppEvents = (options: UseMainAppEventsOptions = {}) => {
  useEffect(() => {
    // 检查是否在无界微前端环境中运行
    if (!window.__POWERED_BY_WUJIE__) {
      console.log('非微前端环境，跳过事件监听');
      return;
    }

    const cleanupFunctions: (() => void)[] = [];

    // 注册路由变化事件监听
    if (options.onRouterChange) {
      const cleanup = mainAppEventListener.onRouterChange(options.onRouterChange);
      cleanupFunctions.push(cleanup);
    }

    // 注册数据更新事件监听
    if (options.onDataUpdate) {
      const cleanup = mainAppEventListener.onDataUpdate(options.onDataUpdate);
      cleanupFunctions.push(cleanup);
    }

    // 注册用户信息更新事件监听
    if (options.onUserInfoUpdate) {
      const cleanup = mainAppEventListener.onUserInfoUpdate(options.onUserInfoUpdate);
      cleanupFunctions.push(cleanup);
    }

    // 注册权限更新事件监听
    if (options.onPermissionUpdate) {
      const cleanup = mainAppEventListener.onPermissionUpdate(options.onPermissionUpdate);
      cleanupFunctions.push(cleanup);
    }

    // 注册配置更新事件监听
    if (options.onConfigUpdate) {
      const cleanup = mainAppEventListener.onConfigUpdate(options.onConfigUpdate);
      cleanupFunctions.push(cleanup);
    }

    // 组件卸载时清理所有监听器
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      console.log('已清理主应用事件监听器');
    };
  }, [options]);
};

// 简化的监听Hook
export const useMainAppRouter = (onRouterChange: (path: string) => void) => {
  useMainAppEvents({ onRouterChange });
};

export const useMainAppUserInfo = (onUserInfoUpdate: (userInfo: any) => void) => {
  useMainAppEvents({ onUserInfoUpdate });
};

export const useMainAppPermissions = (onPermissionUpdate: (permissions: string[]) => void) => {
  useMainAppEvents({ onPermissionUpdate });
};
```

### 4. 使用示例

#### 4.1 在组件中使用 Hooks 监听事件

```typescript
import React from 'react';
import { useMainAppEvents } from '../hooks/useMainAppEvents';
import { subAppEventBus } from '../utils/eventBus';

function MyComponent() {
  // 监听多个事件
  useMainAppEvents({
    onRouterChange: (path) => {
      console.log('路由变化:', path);
      // 执行路由跳转
    },
    onUserInfoUpdate: (userInfo) => {
      console.log('用户信息更新:', userInfo);
      // 更新用户状态
    }
  });

  // 向主应用发送事件
  const handleSaveForm = () => {
    const formData = { id: 'form-123', name: '测试表单' };
    subAppEventBus.notifyFormSave(formData);
  };

  return (
    <div>
      <button onClick={handleSaveForm}>保存表单</button>
    </div>
  );
}
```

#### 4.2 在路由组件中使用简化 Hook

```typescript
import React from 'react';
import { useMainAppRouter } from '../hooks/useMainAppEvents';
import { useNavigate } from 'react-router-dom';

function AppRouter() {
  const navigate = useNavigate();
  
  // 监听主应用路由指令并执行跳转
  useMainAppRouter((path) => {
    navigate(path);
  });

  return <div>应用路由组件</div>;
}
```

### 5. 事件通信最佳实践

1. **统一事件命名规范**：
   - 子应用发送事件：`subApp:事件名`
   - 主应用发送事件：`mainApp:事件名`

2. **类型安全**：所有事件处理函数都使用 TypeScript 类型定义

3. **清理机制**：组件卸载时必须清理事件监听器，避免内存泄漏

4. **环境检查**：始终检查 `window.__POWERED_BY_WUJIE__` 确保在微前端环境中运行

5. **错误处理**：在事件处理函数中添加 try-catch 以防止异常影响整个应用

6. **日志记录**：关键事件添加日志记录以便调试和监控

7. **数据序列化**：确保在事件中传递的数据可序列化，避免传递复杂对象或循环引用
```

### 3. 统一配置管理

项目提供了统一配置中心，用于管理与主应用的配置：

```typescript
const isInWujie = window.__POWERED_BY_WUJIE__;
const mainAppOrigin = isInWujie ? window.parent.location.origin : 'http://localhost:8081';

const mainAppConfig = {
  // 运行环境
  isInWujie,

  // 主应用基本信息
  mainAppBaseUrl: mainAppOrigin,
  mainAppApiBase: isInWujie ? `${mainAppOrigin}/api` : '/api',

  // 主应用页面地址
  mainAppLoginUrl: `${mainAppOrigin}/login`,
  mainAppLogoutUrl: `${mainAppOrigin}/logout`,
  mainAppHomeUrl: `${mainAppOrigin}/home`,

  // 事件通信配置
  events: {
    login: 'mainApp:login',
    logout: 'mainApp:logout',
    routeChange: 'mainApp:routeChange',
    dataUpdate: 'mainApp:dataUpdate',
    // 子应用发出的事件
    subAppLogin: 'subApp:login',
    subAppLogout: 'subApp:logout',
    subAppRouteChange: 'subApp:routeChange',
  },

  // 功能开关
  features: {
    enableExport: true,
    enableImport: true,
    // 其他功能开关...
  },
};

window.mainAppConfig = mainAppConfig;
export default mainAppConfig;
```

### 4. 保活模式下的路由恢复

为支持保活模式，项目提供了 `useKeepAliveRouter` Hook：

```typescript
export const useKeepAliveRouter = (appName: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!window.__POWERED_BY_WUJIE__) return;

    // 应用初始化时，向主应用发送当前路由
    window.$wujie?.bus.$emit(`${appName}-current-route`, location.pathname);

    // 监听主应用下发的路由变化事件
    const handleRouterChange = (path: string) => {
      console.log(`${appName} 收到路由变化:`, path);
      if (path && path !== location.pathname) {
        navigate(path);
      }
    };

    window.$wujie?.bus.$on(`${appName}-router-change`, handleRouterChange);

    // 清理监听器
    return () => {
      window.$wujie?.bus.$off(`${appName}-router-change`, handleRouterChange);
    };
  }, [appName, navigate, location]);
};
```

### 5. 微前端嵌入注意事项

1. **环境检测**：使用 `window.__POWERED_BY_WUJIE__` 检测是否运行在无界环境
2. **跨域设置**：必须在开发和生产环境配置跨域支持
3. **生命周期**：实现 `__WUJIE_MOUNT` 和 `__WUJIE_UNMOUNT` 生命周期函数
4. **全局变量**：使用 `window.` 前缀访问全局变量，避免直接引用
5. **样式隔离**：使用命名空间或 CSS Modules 隔离子应用样式
6. **路由适配**：根据运行环境动态切换布局，支持嵌入模式和独立运行模式
7. **通信协议**：遵循统一的事件命名规范，使用 `$wujie.bus` 进行通信
8. **配置获取**：使用 `window.$wujie?.props` 获取主应用传入的配置
