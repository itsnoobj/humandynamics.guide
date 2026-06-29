import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { env } from './shared/config/env.js';
import { fastifyLoggerOptions } from './shared/plugins/logger.js';

/**
 * Build and configure the Fastify application.
 * Kept free of side effects so it can be imported in tests.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: fastifyLoggerOptions });

  await app.register(cors, { origin: env.corsOrigin });

  app.get('/health', async () => ({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }));

  return app;
}
