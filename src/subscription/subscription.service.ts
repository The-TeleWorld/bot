import { Injectable } from '@nestjs/common';
import { Subscription } from './subscription.entity';

export class CreateSubscriptionDto {
  creator_id: number;
  subscriber_id: number;
  creator_public_key: string;
  creator_private_key: string;
  channel_name: string;
  subscriber_public_key: string;
  subscriber_private_key: string;
  state: string;
}

class UpdateSubscriptionDto extends CreateSubscriptionDto {
  id: number;
}

@Injectable()
export class SubscriptionService {
  async create(subscriptionDto: CreateSubscriptionDto) {
    const subscription = await Subscription.create({ ...subscriptionDto });

    await subscription.save();

    return subscription;
  }

  async update(subscriptionDto: UpdateSubscriptionDto) {
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
