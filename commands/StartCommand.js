export default class StartCommand {
  constructor(bot) {
    this.bot = bot;
  }
  handle() {
    this.bot.start(async ctx => {
      console.log(ctx.session)
      ctx.scene.enter("HOME")
    })
  }
}
