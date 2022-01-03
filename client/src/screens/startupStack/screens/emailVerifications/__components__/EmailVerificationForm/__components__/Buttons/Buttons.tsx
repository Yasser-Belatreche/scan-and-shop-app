import React from 'react';
import {useRoute} from '@react-navigation/native';

// components
import {TextButton} from '../../../../../../../../components/Buttons';
import Header from '../../../../../../../../components/Header/Header';

// theme
import {SPACINGS} from '../../../../../../../../theme';

// helpers
import {handleError} from '../../../../../../../../utils/helpers/handleError/handleError';
import {APICalls} from '../../../../../../../../apis';
import {showToast} from '../../../../../../../../utils/helpers/showToast/showToast';
import {UserToken} from '../../../../../../__utils__/UserToken';

// types
import {MainStackNavigationProp} from '../../../../../../../MainStack.types';
import {StartupStackRouteProp} from '../../../../../../StartupStack.types';
import {InvalidInputValuesError} from '../../../../../../../../apis/__utils__/Errors';

interface Props {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  getVerificationCode: () => number;
  setIsWrongCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons: React.FC<Props> = ({
  getVerificationCode,
  setLoader,
  setIsWrongCode,
}) => {
  const route = useRoute<StartupStackRouteProp<'EmailVerification'>>();

  const handleSubmit = async () => {
    setLoader(true);
    setIsWrongCode(false);

    try {
      const code = getVerificationCode();
      const userToken = await APICalls.verifyCode({
        code,
        email: route.params.email,
      });

      await UserToken.save(userToken);
      showToast('Your email verified successfully');
      route.params.onSuccess();
    } catch (error) {
      setLoader(false);
      if (
        error instanceof InvalidInputValuesError &&
        error.response.errors.toLowerCase().includes('wrong verification code')
      ) {
        setIsWrongCode(true);
      } else handleError(error);
    }
  };

  const handleResendPress = async () => {
    setLoader(true);
    try {
      await APICalls.sendVerificationEmail(route.params.email);
      showToast('Verification code resent successfully');
    } catch (error) {
      handleError(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <TextButton
        variant="primary"
        testID="sendCodeButton"
        onPress={handleSubmit}>
        Send Code
      </TextButton>
      <Header style={{marginTop: SPACINGS.s}}>
        <Header color="greyDeeper">Didn’t get the code?</Header>
        <Header color="secondary" fontWeight="bold" onPress={handleResendPress}>
          {' '}
          Resend code
        </Header>
      </Header>
    </>
  );
};

export default Buttons;
