import { Module } from '@nestjs/common';

import { CreatorUpdate } from './creator.update';
import { CreateScene } from './scenes/create.scene';
import { RandomNumberScene } from './scenes/scene.scene';

@Module({
  providers: [RandomNumberScene, CreatorUpdate, CreateScene],
})
export class CreatorModule {}
