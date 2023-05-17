// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  verbose: true,
  testMatch: ['<rootDir>/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
}
