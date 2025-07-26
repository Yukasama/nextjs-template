import { env } from '@/env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const isProduction = env.NODE_ENV === 'production';
const defaultLogLevel = env.LOG_LEVEL ?? 'info';

let logFile = '';
if (!isProduction) {
  const logDir = path.resolve(process.cwd(), 'log');
  logFile = path.join(logDir, 'app.log');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

const baseOptions = {
  base: { pid: false },
  level: defaultLogLevel,
};

export const logger: pino.Logger = isProduction
  ? pino(baseOptions)
  : pino({
      ...baseOptions,
      transport: {
        targets: [
          {
            level: defaultLogLevel,
            options: { colorize: true },
            target: 'pino-pretty',
          },
          {
            level: defaultLogLevel,
            options: { destination: logFile, mkdir: true },
            target: 'pino/file',
          },
        ],
      },
    });
