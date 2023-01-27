import 'dotenv/config';
import { Telegraf } from 'telegraf';
import commands from './bot-utils/commands';
import logger from './utils/logger';
import { gracefulShutdown, systemStats } from './utils/process-utils';

const bot = new Telegraf(process.env.BOT_TOKEN);
const { GROUP_ID } = process.env;

// eslint-disable-next-line consistent-return
bot.use((ctx, next) => {
  if (!('text' in ctx.message)) return next();

  if (ctx.message.chat.type === 'private') {
    ctx.telegram.sendMessage(GROUP_ID, `${ctx.message.from.username}: ${ctx.message.text}`);
  }
  next();
});

bot.start((ctx) => {
  ctx.reply(`Hello ${ctx.from.first_name}. Welcome to the bot. \n\nType /help to get a list of commands.`);
});

bot.help((ctx) => {
  ctx.reply(
    `Here is a list of commands you can use:
  /${commands.STATS} - Get the system stats
  /${commands.HELP} - Get a list of commands
  /${commands.ECHO} - Echo a message
  `,
  );
});

bot.command(commands.ECHO, (ctx) => {
  const { text } = ctx.message;
  const message = text.substring(text.indexOf(' ') + 1);
  ctx.reply(message);
});

bot.command(commands.STATS, (ctx) => {
  ctx.reply(systemStats());
});

bot.command(commands.SHUTDOWN, (ctx) => {
  ctx.reply('Shutting down...');
  gracefulShutdown(bot);
  logger.info('Bot stopped');
});

function main() {
  bot.launch();
  logger.info('Bot started');
}

main();
