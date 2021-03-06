import {
  SubscriptionService,
  CreateSubscriptionDto,
} from './../../subscription/subscription.service';
import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import TonWeb from 'tonweb';
import { generateMnemonic, mnemonicToKeyPair } from 'tonweb-mnemonic';

import { REGISTER_SCENE_ID } from '../../app.constants';
import { BotContext } from '../../interfaces/context.interface';
import { Inject, Injectable } from '@nestjs/common';

const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const providerUrl = process.env.TONWEB_URL;
const apiKey = process.env.TONWEB_API;

if (!providerUrl) {
  throw new Error('TonWeb url is not set');
}
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));

@Injectable()
@Wizard(REGISTER_SCENE_ID)
export class RegisterWizard {
  @Inject(SubscriptionService)
  private readonly subscriptionService: SubscriptionService;

  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t('creator.start.channelNameText'));
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(@Context() ctx: BotContext) {
    const mnemonic = await generateMnemonic();
    const keypair = await mnemonicToKeyPair(mnemonic);

    const wallet = tonweb.wallet.create({
      publicKey: keypair.publicKey,
    });

    // @ts-ignore broken interface
    const { text: name } = ctx.message;
    if (!name) {
      return;
    }

    const walletAddress = await wallet
      .getAddress()
      .then((el) => el.toString(true, true, true));

    ctx.session = {
      ...ctx.session,
      creator_public_key: new TextDecoder().decode(keypair.publicKey),
      creator_private_key: new TextDecoder().decode(keypair.secretKey),
      creator_id: ctx.message.from.id,
      channel_name: name,
      creator_wallet_address: walletAddress,
    };

    await ctx.replyWithHTML(
      ctx.i18n.t('creator.start.genWalletText', {
        walletAddress: walletAddress,
        botName: process.env.BOT_NAME,
      }),
      Markup.keyboard([ctx.i18n.t('buttons.sended')]).resize(),
    );

    ctx.wizard.next();
  }

  @WizardStep(3)
  async step3(@Message('text') text: string, @Context() ctx: BotContext) {
    if (text !== ctx.i18n.t('buttons.sended')) {
      await ctx.reply('Aborted');
      return ctx.scene.leave();
    }

    const balance = await tonweb.getBalance(ctx.session.creator_wallet_address);
    console.log(balance);
    if (new BN(balance).lt(toNano('0.5'))) {
      return ctx.i18n.t('creator.checkBalance.low', {
        balance: TonWeb.utils.fromNano(balance),
        min: '0.5',
      });
    } else {
      const { username } = ctx.botInfo;
      const { id } = ctx.message.from;
      const link = `https://t.me/${username}?start=${id}`;

      this.subscriptionService.create(ctx.session as CreateSubscriptionDto);
      await ctx.reply(
        ctx.i18n.t('creator.start.refLinkText', { refLink: link }),
        Markup.keyboard([ctx.i18n.t('buttons.back')]).resize(),
      );
      return ctx.scene.leave();
    }
  }
}
