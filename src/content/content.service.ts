import { Injectable } from '@nestjs/common';
import { Content } from './content.entity';

export class CreateContentDto {
  creator_id: number;
  creator_username: string;
  title: string;
  description: string;
  serializedContentMessage: string;
}

@Injectable()
export class ContentService {
  async create(contentDto: CreateContentDto) {
    const content = await Content.create({ ...contentDto });

    await content.save();

    return content;
  }
}
