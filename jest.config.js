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
      branches: 30,
      functions: 30,  
      lines: 30,
      statements: 30,
    },
  },

  // FEATURE 2: Performance Gate (Latency Limit)
  
  testTimeout: 5000,
  verbose: true
};