import pino, { type Logger } from 'pino';
import { env } from '../config/env.js';

/**
 * Shared pino logger instance.
 * Pretty-prints in development, structured JSON elsewhere.
 */
export const logger: Logger = pino({
  level: env.logLevel,
  ...(env.nodeEnv === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:HH:MM:ss' },
        },
      }
    : {}),
});

/** Fastify logger options derived from the shared logger config. */
export const fastifyLoggerOptions = {
  level: env.logLevel,
};
