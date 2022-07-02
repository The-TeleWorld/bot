import { Module } from '@nestjs/common';

import { CreatorUpdate } from './creator.update';
import { CreateScene } from './scenes/create.scene';
import { RegisterWizard } from './scenes/register.scene';

@Module({
  providers: [CreatorUpdate, CreateScene, RegisterWizard],
})
export class CreatorModule {}
