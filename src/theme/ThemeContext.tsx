import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme, type ThemeConfig } from 'antd';

// 定义主题类型
export type ThemeType = 'light' | 'dark';

// 定义主题配置
export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#3377FF',
    colorWarning: '#FF5B4D',
    colorInfo: '#FF8D1A',
    colorSuccess: '#33CC99',
  },
  components: {
    Menu: {
      colorItemBg: '#ffffff',
      colorItemBgHover: '#f5f5f5',
    },
  },
};

export const darkTheme: ThemeConfig = {
   algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#3377FF',
    colorWarning: '#FF5B4D',
    colorInfo: '#FF8D1A',
    colorSuccess: '#33CC99',
  },
  components: {
    Menu: {
      colorItemBg: '#141414',
      colorItemBgHover: '#262626',
    },
  },
  cssVar: true,
};

interface ThemeContextType {
  theme: ThemeType;
  themeConfig: ThemeConfig;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    return savedTheme || 'light';
  });

  const themeConfig = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // 在主题变化时更新 body 类名
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};