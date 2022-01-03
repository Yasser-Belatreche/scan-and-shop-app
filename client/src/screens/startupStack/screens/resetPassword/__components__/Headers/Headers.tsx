import React from 'react';

// compontns
import Header from '../../../../../../components/Header/Header';

// theme
import {SPACINGS} from '../../../../../../theme';

interface Props {}

const Headers = (props: Props) => {
  return (
    <>
      <>
        <Header
          variant="h3"
          fontWeight="extraBold"
          capitalize
          style={{marginTop: SPACINGS.larger * 2}}>
          Reset Password
        </Header>

        <Header color="greyDeeper" style={{marginTop: SPACINGS.s}}>
          Enter your new password :
        </Header>
      </>
    </>
  );
};

export {Headers};
