import 'react-native';
import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import Header from '../../../../../../components/Header/Header';

// types
import {StartupStackNavigationProp} from '../../../../StartupStack.types';

// styles
import styles from '../../Signup.style';

interface Props {}

const BottomLinks: React.FC<Props> = () => {
  const navigation = useNavigation<StartupStackNavigationProp<'Signup'>>();

  return (
    <View style={styles.bottomLinksContainer}>
      <Header color="greyDeeper">Already have an account ?</Header>
      <Header
        color="secondary"
        fontWeight="bold"
        onPress={() => navigation.navigate('Login')}>
        Login
      </Header>
    </View>
  );
};

export default BottomLinks;
