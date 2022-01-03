import React from 'react';
import {Image, Pressable} from 'react-native';

// icons
import {ICONS} from '../../../../../../../../utils/constants';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const FlipCameraButton: React.FC<Props> = () => {
  const store = useScanScreenContext();

  const handlePress = () => {
    store?.setCameraType(prevValue => {
      if (prevValue === 'back') return 'front';
      else return 'back';
    });
  };

  return (
    <Pressable
      style={styles.flipCameraButtonContainer}
      testID="flipCameraButton"
      onPress={handlePress}>
      <Image
        source={ICONS.flipCamera}
        resizeMethod="resize"
        resizeMode="contain"
        style={{width: 25, height: 25}}
      />
    </Pressable>
  );
};

export {FlipCameraButton};
