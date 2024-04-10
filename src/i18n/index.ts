import { createI18n } from 'vue-i18n';

import { Locale } from '@/enums';

import zhCN from './locales/zh-cn';
import enUS from './locales/en-us';
import ruRU from './locales/ru-ru';

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ru-RU': ruRU
};

const locale = Locale.ZH_CN;

export default createI18n({
  legacy: false,
  locale,
  messages,
  fallbackLocale: Locale.EN_US
});
