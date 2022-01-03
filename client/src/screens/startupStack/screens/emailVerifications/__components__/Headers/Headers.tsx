import React from 'react';
import {useRoute} from '@react-navigation/native';

// components
import Header from '../../../../../../components/Header/Header';
import {SPACINGS} from '../../../../../../theme';

// types
import {StartupStackRouteProp} from '../../../../StartupStack.types';

interface Props {}

const Headers: React.FC<Props> = () => {
  const route = useRoute<StartupStackRouteProp<'EmailVerification'>>();

  return (
    <>
      <Header
        style={{marginTop: SPACINGS.larger * 2}}
        fontWeight="bold"
        variant="h3">
        Verify your email adress
      </Header>
      <Header style={{marginTop: SPACINGS.s}}>
        <Header color="greyDeeper">
          We sent a verification code to your email
        </Header>
        <Header color="black"> {route.params.email}</Header>
      </Header>
    </>
  );
};

export default Headers;
