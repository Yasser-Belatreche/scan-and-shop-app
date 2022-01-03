import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {ActionButtons} from './ActionButtons';

describe('Scan screen, ActionButtons Component', () => {
  it('should render correctly with the right UI', () => {
    const instance = render(<ActionButtons />);

    const takePicButton = instance.getByTestId('takePicButton');
    const flipCameraButton = instance.getByTestId('flipCameraButton');
    const allPicsButton = instance.getByTestId('allPicsButton');

    expect(takePicButton).toBeDefined();
    expect(flipCameraButton).toBeDefined();
    expect(allPicsButton).toBeDefined();
  });
});
