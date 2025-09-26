// 统一使用全局主题上下文
import { useTheme as useGlobalTheme } from '@/theme/ThemeContext';

export const useTheme = () => {
  const context = useGlobalTheme();
  // 为了保持向后兼容性，只返回 theme 属性
  return context.theme;
};
