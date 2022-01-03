import React from 'react';
import {View, Text} from 'react-native';
import {useLoader} from '../../../../utils/hooks/useLoader';
import {MainStackNavigationProp} from '../../../MainStack.types';

// styles
import {styles} from './ResetPassword.style';

// components
import {Headers} from './__components__/Headers/Headers';
import {ResetPasswordForm} from './__components__/ResetPasswordForm/ResetPasswordForm';

interface Props extends MainStackNavigationProp<'StartupStack'> {}

const ResetPassword: React.FC<Props> = ({globalNavigation}) => {
  const {Loader, setLoader} = useLoader();
  return (
    <View style={styles.screenContainer}>
      <Loader />
      <Headers />
      <ResetPasswordForm
        globalNavigation={globalNavigation}
        setLoader={setLoader}
      />
    </View>
  );
};

export default ResetPassword;
