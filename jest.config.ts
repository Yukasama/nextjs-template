import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.mts', '.json'],
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  testRegex: '__tests__/.*.test.ts$',
  transform: {
    '\\.test\\.m?ts$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
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
