import React from 'react';
import {RNCamera} from 'react-native-camera';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const CameraView: React.FC<Props> = () => {
  const store = useScanScreenContext();

  return (
    <RNCamera
      style={{width: '100%', height: '100%'}}
      captureAudio={false}
      type={store?.cameraType}
      flashMode="auto"
      ref={store?.cameraRef}
      testID="camera"
    />
  );
};

export {CameraView};
