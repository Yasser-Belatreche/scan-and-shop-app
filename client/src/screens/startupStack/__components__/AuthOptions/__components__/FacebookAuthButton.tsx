import React from 'react';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

// helpers
import {APICalls} from '../../../../../apis';
import {UserToken} from '../../../__utils__/UserToken';
import {handleError} from '../../../../../utils/helpers/handleError/handleError';

// icons
import {ICONS} from '../../../../../utils/constants';

// components
import {TextButton} from '../../../../../components/Buttons';

// styles
import {styles} from '../AuthOptions.styles';

// types
import {Props} from '../AuthOptions.types';

const FacebookAuthButton: React.FC<Props> = ({
  variant,
  setIsLoading,
  globalNavigation,
}) => {
  const handlePress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) return;

      const data = await AccessToken.getCurrentAccessToken();
      if (!data?.accessToken) return;

      setIsLoading(true);
      const userToken = await APICalls.facebookAuth(data.accessToken);

      await UserToken.save(userToken);
      globalNavigation.replace('HomeStack', {screen: 'Home'});
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  return (
    <TextButton
      variant="primary"
      icon={ICONS.facebookLogo}
      iconPlacement="left"
      fontWeight="medium"
      onPress={handlePress}
      style={styles}
      testID="facebookAuthButton">
      {variant} with Facebook
    </TextButton>
  );
};

export default FacebookAuthButton;
