module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'utils/KleavenUtil.js', 
    'index.js'
  ],
  coverageDirectory: 'coverage/backend',
  coverageReporters: ['text', 'html'],
  
  // FEATURE 1: Backend Quality Gate (Code Coverage)
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },

  // FEATURE 2: Performance Gate (Latency Limit)
  // Fails any test that takes longer than 2000ms (2 seconds) to catch performance issues
  testTimeout: 2000,
  verbose: true
};