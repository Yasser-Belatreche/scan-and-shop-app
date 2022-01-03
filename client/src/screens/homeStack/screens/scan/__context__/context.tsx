import React, {createContext, useContext, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {ISelectedPic, ISearchCriteria} from '../Scan.types';

interface ScanScreenContextValues {
  selectedPic?: ISelectedPic;
  setSelectedPic: React.Dispatch<
    React.SetStateAction<ISelectedPic | undefined>
  >;

  isPicConfirmed: boolean;
  setIsPicConfirmed: React.Dispatch<React.SetStateAction<boolean>>;

  searchCriteria: ISearchCriteria | undefined;
  setSearchCriteria: React.Dispatch<
    React.SetStateAction<ISearchCriteria | undefined>
  >;

  cameraType: 'back' | 'front';
  setCameraType: React.Dispatch<React.SetStateAction<'back' | 'front'>>;

  cameraRef: React.RefObject<RNCamera>;
}

const ScanScreenContext = createContext<ScanScreenContextValues | undefined>(
  undefined,
);

const ScanScreenContextProvider: React.FC = ({children}) => {
  const [selectedPic, setSelectedPic] = useState<ISelectedPic | undefined>();
  const [isPicConfirmed, setIsPicConfirmed] = useState<boolean>(false);
  const [searchCriteria, setSearchCriteria] = useState<ISearchCriteria>();

  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');

  const cameraRef = useRef<RNCamera>(null);

  return (
    <ScanScreenContext.Provider
      value={{
        selectedPic,
        setSelectedPic,
        isPicConfirmed,
        setIsPicConfirmed,
        cameraType,
        setCameraType,
        cameraRef,
        searchCriteria,
        setSearchCriteria,
      }}>
      {children}
    </ScanScreenContext.Provider>
  );
};

const useScanScreenContext = () => {
  return useContext(ScanScreenContext);
};

export {ScanScreenContextProvider, useScanScreenContext};
