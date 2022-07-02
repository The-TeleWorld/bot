import { Scene, SceneEnter, SceneLeave, Command } from 'nestjs-telegraf';
import { CREATE_SCENE_ID } from '../../app.constants';
import { BotContext } from '../../interfaces/context.interface';

@Scene(CREATE_SCENE_ID)
export class CreateScene {
  @SceneEnter()
  onSceneEnter(): string {
    return `Create a post: \n
    /title - add title \n
    /description - add description \n
    /media - add media link \n
    /sendpost - to send a new post \n
    /leave - to quit adding a new post`;
  }

  @SceneLeave()
  onSceneLeave(): string {
    console.log('Leave from scene');
    return 'Bye Bye 👋';
  }

  @Command('title')
  onTitleCommand(): string {
    return 'Add a post title';
  }

  @Command('description')
  onDescriptionCommand(): string {
    return 'Add a post description';
  }

  @Command('media')
  onMediaCommand(): string {
    return 'Add a post media';
  }

  @Command('sendpost')
  onSendPostCommand(): string {
    // logic with updating all of the customers
    return 'Sending a post...';
  }

  @Command('leave')
  async onLeaveCommand(ctx: BotContext): Promise<void> {
    await ctx.scene.leave();
  }
}
