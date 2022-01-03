import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// components
import {TextButton} from '../../../../../../components/Buttons';
import Input from '../../../../../../components/Input/Input';

// types
import {styles} from '../../ForgetPassword.style';

// types
import {StartupStackNavigationProp} from '../../../../StartupStack.types';

// utils
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import {handleError} from '../../../../../../utils/helpers/handleError/handleError';

interface EmailFormInput {
  email: '';
}

interface Props {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailEnteringForm: React.FC<Props> = ({setLoader}) => {
  const navigation =
    useNavigation<StartupStackNavigationProp<'ForgetPassword'>>();

  const [errors, setErrors] = useState<Partial<EmailFormInput>>();
  const [emailFormInput, setEmailFormInput] = useState<EmailFormInput>({
    email: '',
  });

  const handleSubmit = async () => {
    setErrors({});
    setLoader(true);

    try {
      await APICalls.sendVerificationEmail(emailFormInput.email);
      navigation.replace('EmailVerification', {
        email: emailFormInput.email,
        onSuccess: () => {
          navigation.replace('ResetPassword');
        },
      });
    } catch (error) {
      setLoader(false);
      if (error instanceof InvalidInputValuesError) {
        setErrors(error.response.errors);
      } else handleError(error);
    }
  };

  return (
    <>
      <Input
        label=""
        name="email"
        setInputValues={setEmailFormInput}
        placeholder="Example@email.com"
        containerStyle={styles.inputContainer}
        focused={true}
        error={errors?.email}
        type="email-address"
      />
      <TextButton
        variant="primary"
        onPress={handleSubmit}
        testID="submitEmailButton">
        Submit
      </TextButton>
    </>
  );
};

export {EmailEnteringForm};
