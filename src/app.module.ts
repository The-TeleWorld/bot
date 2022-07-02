import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sessionMiddleware } from './middleware/session.middleware';
import { CreatorModule } from './creator/creator.module';
import { i18n } from './middleware/i18n.middleware';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'Subscribe Creator',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware, i18n.middleware()],
        include: [CreatorModule],
      }),
    }),
    CreatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
