import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { Subscription } from './subscription.entity';

export class CreateSubscriptionDto {
  creator_id: number;
  subscriber_id?: number;
  creator_public_key: string;
  creator_private_key: string;
  channel_name: string;
  creator_wallet_address: string;
  subscriber_wallet_address: string;
  subscriber_public_key?: string;
  subscriber_private_key?: string;
  state?: string;
}

class UpdateSubscriptionDto extends CreateSubscriptionDto {
  id: number;
}

@Injectable()
export class SubscriptionService {
  async findOneBy(where: FindOptionsWhere<Subscription>) {
    const result = await Subscription.findOneBy(where);

    if (!result) {
      return null;
    }

    if (result.state) {
      result.state = JSON.parse(result.state);
    }

    return result;
  }

  async create(subscriptionDto: CreateSubscriptionDto) {
    if (subscriptionDto.state) {
      subscriptionDto.state = JSON.stringify(subscriptionDto.state);
    }

    const subscription = await Subscription.create({ ...subscriptionDto });

    await subscription.save();

    return subscription;
  }

  async update(subscriptionDto: UpdateSubscriptionDto) {
    if (subscriptionDto.state) {
      subscriptionDto.state = JSON.stringify(subscriptionDto.state);
    }

    const { id, ...restKeys } = subscriptionDto;

    const subscription = await Subscription.findOneBy({ id });

    for (const key in restKeys) {
      if (key in subscription) {
        subscription[key] = subscriptionDto[key];
      }
    }

    subscription.save();

    return subscription;
  }
}
