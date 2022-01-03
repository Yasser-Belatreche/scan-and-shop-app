import React from 'react';
import {View} from 'react-native';

// styles
import styles from './EmailVerification.style';

// components
import Headers from './__components__/Headers/Headers';
import EmailVerificationForm from './__components__/EmailVerificationForm/EmailVerificationForm';

// hooks
import {useLoader} from '../../../../utils/hooks/useLoader';

interface Props {}

const EmailVerification: React.FC<Props> = props => {
  const {Loader, setLoader} = useLoader();

  return (
    <View style={styles.screenContainer}>
      <Loader />
      <Headers />
      <EmailVerificationForm setLoader={setLoader} />
    </View>
  );
};

export default EmailVerification;
