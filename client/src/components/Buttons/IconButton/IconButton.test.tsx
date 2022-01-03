import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import IconButton from './IconButton';
import {ICONS} from '../../../utils/constants';
import {Image, TouchableHighlight} from 'react-native';
import {COLORS} from '../../../theme';

describe('IconButton component', () => {
  const mockPress = jest.fn();
  const mockTestId = 'testid';

  it('should render correctly with the default UI', () => {
    const instance = render(
      <IconButton icon={ICONS.cart} testID={mockTestId} onPress={mockPress} />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);
    const IconContainer = instance.UNSAFE_getByType(Image);

    expect(ButtonContainer).toHaveProp('testID', mockTestId);

    fireEvent(ButtonContainer, 'onPress');
    expect(mockPress).toBeCalledTimes(1);

    expect(IconContainer).toHaveProp('source', ICONS.cart);
  });

  it('should change the width and height when passing size prop', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        size={200}
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);

    expect(ButtonContainer).toHaveStyle({
      width: 200,
      height: 200,
      borderRadius: 100,
    });
  });

  it('should have the styles passing in the prop', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        style={{backgroundColor: COLORS.black, alignContent: 'center'}}
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);

    expect(ButtonContainer).toHaveStyle({
      backgroundColor: COLORS.black,
      alignContent: 'center',
    });
  });

  it('should have the background color when passing a backgroundColor prop and the uderlayColor should be a shade of the main bg', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        backgroundColor="darkShade"
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);

    expect(ButtonContainer).toHaveStyle({
      backgroundColor: COLORS.darkShade,
      borderWidth: 0,
    });
    expect(ButtonContainer).toHaveProp(
      'underlayColor',
      `${COLORS.darkShade}cf`,
    );
  });

  it('should be floaten on the right bottom screen when passing the floten prop', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        floten
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);
    const Icon = instance.UNSAFE_getByType(Image);

    expect(ButtonContainer).toHaveStyle({
      position: 'absolute',
      right: 20,
      bottom: 20,
      elevation: 10,
    });
    expect(Icon).toHaveStyle({width: '40%'});
  });

  it('should be floaten on the center bottom screen when passing the floten prop with the flotenPositioning prop set to "center"', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        floten
        flotenPositioning="center"
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);

    expect(ButtonContainer).toHaveStyle({
      position: 'absolute',
      bottom: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
    });
  });

  it('should be floaten on the left bottom screen when passing the floten prop with the flotenPositioning prop set to "center"', () => {
    const instance = render(
      <IconButton
        icon={ICONS.cart}
        testID={mockTestId}
        onPress={mockPress}
        floten
        flotenPositioning="left"
      />,
    );

    const ButtonContainer = instance.UNSAFE_getByType(TouchableHighlight);

    expect(ButtonContainer).toHaveStyle({
      position: 'absolute',
      left: 20,
      bottom: 20,
      elevation: 10,
    });
  });
});
