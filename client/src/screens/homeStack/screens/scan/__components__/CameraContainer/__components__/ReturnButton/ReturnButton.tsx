import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable} from 'react-native';

// utils
import {ICONS} from '../../../../../../../../utils/constants';

// types
import {HomeStackNavigationProp} from '../../../../../../HomeStack.types';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const ReturnButton: React.FC<Props> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Scan'>>();

  const store = useScanScreenContext();

  const handlePress = () => {
    if (store?.selectedPic) {
      store?.setIsPicConfirmed(false);
      store?.setSelectedPic(undefined);
    } else navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (!store?.selectedPic) return;

      e.preventDefault();
      store?.setIsPicConfirmed(false);
      store?.setSelectedPic(undefined);
    });

    return unsubscribe;
  }, [store?.selectedPic]);

  return (
    <Pressable
      testID="returnButton"
      style={styles.returnButtonContainer}
      onPress={handlePress}>
      <Image
        source={ICONS.returnWhite}
        style={{width: 10}}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export {ReturnButton};
