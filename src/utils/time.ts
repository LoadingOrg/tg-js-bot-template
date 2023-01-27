import logger from './logger';

const calculateUptime = () => {
  const uptime = process.uptime();
  logger.info(`Uptime: ${uptime}`);
  const days = Math.floor(uptime / (60 * 60 * 24));
  const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
};

// eslint-disable-next-line import/prefer-default-export
export { calculateUptime };
