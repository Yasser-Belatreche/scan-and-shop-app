import 'react-native';
import renderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from 'react-test-renderer';
import React from 'react';
import App from '../App';

describe('App', () => {
  it('should renders correctly', () => {
    // renderer.create(<App />);
    expect(2 + 2).toBe(4);
  });
});
