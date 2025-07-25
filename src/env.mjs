import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_HOST_URL: z.url(),
  },
  runtimeEnv: {
    LOG_LEVEL: process.env.LOG_LEVEL,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NODE_ENV: process.env.NODE_ENV,
    PRIVATE_EXAMPLE_API_KEY: process.env.PRIVATE_EXAMPLE_API_KEY,
    SONAR_TOKEN: process.env.SONAR_TOKEN,
  },
  server: {
    LOG_LEVEL: z.string().optional(),
    NODE_ENV: z.string().optional(),
    PRIVATE_EXAMPLE_API_KEY: z.string(),
    SONAR_TOKEN: z.string().optional(),
  },
});
