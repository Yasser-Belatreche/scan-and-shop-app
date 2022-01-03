import 'react-native';
import React from 'react';
import {fireEvent, render, RenderAPI, act} from '@testing-library/react-native';

import Input from './Input';
import {Image, TextInput} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {ICONS} from '../../utils/constants';

describe('Input Component', () => {
  it('should renders correctly', () => {
    const mockFunction = jest.fn();
    const instance: RenderAPI = render(
      <Input
        label="test"
        name="test"
        setInputValues={mockFunction}
        placeholder="test"
        type="email-address"
      />,
    );

    const inputInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TextInput);

    expect(inputInstance).toBeTruthy();
  });

  it('should be customizable when passing customization props', () => {
    const mockFunction = jest.fn();
    const instance: RenderAPI = render(
      <Input
        label="test"
        name="password"
        setInputValues={mockFunction}
        placeholder="test"
        maxLength={3}
        align="center"
        focused={true}
        inputStyle={{fontSize: 20, textAlign: 'auto', flexDirection: 'column'}}
        containerStyle={{
          width: 100,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
      />,
    );

    const containerInstance: ReactTestInstance =
      instance.getByTestId('container');
    const inputInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TextInput);

    expect(inputInstance).toHaveProp('textAlign', 'center');
    expect(inputInstance).toHaveProp('maxLength', 3);
    expect(inputInstance).toHaveStyle({
      fontSize: 20,
      textAlign: 'auto',
      flexDirection: 'column',
    });
    expect(containerInstance).toHaveStyle({
      width: 100,
      flexDirection: 'column',
      backgroundColor: 'white',
    });
  });

  it('should call the setInputValues Callback when testChange', () => {
    const mockFunction = jest.fn();
    const instance: RenderAPI = render(
      <Input
        label="test"
        name="test"
        setInputValues={mockFunction}
        placeholder="test"
        type="email-address"
      />,
    );

    const inputInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TextInput);

    fireEvent(inputInstance, 'onChangeText', 'hd');

    expect(mockFunction).toBeCalledTimes(1);

    fireEvent(inputInstance, 'onChangeText', 'hd2');
    fireEvent(inputInstance, 'onChangeText', 'hd21');

    expect(mockFunction).toBeCalledTimes(3);
  });

  it('should render the password input when "passing" password in name prop', () => {
    const mockFunction = jest.fn();
    const instance: RenderAPI = render(
      <Input
        label="test"
        name="password"
        setInputValues={mockFunction}
        placeholder="test"
      />,
    );

    const inputInstance: ReactTestInstance =
      instance.UNSAFE_getByType(TextInput);
    const iconInstance: ReactTestInstance = instance.UNSAFE_getByType(Image);

    expect(inputInstance.props.secureTextEntry).toEqual(true);
    expect(iconInstance.props.source).toEqual(ICONS.hidePassword);

    act(() => {
      fireEvent(iconInstance.parent as ReactTestInstance, 'onTouchStart');
    });

    expect(inputInstance.props.secureTextEntry).toEqual(false);
    expect(iconInstance.props.source).toEqual(ICONS.showPassword);
  });

  it('should render the error when passing error props', () => {
    const mockFunction = jest.fn();
    const instance: RenderAPI = render(
      <Input
        label="test"
        name="password"
        setInputValues={mockFunction}
        placeholder="test"
        error="my error"
      />,
    );

    const errorTextInstance: ReactTestInstance = instance.getByText('my error');

    expect(errorTextInstance).toBeTruthy();
  });
});
