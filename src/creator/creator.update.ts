import { Command, Ctx, Start, Update, Sender } from 'nestjs-telegraf';
// import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { BotContext } from '../interfaces/context.interface';
import { CREATE_SCENE_ID } from '../app.constants';

@Update()
export class CreatorUpdate {
  @Start()
  onStart(
    @Sender('first_name') firstName: string,
    @Ctx() ctx: BotContext,
  ): string {
    return ctx.i18n.t('creator.start', { firstName });
  }

  @Command('/help')
  onHelp(): string {
    return `Help commands: \n
    /help - show this message.\n
    /create - create post.\n`;
  }

  @Command('/create')
  async onCreate(@Ctx() ctx: BotContext) {
    await ctx.scene.enter(CREATE_SCENE_ID);
  }
}
