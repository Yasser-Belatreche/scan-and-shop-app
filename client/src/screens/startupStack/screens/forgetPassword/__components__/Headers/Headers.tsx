import React from 'react';
import {View} from 'react-native';

// theme
import {SPACINGS} from '../../../../../../theme';

// components
import Header from '../../../../../../components/Header/Header';

interface Props {}

const Headers: React.FC<Props> = () => {
  return (
    <>
      <Header
        variant="h3"
        fontWeight="extraBold"
        capitalize
        style={{marginTop: SPACINGS.larger * 2}}>
        Forget password ?
      </Header>

      <Header color="greyDeeper" style={{marginTop: SPACINGS.s}}>
        Enter the old email that you create your account with:
      </Header>
    </>
  );
};

export {Headers};
