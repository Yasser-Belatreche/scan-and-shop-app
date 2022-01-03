import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// helpers
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import {handleError} from '../../../../../../utils/helpers/handleError/handleError';
import {UserToken} from '../../../../__utils__/UserToken';

// types
import {StartupStackNavigationProp} from '../../../../StartupStack.types';
import {MainStackNavigationProp} from '../../../../../MainStack.types';

// components
import {TextButton} from '../../../../../../components/Buttons';
import Input from '../../../../../../components/Input/Input';

interface Props extends MainStackNavigationProp<'StartupStack'> {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC<Props> = ({setIsLoading, globalNavigation}) => {
  const navigation = useNavigation<StartupStackNavigationProp<'Signup'>>();

  const [errors, setErrors] = useState<Partial<SignupBody>>();
  const [inputValues, setInputValues] = useState<SignupBody>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmitPress: () => void = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const userToken = await APICalls.signup(inputValues);

      await UserToken.save(userToken);
      navigation.replace('EmailVerification', {
        email: inputValues.email,
        onSuccess: () => {
          globalNavigation.replace('HomeStack', {screen: 'Home'});
        },
      });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof InvalidInputValuesError) {
        setErrors(error.response.errors);
      } else handleError(error);
    }
  };

  useEffect(() => {
    return () => setErrors({});
  }, []);

  return (
    <View>
      <Input
        placeholder="John Doe"
        label="name"
        name="name"
        error={errors?.name}
        setInputValues={setInputValues}
      />
      <Input
        placeholder="Example@email.com"
        label="email"
        name="email"
        type="email-address"
        error={errors?.email}
        setInputValues={setInputValues}
      />
      <Input
        label="password"
        name="password"
        error={errors?.password}
        setInputValues={setInputValues}
      />

      <TextButton
        variant="primary"
        testID="signupButton"
        onPress={handleSubmitPress}>
        Sign Up
      </TextButton>
    </View>
  );
};

export default SignupForm;
