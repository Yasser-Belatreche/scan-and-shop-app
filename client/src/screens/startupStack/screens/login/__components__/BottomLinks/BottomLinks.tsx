import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import Header from '../../../../../../components/Header/Header';

// styles
import styles from '../../Login.style';

// types
import {StartupStackNavigationProp} from '../../../../StartupStack.types';

interface Props {}

const BottomLinks: React.FC<Props> = () => {
  const navigation = useNavigation<StartupStackNavigationProp<'Login'>>();

  return (
    <View style={styles.bottomLinksContainer}>
      <Header
        color="greyDeeper"
        onPress={() => navigation.navigate('ForgetPassword')}>
        Forget password ?
      </Header>
      <Header
        color="secondary"
        fontWeight="bold"
        onPress={() => navigation.navigate('Signup')}>
        Sign up
      </Header>
    </View>
  );
};

export default BottomLinks;
