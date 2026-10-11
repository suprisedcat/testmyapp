module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|expo-status-bar)/)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  moduleNameMapper: {
    '^expo-status-bar$': '<rootDir>/node_modules/expo-status-bar',
  },
  collectCoverageFrom: [
    'screens/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    '!**/*.test.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};
