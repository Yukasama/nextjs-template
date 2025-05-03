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

export const logger: pino.Logger = isProduction
  ? pino(
      {
        base: { pid: false },
        level: defaultLogLevel,
      },
      fileStream,
    )
  : pino({
      base: { pid: false },
      level: defaultLogLevel,
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
