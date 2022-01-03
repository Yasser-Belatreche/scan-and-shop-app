import React from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../../Scan.style';

// components
import {AllPicsButton} from './__components__/AllPicsButton/AllPicsButton';
import {FlipCameraButton} from './__components__/FlipCameraButton/FlipCameraButton';
import {TakePicButton} from './__components__/TakePicButton/TakePicButton';

interface Props {}

const ActionButtons: React.FC<Props> = () => {
  return (
    <View style={styles.actionButtons}>
      <AllPicsButton />
      <TakePicButton />
      <FlipCameraButton />
    </View>
  );
};

export {ActionButtons};
