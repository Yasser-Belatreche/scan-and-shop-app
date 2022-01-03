import React from 'react';
import {View} from 'react-native';

// hooks
import {useLoader} from '../../../../utils/hooks/useLoader';

// styles
import {styles} from './ForgetPassword.style';
import {EmailEnteringForm} from './__components__/EmailEnteringForm/EmailEnteringForm';

// components
import {Headers} from './__components__/Headers/Headers';

interface Props {}

const ForgetPassword: React.FC<Props> = () => {
  const {Loader, setLoader} = useLoader();

  return (
    <View style={styles.screenContainer}>
      <Loader />
      <Headers />
      <EmailEnteringForm setLoader={setLoader} />
    </View>
  );
};

export default ForgetPassword;
