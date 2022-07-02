import { Ctx, Message, On, Sender, Start, Update } from 'nestjs-telegraf';
import { REGISTER_SCENE_ID } from 'src/app.constants';
import { Markup } from 'telegraf';
import { BotContext } from '../interfaces/context.interface';

@Update()
export class CreatorUpdate {
  @Start()
  async onStart(
    @Sender('first_name') firstName: string,
    @Ctx() ctx: BotContext,
  ): Promise<void> {
    console.log(ctx.message);
    await ctx.reply(
      ctx.i18n.t('creator.start.welcomeText', {
        firstName,
        botName: 'Nomadely.space',
      }),
      Markup.keyboard([ctx.i18n.t('buttons.register')])
        .oneTime()
        .resize(),
    );
    return;
  }

  @On('text')
  async onMessage(@Message('text') text: string, @Ctx() ctx: BotContext) {
    if (text === ctx.i18n.t('buttons.register')) {
      await ctx.scene.enter(REGISTER_SCENE_ID);
    }
  }
}
