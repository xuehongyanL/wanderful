import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import zh_Hans from './locale/zh-Hans';
import en from './locale/en';

const resources = {
  'en': {
    translation: en
  },
  'zh-Hans': {
    translation: zh_Hans
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {escapeValue: false}
  });

export default i18n;