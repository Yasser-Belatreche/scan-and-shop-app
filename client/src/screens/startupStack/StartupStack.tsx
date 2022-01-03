import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// screens
import LaunchScreen from './screens/launch/Launch';
import LoginScreen from './screens/login/Login';
import SignupScreen from './screens/signup/Signup';
import ForgetPasswordScreen from './screens/forgetPassword/ForgetPassword';
import EmailVerificationScreen from './screens/emailVerifications/EmailVerification';
import ResetPasswordScreen from './screens/resetPassword/ResetPassword';

// types
import {StartupStackScreens} from './StartupStack.types';
import {MainStackNavigation} from '../MainStack.types';

const Stack = createNativeStackNavigator<StartupStackScreens>();

interface Props extends MainStackNavigation<'StartupStack'> {}

const StartupStack: React.FC<Props> = ({navigation}) => {
  const screensOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  const Launch = () => <LaunchScreen globalNavigation={navigation} />;
  const Login = () => <LoginScreen globalNavigation={navigation} />;
  const Signup = () => <SignupScreen globalNavigation={navigation} />;
  const EmailVerification = () => <EmailVerificationScreen />;
  const ForgetPassword = () => <ForgetPasswordScreen />;
  const ResetPassword = () => (
    <ResetPasswordScreen globalNavigation={navigation} />
  );

  return (
    <Stack.Navigator screenOptions={screensOptions}>
      <Stack.Screen name="Launch" component={Launch} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default StartupStack;
