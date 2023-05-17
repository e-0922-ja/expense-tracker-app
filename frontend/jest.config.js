// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  verbose: true,
  testMatch: ['./src/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
}
