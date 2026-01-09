module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'], // This tells Jest to look in the 'tests' folder we will make later
  collectCoverage: true,
  collectCoverageFrom: [
    'utils/KleavenUtil.js', 
    'index.js'
  ],
  coverageDirectory: 'coverage/backend',
  coverageReporters: ['text', 'html'],
  
  // THIS IS THE "ADDITIONAL FEATURE" (Lab 8)
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};