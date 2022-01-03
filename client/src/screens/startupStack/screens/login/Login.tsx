import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native';

// styles
import styles from './Login.style';

// components
import Salutation from './__components__/Salutation/Salutation';
import {AuthOptions} from '../../__components__/AuthOptions/AuthOptions';
import OR from './__components__/OR/OR';
import LoginForm from './__components__/LoginForm/LoginForm';
import BottomLinks from './__components__/BottomLinks/BottomLinks';

// types
import {MainStackNavigationProp} from '../../../MainStack.types';

// hooks
import {useLoader} from '../../../../utils/hooks/useLoader';

interface Props extends MainStackNavigationProp<'StartupStack'> {}

const Login: React.FC<Props> = ({globalNavigation}) => {
  const {Loader, setLoader} = useLoader();

  return (
    <ScrollView style={styles.screenContainer}>
      <Loader />
      <Salutation />
      <AuthOptions
        globalNavigation={globalNavigation}
        setIsLoading={setLoader}
        variant="Login"
      />
      <OR />
      <LoginForm setIsLoading={setLoader} globalNavigation={globalNavigation} />
      <BottomLinks />
    </ScrollView>
  );
};

export default Login;
