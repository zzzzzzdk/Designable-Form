import { useEffect } from 'react';
import { mainAppEventListener, isRunningInWujie } from '../utils/eventBus';

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
    if (!isRunningInWujie()) {
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

/**
 * 简化的路由监听Hook
 */
export const useMainAppRouter = (onRouterChange: (path: string) => void) => {
  useEffect(() => {
    // 检查是否在无界微前端环境中运行
    if (!isRunningInWujie()) {
      console.log('非微前端环境，useMainAppRouter Hook不注册事件监听');
      return;
    }
    const cleanup = mainAppEventListener.onRouterChange(onRouterChange);
    return cleanup;
  }, [onRouterChange]);
};

/**
 * 简化的用户信息监听Hook
 */
export const useMainAppUserInfo = (onUserInfoUpdate: (userInfo: any) => void) => {
  useEffect(() => {
    // 检查是否在无界微前端环境中运行
    if (!isRunningInWujie()) {
      console.log('非微前端环境，useMainAppUserInfo Hook不注册事件监听');
      return;
    }
    const cleanup = mainAppEventListener.onUserInfoUpdate(onUserInfoUpdate);
    return cleanup;
  }, [onUserInfoUpdate]);
};

/**
 * 简化的权限监听Hook
 */
export const useMainAppPermissions = (onPermissionUpdate: (permissions: string[]) => void) => {
  useEffect(() => {
    // 检查是否在无界微前端环境中运行
    if (!isRunningInWujie()) {
      console.log('非微前端环境，useMainAppPermissions Hook不注册事件监听');
      return;
    }
    const cleanup = mainAppEventListener.onPermissionUpdate(onPermissionUpdate);
    return cleanup;
  }, [onPermissionUpdate]);
};

/**
 * 监听并处理主应用事件的工具函数示例
 */
export const handleMainAppEvents = {
  // 处理主应用路由变化
  navigateToPath: (path: string) => {
    console.log(`处理路由跳转: ${path}`);
    // 这里可以根据项目的路由库进行实际跳转
    // 例如: history.push(path)
    // 或者: window.location.href = path
  },

  // 处理主应用数据更新
  updateApplicationData: (data: any) => {
    console.log('更新应用数据:', data);
    // 这里可以更新全局状态或Redux store
  },

  // 处理用户信息更新
  updateUserInfo: (userInfo: any) => {
    console.log('更新用户信息:', userInfo);
    // 这里可以更新用户信息状态
  },

  // 处理权限更新
  updatePermissions: (permissions: string[]) => {
    console.log('更新权限列表:', permissions);
    // 这里可以更新权限状态
  }
};