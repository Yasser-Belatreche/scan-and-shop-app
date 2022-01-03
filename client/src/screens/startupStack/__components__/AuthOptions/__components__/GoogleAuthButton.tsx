import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// helpers
import {APICalls} from '../../../../../apis';
import {UserToken} from '../../../__utils__/UserToken';
import {handleError} from '../../../../../utils/helpers/handleError/handleError';

// icons
import {ICONS} from '../../../../../utils/constants';

// styles
import {styles} from '../AuthOptions.styles';

// components
import {TextButton} from '../../../../../components/Buttons';

// types
import {Props} from '../AuthOptions.types';

const GoogleAuthButton: React.FC<Props> = ({
  variant,
  setIsLoading,
  globalNavigation,
}) => {
  const handlePress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      if (!idToken) return;

      setIsLoading(true);
      const userToken = await APICalls.googleAuth(idToken);

      await UserToken.save(userToken);
      globalNavigation.replace('HomeStack', {screen: 'Home'});
    } catch (error) {
      setIsLoading(false);
      if ((error as any).code === statusCodes?.SIGN_IN_CANCELLED) return;
      else handleError(error);
    }
  };

  return (
    <TextButton
      variant="primary"
      icon={ICONS.googleLogo}
      iconPlacement="left"
      fontWeight="medium"
      onPress={handlePress}
      style={styles}
      testID="googleAuthButton">
      {variant} with Google
    </TextButton>
  );
};

export default GoogleAuthButton;
