import React from 'react';
import {View} from 'react-native';

// types
import {VerificationLetters} from '../../EmailVerificationForm';

// components
import Input from '../../../../../../../../components/Input/Input';

// styles
import styles from '../../../../EmailVerification.style';

interface Props {
  getCurrentIndex: () => number | undefined;
  setVerifcationLetters: React.Dispatch<
    React.SetStateAction<VerificationLetters>
  >;
}

const Inputs: React.FC<Props> = ({setVerifcationLetters, getCurrentIndex}) => {
  const currentIndex = getCurrentIndex();

  return (
    <View style={styles.inputsContainer}>
      {[...Array(4)].map((_, index) => {
        return (
          <Input
            label=""
            name={index.toString()}
            setInputValues={setVerifcationLetters}
            align="center"
            maxLength={1}
            inputStyle={{fontSize: 22}}
            containerStyle={styles.input}
            type="number-pad"
            focused={index === currentIndex}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default Inputs;
