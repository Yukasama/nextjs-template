import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.mts', '.json'],
  verbose: true, // Display detailed information about each test
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Root directory for the tests
  testRegex: '__tests__\\.*\\\\.*test\\.m?ts',
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
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    // Specify directories for coverage
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Coverage report formats
}

export default config
