/* eslint-disable @typescript-eslint/no-empty-interface */
import { I18nContext } from '@grammyjs/i18n';
import { Context, Scenes } from 'telegraf';

interface MySceneSession extends Scenes.SceneSessionData {}

interface MySession extends Scenes.SceneSession<MySceneSession> {}

export interface BotContext extends Context {
  readonly i18n: I18nContext;
  session: MySession;
  scene: Scenes.SceneContextScene<BotContext>;
}
