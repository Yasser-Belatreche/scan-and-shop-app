import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';

// styles
import {styles} from '../../Scan.style';

// context
import {useScanScreenContext} from '../../__context__/context';

// components
import {CameraView} from './__components__/CameraView/CameraView';
import {ReturnButton} from './__components__/ReturnButton/ReturnButton';
import {ScanRectangle} from './__components__/ScanRectangle/ScanRectangle';
import {SelectedPic} from './__components__/SelectedPic/SelectedPic';

interface Props {}

const CameraContainer: React.FC<Props> = () => {
  const store = useScanScreenContext();

  return (
    <View style={styles.cameraContainer} testID="camera">
      {store?.selectedPic ? <SelectedPic /> : <CameraView />}

      <ReturnButton />
      <ScanRectangle />
    </View>
  );
};

export {CameraContainer};
