import App from './App';
import PreviewWidgetPage from '@/pages/PreviewWidgetPage';
import { createHashRouter, RouteObject } from 'react-router-dom';

/**
 * 应用路由配置
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/preview/:id?',
    element: <PreviewWidgetPage />,
  },
];

/**
 * 创建路由实例
 */
export const router = createHashRouter(routes, {
  basename: '/',
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
});