import React from 'react';
import {View, Text} from 'react-native';

// styles
import styles from '../../Signup.style';

// components
import Header from '../../../../../../components/Header/Header';
import {SPACINGS} from '../../../../../../theme';

const Salutation: React.FC = () => (
  <View style={styles.salutation}>
    <Header uppercase color="greyDeeper" variant="h5" fontWeight="bold">
      hi 👋
    </Header>
    <Header>
      <Header
        capitalize
        variant="h4"
        fontWeight="bold"
        style={{marginRight: SPACINGS.s * 1.3}}>
        Welcom to
      </Header>
      <Header capitalize variant="h4" color="primary" fontWeight="bold">
        {' '}
        Remotly.io
      </Header>
    </Header>
  </View>
);

export default Salutation;
