import { Telegraf, Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import * as os from 'os';
import logger from './logger';
import { calculateUptime } from './time';

const gracefulShutdown = (teleBot: Telegraf<Context<Update>>) => {
  logger.info('Shutting down...');
  teleBot.stop('SIGTERM');
  logger.info('Bot stopped');
  process.exit(0);
};

const systemStats = () => {
  const { totalmem, freemem } = os;
  const totalMemory = totalmem();
  const freeMemory = freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = Math.round((usedMemory / totalMemory) * 100);

  const cpuCount = os.cpus().length;

  const memoryStats = `Memory Usage: ${memoryUsage}% (${Math.round(usedMemory / 1024 / 1024)}MB/${Math.round(
    totalMemory / 1024 / 1024,
  )}MB)`;

  return `
  Total Memory: ${Math.round(totalMemory / (1024 * 1024 * 1024))} GB
  Memory usage: ${memoryStats}%

  CPU Count: ${cpuCount}

  UpTime : ${calculateUptime()}
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { gracefulShutdown, systemStats };
