import { I18n } from '@grammyjs/i18n';
import * as path from 'path';

const localesDir = path.resolve('src/locales');

export const i18n = new I18n({
  directory: localesDir,
  defaultLanguage: 'en',
  sessionName: 'session',
  useSession: true,
});
