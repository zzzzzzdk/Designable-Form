// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { RouterProvider } from 'react-router-dom';
import { App as AntApp } from 'antd';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import { router } from './router';
import './index.css';
dayjs.locale('zh-cn');

const root = createRoot(document.getElementById('root')!);

// 判断是否运行在无界微前端环境中
if (window.__POWERED_BY_WUJIE__) {
  // 微前端环境下，挂载生命周期函数
  window.__WUJIE_MOUNT = () => {
    // 在无界环境中添加子应用标识类名
    document.body.classList.add('sub-app');
    document.body.classList.add('sub-app-' + window.__WUJIE_ID__);
    
    root.render(
      <ThemeProvider>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </ThemeProvider>
    );
  };
  
  window.__WUJIE_UNMOUNT = () => {
    root.unmount();
  };
  
  // 支持无界的保活模式
  window.__WUJIE_PRELOAD = () => {
    // 预加载处理逻辑
  };
} else {
  // 独立运行模式
  root.render(
    <ThemeProvider>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ThemeProvider>
  );
}
