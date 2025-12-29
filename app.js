import { session, Telegraf, Scenes } from 'telegraf'
import { ConfigService } from './service/ConfigService.js'
import StartCommand from './commands/StartCommand.js'
import HomeScene from './scenes/HomeScene.js'
import SupportScene from './scenes/SupportScene.js'
import BuyVideoScene from './scenes/BuyVideoScene.js'


class Bot {
  constructor(configService) {
    this.bot = new Telegraf(configService.get('TOKEN'))
    this.bot.use(session())
    const homeScene = new HomeScene()
    const supportScene = new SupportScene()
    const buyVideoScene = new BuyVideoScene()
    const stage = new Scenes.Stage([homeScene.getScene(), supportScene.getScene(), buyVideoScene.getScene()])

    this.bot.use(stage.middleware())
  }
  init() {
    this.bot.commands = [new StartCommand(this.bot)]
    this.bot.commands.forEach(command => {
      command.handle()
    })
    this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.init()
