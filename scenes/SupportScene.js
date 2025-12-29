import { Scenes, Markup } from 'telegraf'

export default class SupportScene {
  constructor() {
    this.scene = new Scenes.BaseScene('SUPPORT')
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
      'Не волнуйся мы поможем!\n\nОпиши проблему как можно подробнее',
      Markup.inlineKeyboard([Markup.button.callback('Вернутся в меню', 'leave')])
    )
  }

  async onText(ctx) {
    await ctx.reply(
      'Отлично заявка принята ✅\n\nПожалуйста дождись ответа 😉',
      Markup.inlineKeyboard([Markup.button.callback('Вернутся в меню', 'leave')])
    )
  }
  getScene() {
    return this.scene
  }
}
