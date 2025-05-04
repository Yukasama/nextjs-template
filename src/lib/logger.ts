import { env } from '@/env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const isProduction = env.NODE_ENV === 'production';
const defaultLogLevel = env.LOG_LEVEL ?? 'info';

const logDir = path.resolve(process.cwd(), 'log');
const logFile = path.join(logDir, 'app.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const fileStream = pino.destination({ dest: logFile, sync: false });

const baseOptions = {
  base: { pid: false },
  level: defaultLogLevel,
};

export const logger: pino.Logger = isProduction
  ? pino(baseOptions, fileStream)
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
