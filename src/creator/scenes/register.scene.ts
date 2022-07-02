import { Context, Wizard, WizardStep } from 'nestjs-telegraf';
import TonWeb from 'tonweb';
import { generateMnemonic, mnemonicToKeyPair } from 'tonweb-mnemonic';

import { REGISTER_SCENE_ID } from '../../app.constants';
import { BotContext } from '../../interfaces/context.interface';

@Wizard(REGISTER_SCENE_ID)
export class RegisterWizard {
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t('creator.start.channelNameText'));
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(@Context() ctx: BotContext) {
    const providerUrl = process.env.TONWEB_URL;
    const apiKey = process.env.TONWEB_API;

    if (!providerUrl || !apiKey) {
      throw new Error('TonWeb url or api key is not set');
    }

    const mnemonic = await generateMnemonic();
    const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));
    const keypair = await mnemonicToKeyPair(mnemonic);

    const wallet = tonweb.wallet.create({
      publicKey: keypair.publicKey,
    });

    // @ts-ignore broken interface
    const { text: name } = ctx.message;
    if (!name) {
      return;
    }

    ctx.scene.state = {
      creator_public_key: keypair.publicKey,
      creator_private_key: keypair.secretKey,
      channel_name: name,
    };

    const walletAddress = await wallet.getAddress();
    ctx.wizard.next();
    return ctx.i18n.t('creator.start.genWalletText', {
      walletAddress: walletAddress.toString(true, true, true),
    });
  }
}
