/**
 * 12-factor environment configuration.
 * All process.env access happens here so the rest of the app stays pure.
 */

export type NodeEnv = 'development' | 'production' | 'test';

export interface Env {
  nodeEnv: NodeEnv;
  port: number;
  host: string;
  logLevel: string;
  corsOrigin: string;
  mongoUri: string;
}

function parsePort(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNodeEnv(value: string | undefined): NodeEnv {
  if (value === 'production' || value === 'test') {
    return value;
  }
  return 'development';
}

export const env: Env = {
  nodeEnv: parseNodeEnv(process.env.NODE_ENV),
  port: parsePort(process.env.PORT, 3001),
  host: process.env.HOST ?? '0.0.0.0',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/field-guide',
};
