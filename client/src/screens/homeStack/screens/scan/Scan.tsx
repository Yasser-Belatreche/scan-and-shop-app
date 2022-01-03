import React from 'react';
import {View} from 'react-native';

// styles
import {styles} from './Scan.style';

// components
import {ActionButtons} from './__components__/ActionButtons/ActionButtons';
import {CameraContainer} from './__components__/CameraContainer/CameraContainer';
import {SearchResult} from './__components__/SearchResult/SearchResult';

// context
import {ScanScreenContextProvider} from './__context__/context';

interface Props {}

const Scan: React.FC<Props> = () => {
  return (
    <ScanScreenContextProvider>
      <View style={styles.screenContainer}>
        <CameraContainer />
        <ActionButtons />
        <SearchResult />
      </View>
    </ScanScreenContextProvider>
  );
};

export default Scan;
