import React from 'react';

// components
import Header from '../../../../../components/Header/Header';

// styles
import {SPACINGS} from '../../../../../theme';

const TopHeaders: React.FC = () => (
  <>
    <Header color="primary" fontWeight="semibold" uppercase>
      welcome
    </Header>
    <Header capitalize color="white" variant="h2">
      remotely.io
    </Header>
    <Header color="white" style={{marginBottom: SPACINGS.l}}>
      We serve you with the best gadgets for your home workspace
    </Header>
  </>
);

export default TopHeaders;
