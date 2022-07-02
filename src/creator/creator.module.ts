import { Module } from '@nestjs/common';
import { SubscriptionModule } from 'src/subscription/subscription.module';

import { CreatorUpdate } from './creator.update';
import { CreateScene } from './scenes/create.scene';
import { RegisterWizard } from './scenes/register.scene';

@Module({
  providers: [CreatorUpdate, CreateScene, RegisterWizard],
  imports: [SubscriptionModule],
})
export class CreatorModule {}
