import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';
import { env } from '@/env.mjs';

const isProduction = env.NODE_ENV === 'production';
const defaultLogLevel = env.LOG_LEVEL ?? 'info';

let logFile = '';
if (!isProduction) {
  const logDir = path.resolve(process.cwd(), 'log');
  logFile = path.join(logDir, 'app.log');

  // oxlint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(logDir)) {
    // oxlint-disable-next-line security/detect-non-literal-fs-filename
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
