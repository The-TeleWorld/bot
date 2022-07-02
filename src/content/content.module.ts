import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
