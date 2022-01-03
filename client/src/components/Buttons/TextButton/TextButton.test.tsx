import 'react-native';
import {
  Image,
  StyleProp,
  Text,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

// styles
import {COLORS} from '../../../theme';
import {FONTS} from '../../Header/Header.style';

// icons
import {ICONS} from '../../../utils/constants';

// components
import TextButton from './TextButton';

describe('TextButton component', () => {
  it('should render correctly with given text', () => {
    const instance: RenderAPI = render(
      <TextButton variant="primary">My Text</TextButton>,
    );

    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance.props.children).toEqual('My Text');
  });

  it('should render correctly with primary color', () => {
    const instance: RenderAPI = render(
      <TextButton variant="primary">My Text</TextButton>,
    );

    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    expect(buttonInstance).toHaveStyle({backgroundColor: COLORS.primary});
  });

  it('should render correctly with white shade color', () => {
    const instance: RenderAPI = render(
      <TextButton variant="secondary">My Text</TextButton>,
    );
    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    expect(buttonInstance).toHaveStyle({backgroundColor: COLORS.whiteShade});
  });

  it('underlayColor should be a shade of the backgroundColor', () => {
    const instance: RenderAPI = render(
      <TextButton variant="secondary">My Text</TextButton>,
    );
    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    expect(buttonInstance.props.underlayColor).toEqual(
      buttonInstance.props.style.backgroundColor + 'cf',
    );
  });

  it('should have the custom style given in the props', () => {
    const customStyle: StyleProp<ViewStyle> = {
      backgroundColor: 'black',
      margin: 20,
    };

    const instance: RenderAPI = render(
      <TextButton variant="primary" style={customStyle}>
        My Text
      </TextButton>,
    );
    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    expect(buttonInstance).toHaveStyle({...customStyle});
  });

  it('should have the testID given in the props', () => {
    const customStyle: StyleProp<ViewStyle> = {
      backgroundColor: 'black',
      margin: 20,
    };

    const instance: RenderAPI = render(
      <TextButton variant="primary" testID="testId" style={customStyle}>
        My Text
      </TextButton>,
    );
    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    expect(buttonInstance).toHaveProp('testID', 'testId');
  });

  it('should change the style of the text based on the text style props passed', () => {
    const instance: RenderAPI = render(
      <TextButton
        variant="primary"
        fontColor="darkShade"
        fontSize={10}
        fontWeight="regular">
        My Text
      </TextButton>,
    );

    const textInstance: ReactTestInstance = instance.UNSAFE_getByType(Text);

    expect(textInstance).toHaveStyle({
      fontSize: 10,
      color: COLORS.darkShade,
      fontFamily: FONTS.regular,
    });
  });

  it('should render an image when passing icon prop', () => {
    const instance: RenderAPI = render(
      <TextButton variant="primary" icon={ICONS.googleLogo}>
        My Text
      </TextButton>,
    );

    const imageInstance: ReactTestInstance = instance.UNSAFE_getByType(Image);

    expect(imageInstance).toBeTruthy();
  });

  it('should render an image in left when passing iconPlacement prop left', () => {
    const instance: RenderAPI = render(
      <TextButton
        variant="primary"
        icon={ICONS.googleLogo}
        iconPlacement="left">
        My Text
      </TextButton>,
    );

    const imageInstance: ReactTestInstance = instance.UNSAFE_getByType(Image);

    expect(imageInstance).toHaveStyle({
      position: 'absolute',
    });
  });

  it('should run the onPress function when clicked', () => {
    const mockFunction = jest.fn();

    const instance: RenderAPI = render(
      <TextButton variant="primary" onPress={mockFunction}>
        My Text
      </TextButton>,
    );
    const buttonInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TouchableHighlight);

    fireEvent(buttonInstance, 'onPress', mockFunction);

    expect(mockFunction).toBeCalledTimes(1);
  });
});
