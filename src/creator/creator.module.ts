import { Module } from '@nestjs/common';

import { CreatorUpdate } from './creator.update';
import { RandomNumberScene } from './scenes/scene.scene';

@Module({
  providers: [RandomNumberScene, CreatorUpdate],
})
export class CreatorModule {}
