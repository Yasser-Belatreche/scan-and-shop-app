import {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-clone-referenced-element|react-navigation|react-native-linear-gradient|react-native-simple-toast|rn-progress-loader|@react-native-google-signin|react-native-image-picker|react-native-camera)/)',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
export default config;
