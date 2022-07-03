/* eslint-disable @typescript-eslint/no-empty-interface */
import { I18nContext } from '@grammyjs/i18n';
import { Context, Scenes } from 'telegraf';

interface MySceneSession extends Scenes.WizardSessionData {}

interface MySession extends Scenes.SceneSession<MySceneSession> {
  author?: string;
  creator_id: number;
  subscriber_id?: number;
  creator_public_key?: string;
  creator_private_key?: string;
  channel_name?: string;
  creator_wallet_address?: string;
  subscriber_wallet_address?: string;
  subscriber_public_key?: string;
  subscriber_private_key?: string;
  state?: string;
}

export interface BotContext extends Context {
  readonly i18n: I18nContext;
  session: MySession;
  scene: Scenes.SceneContextScene<BotContext, MySceneSession>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
