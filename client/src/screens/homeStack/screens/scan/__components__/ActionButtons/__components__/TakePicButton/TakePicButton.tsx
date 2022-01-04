import React from 'react';
import {View, Image, TouchableHighlight, ActivityIndicator} from 'react-native';

// theme
import {COLORS} from '../../../../../../../../theme';
import {ICONS} from '../../../../../../../../utils/constants';

// utils
import {handleError} from '../../../../../../../../utils/helpers/handleError/handleError';
import {APICalls} from '../../../../../../../../apis';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const TakePicButton: React.FC<Props> = () => {
  const store = useScanScreenContext();

  const handlePress = async () => {
    try {
      if (store?.isPicConfirmed) return;
      if (store?.selectedPic) return await handlePicConfirmationPress();

      await handleTakePicPress();
    } catch (error) {
      handleError(error);
    }
  };

  const handleTakePicPress = async () => {
    const res = await store?.cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });
    if (!res?.uri) throw 'can not get the path of the image token';

    console.log(res);

    store?.setSelectedPic({
      name: `${Date.now()}.jpg`,
      type: 'image/jpg',
      uri: res.uri,
    });
  };

  const handlePicConfirmationPress = async () => {
    try {
      store?.setIsPicConfirmed(true);

      const formData = new FormData();
      formData.append('image', store?.selectedPic);

      const res = await APICalls.imageRecognition(formData);

      store?.setIsPicConfirmed(false);
      store?.setSearchCriteria(res);

      console.log(res);
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.takePicButtonContainer}>
      <TouchableHighlight
        style={styles.takePicButton}
        underlayColor={`${COLORS.primary}cf`}
        onPress={handlePress}
        testID="takePicButton">
        <>{store?.selectedPic && <StatusIconToShow />}</>
      </TouchableHighlight>
    </View>
  );
};

const StatusIconToShow: React.FC = () => {
  const store = useScanScreenContext();

  return store?.isPicConfirmed ? (
    <ActivityIndicator color={COLORS.black} size="large" />
  ) : (
    <Image
      source={ICONS.correct}
      style={{width: 30, height: 30}}
      resizeMode="contain"
    />
  );
};

export {TakePicButton};
