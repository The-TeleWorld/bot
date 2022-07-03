import { Module } from '@nestjs/common';
import { SubscriptionModule } from 'src/subscription/subscription.module';

import { CreatorUpdate } from './creator.update';
import { RegisterWizard } from './scenes/register.scene';
import { UserWizard } from './scenes/user.scene';

@Module({
  providers: [CreatorUpdate, RegisterWizard, UserWizard],
  imports: [SubscriptionModule],
})
export class CreatorModule {}
