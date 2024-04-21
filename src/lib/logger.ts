import pino from 'pino'

const isServer = typeof window === 'undefined'

export const logger = pino({
  enabled: isServer,
  level: process.env.LOG_LEVEL ?? 'info',
  // prettyPrint: isServer && {
  //   colorize: true,
  //   levelFirst: true,
  //   translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  // },
})
