import React from 'react';
import {ScrollView, View} from 'react-native';

// styles
import {styles} from './Home.style';

// components
import {TopLinks} from './__components__/TopLinks/TopLinks';
import {ScanAnItem} from './__components__/ScanAnItem/ScanAnItem';
import {LastVisited} from './__components__/LastVisited/LastVisited';
import {CartButton} from './__components__/CartButton/CartButton';

interface Props {}

const Home: React.FC<Props> = props => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <TopLinks />
        <ScanAnItem />
        <LastVisited />
      </ScrollView>
      <CartButton />
    </View>
  );
};

export default Home;
