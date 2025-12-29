import { Scenes, Markup } from 'telegraf'

export default class HomeScene {
  constructor() {
    this.scene = new Scenes.BaseScene('HOME')
    this.scene.enter(this.onEnter.bind(this))
    this.scene.action('support', async ctx => {
      ctx.scene.leave()
      ctx.scene.enter('SUPPORT')
    })
    this.scene.action('buy_product', async ctx => {
      ctx.scene.leave()
      ctx.scene.enter('BUY_VIDEO')
    })
  }
  async onEnter(ctx) {
    await ctx.reply(
      `${ctx.session.isNotFirst ? 'Ты в меню 🛖' : 'Привет👋'}. Выбери действия ниже дабы продолжить`,
      Markup.inlineKeyboard(
        [
          Markup.button.callback('🛒 Купить товар', 'buy_product'),
          Markup.button.callback('🎬 Купить рекламу', 'buy_ad'),
          Markup.button.callback('🆘 Написать в поддержку', 'support'),
        ],
        { columns: 2 }
      )
    )
  }
  getScene() {
    return this.scene
  }
}
