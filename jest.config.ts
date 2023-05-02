import 'jest';
import { join } from 'path';

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '@utils/cache': '<rootDir>/src/utils/cache.ts',
    '@utils/object': '<rootDir>/src/utils/object.ts',
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
  moduleDirectories: ['node_modules'],
};

export default config;
