import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {TextInput} from 'react-native';

import Inputs from './Inputs';

describe('EmailVerification screen, EmailVerification - Inputs component', () => {
  let getCurrentIndexMock: jest.Mock<any, any>;
  let setVerificationLettersMock: jest.Mock<any, any>;

  beforeEach(() => {
    getCurrentIndexMock = jest.fn();
    setVerificationLettersMock = jest.fn();
  });

  afterEach(() => {
    getCurrentIndexMock.mockRestore();
    setVerificationLettersMock.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(
      <Inputs
        getCurrentIndex={getCurrentIndexMock}
        setVerifcationLetters={setVerificationLettersMock}
      />,
    );

    const inputs = instance.UNSAFE_getAllByType(TextInput);

    expect(getCurrentIndexMock).toBeCalledTimes(1);
    expect(inputs.length).toEqual(4);
  });

  it('should call setVerificationLettersMock every time we change the text in the inputs', () => {
    const instance = render(
      <Inputs
        getCurrentIndex={getCurrentIndexMock}
        setVerifcationLetters={setVerificationLettersMock}
      />,
    );

    const inputs = instance.UNSAFE_getAllByType(TextInput);

    fireEvent(inputs[0], 'onChangeText', 7);

    expect(setVerificationLettersMock).toBeCalledTimes(1);

    fireEvent(inputs[1], 'onChangeText', 7);

    expect(setVerificationLettersMock).toBeCalledTimes(2);
  });
});
