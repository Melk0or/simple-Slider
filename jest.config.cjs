module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.scss$': 'jest-css-modules-transform',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/__setup__/setup.ts',
    '@testing-library/jest-dom',
  ],
};
