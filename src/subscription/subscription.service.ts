import { Injectable } from '@nestjs/common';
import { Subscription } from './subscription.entity';

class CreateSubscriptionDto {
  creator_id: number;
  subscriber_id: number;
  creator_public_key: string;
  creator_private_key: string;
  subscriber_public_key: string;
  subscriber_private_key: string;
  state: string;
}

@Injectable()
export class SubscriptionService {
  async create(subscriptionDto: CreateSubscriptionDto) {
    const subscription = await Subscription.create({ ...subscriptionDto });

    await subscription.save();

    return subscription;
  }
}
