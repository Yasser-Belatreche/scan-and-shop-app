import 'react-native';
import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {render, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import styles, {FONTS} from './Header.style';
import Header from './Header';
import {COLORS} from '../../theme';

describe('Header component', () => {
  const defaultStyles: StyleProp<TextStyle> = {
    ...styles.h6,
    color: '#000',
  };

  it('should render correctly with default styles (without any props)', () => {
    const instance: RenderAPI = render(<Header>Hello</Header>);
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle(defaultStyles);
  });

  it('should be capitalize when passing capitalize in the props', () => {
    const instance: RenderAPI = render(<Header capitalize>hello</Header>);
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({textTransform: 'capitalize'});
  });

  it('should be uppercase when passing uppercase in the props', () => {
    const instance: RenderAPI = render(<Header uppercase>hello</Header>);
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({textTransform: 'uppercase'});
  });

  it('should change the style when passing a variant prop', () => {
    const instance: RenderAPI = render(<Header variant="h2">hello</Header>);
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({...styles.h2});
  });

  it('should change the color when passing a color prop', () => {
    const instance: RenderAPI = render(
      <Header color="greenDeep">hello</Header>,
    );
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({color: COLORS['greenDeep']});
  });

  it('should change the fontFamily when passing a fontWeight props', () => {
    const instance: RenderAPI = render(
      <Header fontWeight="bold">hello</Header>,
    );
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({fontFamily: FONTS.bold});
  });

  it('should have the style that we pass in the props', () => {
    const customStyle: StyleProp<TextStyle> = {
      textAlign: 'center',
    };
    const instance: RenderAPI = render(
      <Header style={customStyle}>hello</Header>,
    );
    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({...customStyle});
  });
});
