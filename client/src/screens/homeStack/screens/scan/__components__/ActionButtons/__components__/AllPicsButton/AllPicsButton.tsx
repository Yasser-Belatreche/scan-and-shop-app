import React from 'react';
import {Pressable, Image} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

// utils
import {ICONS} from '../../../../../../../../utils/constants';
import {handleError} from '../../../../../../../../utils/helpers/handleError/handleError';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const AllPicsButton: React.FC<Props> = () => {
  const store = useScanScreenContext();

  const handlePress = async () => {
    const res: any = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.2,
    });

    if (res.didCancel) return;
    if (!isValidReponse(res)) {
      let error = 'something went wrong at handlePress of AllPicsButton';
      return handleError(res.errorMessage || error);
    }

    const {fileName, type, uri} = res.assets[0];

    store?.setSelectedPic({
      name: fileName || `${Date.now()}`,
      type,
      uri,
    });
  };

  return (
    <Pressable
      style={styles.allPicsButtonContainer}
      testID="allPicsButton"
      onPress={handlePress}>
      <Image
        source={ICONS.imageIcon}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
      />
    </Pressable>
  );
};

const isValidReponse = (response: ImagePickerResponse): boolean => {
  if (
    !response.errorMessage &&
    response.assets &&
    response.assets[0] &&
    response.assets[0].type &&
    response.assets[0].uri
  ) {
    return true;
  } else return false;
};

export {AllPicsButton};
