import React from 'react';
import {ScrollView} from 'react-native';

// types
import {MainStackNavigationProp} from '../../../MainStack.types';

// styles
import styles from './Signup.style';

// components
import Salutation from './__components__/Salutation/Salutation';
import {AuthOptions} from '../../__components__/AuthOptions/AuthOptions';
import OR from './__components__/OR/OR';
import SignupForm from './__components__/SignupForm/SignupForm';
import BottomLinks from './__components__/BottomLinks/BottomLinks';

// hooks
import {useLoader} from '../../../../utils/hooks/useLoader';

interface Props extends MainStackNavigationProp<'StartupStack'> {}

const Signup: React.FC<Props> = ({globalNavigation}) => {
  const {Loader, setLoader} = useLoader();

  return (
    <ScrollView style={styles.screenContainer}>
      <Loader />
      <Salutation />
      <AuthOptions
        globalNavigation={globalNavigation}
        variant="Signup"
        setIsLoading={setLoader}
      />
      <OR />
      <SignupForm
        setIsLoading={setLoader}
        globalNavigation={globalNavigation}
      />
      <BottomLinks />
    </ScrollView>
  );
};

export default Signup;
