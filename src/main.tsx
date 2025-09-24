import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';

import App from './App.tsx';
import { App as AntApp } from 'antd';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import './index.css';
dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ThemeProvider>
      <AntApp>
        <App />
      </AntApp>
    </ThemeProvider>,
  // </StrictMode>,
);
