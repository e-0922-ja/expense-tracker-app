// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  // setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  verbose: true,
  testMatch: ['**/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
}
