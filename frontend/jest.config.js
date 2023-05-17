// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  verbose: true,
  testMatch: ['**/tests/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
