import React from 'react';
import {View, Image, Pressable} from 'react-native';

// utils
import {ICONS} from '../../../../../../../../utils/constants';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const SelectedPic: React.FC<Props> = () => {
  const store = useScanScreenContext();

  const handleClose = () => {
    store?.setSelectedPic(undefined);
    store?.setIsPicConfirmed(false);
  };

  return (
    <View testID="selectedImage">
      <Image
        source={{uri: store?.selectedPic?.uri}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />

      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Image
          source={ICONS.closeWhite}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
};

export {SelectedPic};
