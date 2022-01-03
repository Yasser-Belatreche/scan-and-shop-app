import React from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../../Scan.style';

// context
import {useScanScreenContext} from '../../__context__/context';

// compoentns
import {Overlay} from './__components__/Overlay/Overlay';
import {ResultContainer} from './__components__/ResultContainer/ResultContainer';

interface Props {}

const SearchResult: React.FC<Props> = () => {
  const store = useScanScreenContext();

  return store?.searchCriteria ? (
    <>
      <Overlay />
      <ResultContainer />
    </>
  ) : null;
};

export {SearchResult};
