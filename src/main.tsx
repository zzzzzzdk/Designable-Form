import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx"
import { App as AntApp } from 'antd'
import { ThemeProvider } from './theme/ThemeContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AntApp>
        <App />
      </AntApp>
    </ThemeProvider>
  </StrictMode>,
)
