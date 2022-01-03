import React from 'react';
import {useNavigation} from '@react-navigation/native';

// components
import TextButton from '../../../../../components/Buttons/TextButton/TextButton';
import Header from '../../../../../components/Header/Header';

// types
import {StartupStackNavigationProp} from '../../../StartupStack.types';

// styles
import {SPACINGS} from '../../../../../theme';
import {MainStackNavigationProp} from '../../../../MainStack.types';

interface Props extends MainStackNavigationProp<'StartupStack'> {}

const Buttons: React.FC<Props> = ({globalNavigation}) => {
  const navigation = useNavigation<StartupStackNavigationProp<'Launch'>>();

  return (
    <>
      <TextButton
        testID="loginButton"
        variant="primary"
        onPress={() => navigation.replace('Login')}>
        Login
      </TextButton>
      <Header
        fontWeight="bold"
        color="white"
        onPress={() => globalNavigation.replace('HomeStack', {screen: 'Home'})}
        style={{textAlign: 'center', padding: SPACINGS.l}}>
        Go wihout login
      </Header>
    </>
  );
};

export default Buttons;
