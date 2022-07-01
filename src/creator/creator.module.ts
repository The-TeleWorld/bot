import { Module } from '@nestjs/common';

import { CreatorUpdate } from './creator.update';
import { CreateScene } from './scenes/create.scene';

@Module({
  providers: [CreatorUpdate, CreateScene],
})
export class CreatorModule {}
