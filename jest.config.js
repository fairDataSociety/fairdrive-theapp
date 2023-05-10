module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '@utils/cache': '<rootDir>/src/utils/cache',
    '@utils/object': '<rootDir>/src/utils/object',
  },
};
