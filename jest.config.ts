import 'jest';
import { join } from 'path';

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@fairdatasociety/fdp-storage':
      '<rootDir>/node_modules/@fairdatasociety/fdp-storage/dist/index.browser.min',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  globalSetup: join(__dirname, 'test/config/setup.ts'),
  globalTeardown: join(__dirname, 'test/config/teardown.ts'),
  testTimeout: 60000,
  rootDir: '.',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'test'],
};

export default config;
