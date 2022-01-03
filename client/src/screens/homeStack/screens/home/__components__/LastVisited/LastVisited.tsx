import React from 'react';
import {View, Text} from 'react-native';

// styles
import {styles} from '../../Home.style';

// components
import Header from '../../../../../../components/Header/Header';

interface Props {}

const LastVisited: React.FC<Props> = () => {
  return (
    <View style={styles.latestVisited}>
      <Header variant="h3" fontWeight="bold" capitalize>
        latest visited
      </Header>
    </View>
  );
};

export {LastVisited};
