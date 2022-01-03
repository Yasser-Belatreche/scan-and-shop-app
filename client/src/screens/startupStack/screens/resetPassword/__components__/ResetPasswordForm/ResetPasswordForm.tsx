import React, {useState} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../../ResetPassword.style';

// utils
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import {handleError} from '../../../../../../utils/helpers/handleError/handleError';
import {showToast} from '../../../../../../utils/helpers/showToast/showToast';
import {APICalls} from '../../../../../../apis';

// components
import {TextButton} from '../../../../../../components/Buttons';
import Input from '../../../../../../components/Input/Input';

// theme
import {SPACINGS} from '../../../../../../theme';

// types
import {MainStackNavigationProp} from '../../../../../MainStack.types';

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

interface Props extends MainStackNavigationProp<'StartupStack'> {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: React.FC<Props> = ({globalNavigation, setLoader}) => {
  const [errors, setErrors] = useState<Partial<ResetPasswordInputs>>();
  const [resetPasswordInput, setResetPasswordInputs] =
    useState<ResetPasswordInputs>({password: '', confirmPassword: ''});

  const handleSubmit = async () => {
    setLoader(true);
    setErrors({});

    try {
      await APICalls.resetPassword(resetPasswordInput);
      showToast('Your password has changed successfully');
      globalNavigation.replace('HomeStack', {screen: 'Home'});
    } catch (error) {
      setLoader(false);
      if (error instanceof InvalidInputValuesError) {
        setErrors(error.response.errors);
      } else handleError(error);
    }
  };

  return (
    <View style={styles.inputsContainer}>
      <Input
        label="New Password"
        name="password"
        setInputValues={setResetPasswordInputs}
        error={errors?.password}
        focused
        type="default"
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        setInputValues={setResetPasswordInputs}
        error={errors?.confirmPassword}
        type="default"
      />
      <TextButton
        variant="primary"
        testID="submitButton"
        style={{marginTop: SPACINGS.xxl}}
        onPress={handleSubmit}>
        Submit
      </TextButton>
    </View>
  );
};

export {ResetPasswordForm};
