import { buildApp } from './app.js';
import { env } from './shared/config/env.js';
import { logger } from './shared/plugins/logger.js';

async function start(): Promise<void> {
  const app = await buildApp();

  try {
    await app.listen({ port: env.port, host: env.host });
    logger.info(`API listening on http://${env.host}:${env.port}`);
  } catch (err) {
    logger.error(err, 'Failed to start server');
    process.exit(1);
  }
}

void start();
