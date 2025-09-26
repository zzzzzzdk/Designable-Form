import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

// 保活模式下的路由恢复Hook
export const useKeepAliveRouter = (appName: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!window.__POWERED_BY_WUJIE__) return;

    // 获取当前路径
    const currentPath = location.pathname;
    
    // 应用初始化时，向主应用发送当前路由
    window.$wujie?.bus.$emit(`${appName}-current-route`, currentPath);

    // 监听主应用下发的路由变化事件
    const handleRouterChange = (path: string) => {
      console.log(`${appName} 收到路由变化:`, path);
      if (path && path !== currentPath) {
        // 使用React Router的navigate函数进行路由跳转
        navigate(path);
      }
    };

    window.$wujie?.bus.$on(`${appName}-router-change`, handleRouterChange);

    // 清理监听器
    return () => {
      window.$wujie?.bus.$off(`${appName}-router-change`, handleRouterChange);
    };
  }, [appName, location.pathname, navigate]);
};