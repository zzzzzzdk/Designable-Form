// 检查是否在无界微前端环境中运行
export const isRunningInWujie = (): boolean => {
  return typeof window !== 'undefined' && window.__POWERED_BY_WUJIE__ === true;
};

// 子应用事件总线
export const subAppEventBus = {
  // 通知主应用登录
  notifyLogin: (userData: any) => {
    if (isRunningInWujie()) {
      window.$wujie?.bus.$emit('subApp:login', userData);
    } else {
      console.log('独立运行模式: 登录事件', userData);
    }
  },

  // 通知主应用登出
  notifyLogout: () => {
    if (isRunningInWujie()) {
      window.$wujie?.bus.$emit('subApp:logout');
    } else {
      console.log('独立运行模式: 登出事件');
    }
  },

  // 通知主应用路由变化
  notifyRouteChange: (path: string, standaloneCallback?: (path: string) => void) => {
    if (isRunningInWujie()) {
      window.$wujie?.bus.$emit('subApp:routeChange', path);
    } else if (standaloneCallback) {
      // 在独立运行模式下执行回调
      standaloneCallback(path);
    }
  },

  // 通知主应用保存表单
  notifyFormSave: (formData: any, standaloneCallback?: (formData: any) => void) => {
    if (isRunningInWujie()) {
      window.$wujie?.bus.$emit('subApp:formSave', formData);
    } else if (standaloneCallback) {
      // 在独立运行模式下执行回调
      standaloneCallback(formData);
    } else {
      console.log('独立运行模式: 保存表单', formData);
    }
  },

  // 通知主应用发布表单
  notifyFormPublish: (formId: string, standaloneCallback?: (formId: string) => void) => {
    if (isRunningInWujie()) {
      window.$wujie?.bus.$emit('subApp:formPublish', formId);
    } else if (standaloneCallback) {
      // 在独立运行模式下执行回调
      standaloneCallback(formId);
    } else {
      console.log('独立运行模式: 发布表单', formId);
    }
  }
};

// 主应用事件监听器
export const mainAppEventListener = {
  // 监听主应用的路由变化事件
  onRouterChange: (callback: (path: string) => void) => {
    if (!isRunningInWujie()) {
      console.log('非微前端环境，跳过主应用路由事件监听');
      return () => {};
    }
    
    const handler = (path: string) => {
      console.log('主应用要求跳转到:', path);
      callback(path);
    };
    
    window.$wujie?.bus.$on('mainApp:routerChange', handler);
    
    // 返回清理函数
    return () => {
      window.$wujie?.bus.$off('mainApp:routerChange', handler);
    };
  },

  // 监听主应用的数据更新事件
  onDataUpdate: (callback: (data: any) => void) => {
    if (!isRunningInWujie()) {
      console.log('非微前端环境，跳过主应用数据更新事件监听');
      return () => {};
    }
    
    const handler = (data: any) => {
      console.log('主应用下发新数据:', data);
      callback(data);
    };
    
    window.$wujie?.bus.$on('mainApp:dataUpdate', handler);
    
    // 返回清理函数
    return () => {
      window.$wujie?.bus.$off('mainApp:dataUpdate', handler);
    };
  },

  // 监听主应用的用户信息更新事件
  onUserInfoUpdate: (callback: (userInfo: any) => void) => {
    if (!isRunningInWujie()) {
      console.log('非微前端环境，跳过主应用用户信息更新事件监听');
      return () => {};
    }
    
    const handler = (userInfo: any) => {
      console.log('主应用更新用户信息:', userInfo);
      callback(userInfo);
    };
    
    window.$wujie?.bus.$on('mainApp:userInfoUpdate', handler);
    
    // 返回清理函数
    return () => {
      window.$wujie?.bus.$off('mainApp:userInfoUpdate', handler);
    };
  },

  // 监听主应用的权限更新事件
  onPermissionUpdate: (callback: (permissions: string[]) => void) => {
    if (!isRunningInWujie()) {
      console.log('非微前端环境，跳过主应用权限更新事件监听');
      return () => {};
    }
    
    const handler = (permissions: string[]) => {
      console.log('主应用更新权限信息:', permissions);
      callback(permissions);
    };
    
    window.$wujie?.bus.$on('mainApp:permissionUpdate', handler);
    
    // 返回清理函数
    return () => {
      window.$wujie?.bus.$off('mainApp:permissionUpdate', handler);
    };
  },

  // 监听主应用的配置更新事件
  onConfigUpdate: (callback: (config: any) => void) => {
    if (!isRunningInWujie()) {
      console.log('非微前端环境，跳过主应用配置更新事件监听');
      return () => {};
    }
    
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
};

// TypeScript类型定义
export interface SubAppEventBusType {
  notifyLogin: (userData: any) => void;
  notifyLogout: () => void;
  notifyRouteChange: (path: string, standaloneCallback?: (path: string) => void) => void;
  notifyFormSave: (formData: any, standaloneCallback?: (formData: any) => void) => void;
  notifyFormPublish: (formId: string, standaloneCallback?: (formId: string) => void) => void;
}

export interface MainAppEventListenerType {
  onRouterChange: (callback: (path: string) => void) => () => void;
  onDataUpdate: (callback: (data: any) => void) => () => void;
  onUserInfoUpdate: (callback: (userInfo: any) => void) => () => void;
  onPermissionUpdate: (callback: (permissions: string[]) => void) => () => void;
  onConfigUpdate: (callback: (config: any) => void) => () => void;
}