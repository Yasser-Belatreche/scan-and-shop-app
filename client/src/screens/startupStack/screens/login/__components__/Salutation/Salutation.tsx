import React from 'react';
import {View} from 'react-native';

// styles
import styles from '../../Login.style';

// components
import Header from '../../../../../../components/Header/Header';

const Salutation: React.FC = () => (
  <View style={styles.salutation}>
    <Header uppercase color="greyDeeper" variant="h5" fontWeight="bold">
      hi 👋
    </Header>
    <Header capitalize variant="h4" fontWeight="bold">
      welcom back
    </Header>
  </View>
);

export default Salutation;
