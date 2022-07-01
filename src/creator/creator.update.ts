import { Command, Ctx, Start, Update, Sender } from 'nestjs-telegraf';
// import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { Context } from '../interfaces/context.interface';
import { CREATE_SCENE_ID } from '../app.constants';

@Update()
export class CreatorUpdate {
  @Start()
  onStart(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}! It's Subscribe Creator Bot.\n
    Type /help to see the list of commands.`;
  }

  @Command('/help')
  onHelp(): string {
    return `Help commands: \n
    /help - show this message.\n
    /create - create post.\n`;
  }

  @Command('/create')
  async onCreate(@Ctx() ctx: Context) {
    await ctx.scene.enter(CREATE_SCENE_ID);
  }

  // @Command('scene')
  // async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
  //   await ctx.scene.enter(HELLO_SCENE_ID);
  // }
}
