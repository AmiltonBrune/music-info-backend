module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/coverage',
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '<rootDir>/src/presenters/',
    '<rootDir>/src/controllers/synonyms',
  ],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 100000,
}
