// Extend Jest matchers with Testing Library custom matchers
import '@testing-library/jest-native/extend-expect';

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));
