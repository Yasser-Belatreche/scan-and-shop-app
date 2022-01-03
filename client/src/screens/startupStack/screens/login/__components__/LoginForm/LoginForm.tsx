import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// utils
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import {handleError} from '../../../../../../utils/helpers/handleError/handleError';
import {UserToken} from '../../../../__utils__/UserToken';

// theme
import {SPACINGS} from '../../../../../../theme';

// types
import {MainStackNavigationProp} from '../../../../../MainStack.types';

// components
import {TextButton} from '../../../../../../components/Buttons';
import Input from '../../../../../../components/Input/Input';
import Header from '../../../../../../components/Header/Header';

interface Props extends MainStackNavigationProp<'StartupStack'> {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginBody {
  email: string;
  password: string;
}

interface Errors extends Partial<LoginBody> {
  credentials?: string;
}

const LoginForm: React.FC<Props> = ({setIsLoading, globalNavigation}) => {
  const [errors, setErrors] = useState<Errors>();
  const [inputValues, setInputValues] = useState<LoginBody>({
    email: '',
    password: '',
  });

  const handleSubmitPress: () => Promise<void> = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const userToken = await APICalls.login(inputValues);
      await UserToken.save(userToken);

      globalNavigation.replace('HomeStack', {screen: 'Home'});
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
        placeholder="Email@example.com"
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

      {errors?.credentials && (
        <Header
          color="error"
          capitalize
          style={{textAlign: 'center', marginBottom: SPACINGS.l}}>
          {errors.credentials}
        </Header>
      )}

      <TextButton
        variant="primary"
        testID="loginButton"
        onPress={handleSubmitPress}>
        Login
      </TextButton>
    </View>
  );
};

export default LoginForm;
