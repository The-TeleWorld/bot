import { Ctx, Message, On, Sender, Start, Update } from 'nestjs-telegraf';
import { REGISTER_SCENE_ID, USER_SCENE_ID } from 'src/app.constants';
import { Markup } from 'telegraf';
import { BotContext } from '../interfaces/context.interface';

@Update()
export class CreatorUpdate {
  @Start()
  async onStart(
    @Sender('first_name') firstName: string,
    @Ctx() ctx: BotContext,
  ): Promise<void> {
    const payload = (ctx as any).startPayload || '';

    if (payload) {
      ctx.session.author = payload;
    }

    const responseText = payload
      ? 'creator.start.welcomeText'
      : 'subscriber.welcomeText';

    await ctx.replyWithHTML(
      ctx.i18n.t(responseText, {
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
      const scene = ctx.session.author ? USER_SCENE_ID : REGISTER_SCENE_ID;
      await ctx.scene.enter(scene);
    }

    if (text === ctx.i18n.t('buttons.back')) {
      const keyboard = [
        ctx.i18n.t('buttons.lang'),
        ctx.i18n.t('buttons.balance'),
      ];

      if (!ctx.session.author) {
        keyboard.push(ctx.i18n.t('buttons.publish'));
      }
      ctx.reply(
        ctx.i18n.t('menu'),
        Markup.keyboard(keyboard).oneTime().resize(),
      );
      return;
    }
  }
}
