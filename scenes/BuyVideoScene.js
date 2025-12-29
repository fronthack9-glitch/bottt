import { Scenes, Markup } from 'telegraf'

export default class BuyVideoScene {
  constructor() {
    this.scene = new Scenes.BaseScene('BUY_VIDEO')
    this.scene.enter(this.onEnter.bind(this))
    this.scene.on('text', this.onText.bind(this))
    this.scene.action('leave', async ctx => {
      ctx.scene.leave()
      ctx.answerCbQuery()
      ctx.session.isNotFirst = true
      ctx.scene.enter('HOME')
    })
  }
  async onEnter(ctx) {
    await ctx.editMessageText(
      'Хорошо введи ID видео которое хочешь проибрести\n\nP.S. Его можно найти на посте',
      Markup.inlineKeyboard([Markup.button.callback('Вернутся в меню', 'leave')])
    )
  }
  async onText(ctx) {
    await ctx.replyWithInvoice({
      title: 'Видео с двумя мальчиками',
      description: `Товар под ID ${ctx.message.text.trim()}`,
      payload: `premium_video_${ctx.message.text.trim()}`,
      photo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pornhub-logo.svg/1200px-Pornhub-logo.svg.png',
      photo_width: 512,
      photo_height: 512,
      currency: 'XTR',
      prices: [{ label: 'Цена', amount: 15 }],
    });
    ctx.scene.leave();
  }
  getScene() {
    return this.scene
  }
}
