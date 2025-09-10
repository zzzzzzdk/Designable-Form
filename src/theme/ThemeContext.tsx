import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme, type ThemeConfig } from 'antd';

// 定义主题类型
export type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple';

// 定义所有主题配置
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

export const blueTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    colorInfo: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
    },
  },
};

export const greenTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#52c41a',
    colorInfo: '#13c2c2',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
  },
  components: {
    Button: {
      colorPrimary: '#52c41a',
    },
  },
};

export const purpleTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#722ed1',
    colorInfo: '#722ed1',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
  },
  components: {
    Button: {
      colorPrimary: '#722ed1',
    },
  },
};

// 主题映射
export const themeMap: Record<ThemeType, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
  green: greenTheme,
  purple: purpleTheme,
};

// 主题选项用于下拉选择
export const themeOptions = [
  { label: '浅色主题', value: 'light' },
  { label: '深色主题', value: 'dark' },
  { label: '蓝色主题', value: 'blue' },
  { label: '绿色主题', value: 'green' },
  { label: '紫色主题', value: 'purple' },
];

interface ThemeContextType {
  theme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    return savedTheme && themeMap[savedTheme] ? savedTheme : 'light';
  });

  const themeConfig = themeMap[theme];

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 在主题变化时更新 body 类名
  useEffect(() => {
    // 清除所有可能的主题类名
    document.body.classList.remove('light', 'dark', 'blue', 'green', 'purple');
    // 添加当前主题类名
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme: changeTheme }}>
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
