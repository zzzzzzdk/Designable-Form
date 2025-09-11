import { createLocales } from '@/packages/designable-core';
import { Input } from './Input';

export const Password = createLocales(Input, {
  'zh-CN': {
    title: '密码输入',
    settings: {
      'x-component-props': {
        variant: '变体',
      },
    },
  },
  'en-US': {
    title: 'Password',
    settings: {
      'x-component-props': {
        variant: 'Variant',
      },
    },
  },
  'ko-KR': {
    title: '비밀번호',
    settings: {
      'x-component-props': {
        variant: 'Variant',
      },
    },
  },
});
