import React, {useCallback, useState} from 'react';
import ProgressLoader from 'rn-progress-loader';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Loader = useCallback(() => {
    return isLoading ? (
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={'#ffffff'}
        color={'#000000'}
      />
    ) : null;
  }, [isLoading]);

  return {Loader, setLoader: setIsLoading};
};

export {useLoader};
