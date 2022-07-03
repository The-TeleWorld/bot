import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import TonWeb from 'tonweb';
import {
  CreateSubscriptionDto,
  SubscriptionService,
} from './../../subscription/subscription.service';
import { generateMnemonic, mnemonicToKeyPair } from 'tonweb-mnemonic';

import { Inject, Injectable } from '@nestjs/common';
import { USER_SCENE_ID } from '../../app.constants';
import { BotContext } from '../../interfaces/context.interface';
import { Markup } from 'telegraf';

const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const providerUrl = process.env.TONWEB_URL;
const apiKey = process.env.TONWEB_API;

if (!providerUrl) {
  throw new Error('TonWeb url is not set');
}
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));

@Injectable()
@Wizard(USER_SCENE_ID)
export class UserWizard {
  @Inject(SubscriptionService)
  private readonly subscriptionService: SubscriptionService;

  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    const mnemonic = await generateMnemonic();
    const keypair = await mnemonicToKeyPair(mnemonic);

    const wallet = tonweb.wallet.create({
      publicKey: keypair.publicKey,
    });

    const walletAddress = await wallet
      .getAddress()
      .then((el) => el.toString(true, true, true));

    ctx.session = {
      ...ctx.session,
      creator_id: Number(ctx.session.author),
      subscriber_public_key: new TextDecoder().decode(keypair.publicKey),
      subscriber_private_key: new TextDecoder().decode(keypair.secretKey),
      subscriber_id: ctx.message.from.id,
      subscriber_wallet_address: walletAddress,
    };

    await ctx.replyWithHTML(
      ctx.i18n.t('subscriber.activateSubText', {
        walletAddress: walletAddress,
      }),
      Markup.keyboard([ctx.i18n.t('buttons.sended')]).resize(),
    );
    ctx.wizard.next();
    return;
  }

  @WizardStep(2)
  async step2(@Message('text') text: string, @Context() ctx: BotContext) {
    if (text !== ctx.i18n.t('buttons.sended')) {
      await ctx.reply('Aborted');
      return ctx.scene.leave();
    }

    const balance = await tonweb.getBalance(
      ctx.session.subscriber_wallet_address,
    );

    if (new BN(balance).lt(toNano('2'))) {
      return ctx.i18n.t('creator.checkBalance.low', {
        balance: TonWeb.utils.fromNano(balance),
        min: '2',
      });
    } else {
      const { username } = ctx.botInfo;
      const { id } = ctx.message.from;
      const link = `https://t.me/${username}?start=${id}`;

      this.subscriptionService.create(ctx.session as CreateSubscriptionDto);
      await ctx.reply(
        ctx.i18n.t('subscriber.subText', {
          balance: TonWeb.utils.fromNano(balance),
        }),
        Markup.keyboard([ctx.i18n.t('buttons.back')]).resize(),
      );
      return ctx.scene.leave();
    }
  }
}
