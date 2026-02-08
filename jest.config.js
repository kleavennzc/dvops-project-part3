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
      branches: 10,
      functions: 10,  
      lines: 10,
      statements: 10,
    },
  },

  // FEATURE 2: Performance Gate (Latency Limit)
  
  testTimeout: 5000,
  verbose: true
};