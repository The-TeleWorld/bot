import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './middleware/session.middleware';
import { CreatorModule } from './creator/creator.module';
import { i18n } from './middleware/i18n.middleware';
import { SubscriptionModule } from './subscription/subscription.module';
import { ContentModule } from './content/content.module';
import { RegisterWizard } from './creator/scenes/register.scene';
import { Content } from './content/content.entity';
import { Creator } from './creator/creator.entity';

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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tonworld.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CreatorModule,
    SubscriptionModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
