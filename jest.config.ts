import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.mts', '.json'],
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  testRegex: '__tests__/.*.test.ts$',
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '\\.test\\.m?ts$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to process
  moduleNameMapper: {
    // Mock static file imports (images, styles, etc.)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{ts,tsx}',
  //   '!src/**/*.d.ts',
  // ],
  // coverageDirectory: '<rootDir>/coverage',
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],
}

export default config
