import React, {useState} from 'react';

// types
import {MainStackNavigationProp} from '../../../../../MainStack.types';

// theme
import {SPACINGS} from '../../../../../../theme';

// components
import Buttons from './__components__/Buttons/Buttons';
import Inputs from './__components__/Inputs/Inputs';
import Header from '../../../../../../components/Header/Header';

export interface VerificationLetters {
  0: string;
  1: string;
  2: string;
  3: string;
}

interface Props {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailVerificationForm: React.FC<Props> = ({setLoader}) => {
  const [isWrongCode, setIsWrongCode] = useState<boolean>(false);
  const [verificationLetters, setVerificationLetters] =
    useState<VerificationLetters>({
      '0': '',
      '1': '',
      '2': '',
      '3': '',
    });

  const getVerificationCode = (): number => {
    const code = Object.values(verificationLetters).reduce(
      (prev, current) => prev + current,
    );

    return Number(code);
  };

  const getCurrentIndex = () => {
    for (const [key, value] of Object.entries(verificationLetters)) {
      if (value.length === 0) return Number(key);
    }
  };

  return (
    <>
      <Inputs
        setVerifcationLetters={setVerificationLetters}
        getCurrentIndex={getCurrentIndex}
      />
      {isWrongCode && (
        <Header
          color="error"
          capitalize
          style={{textAlign: 'center', marginBottom: SPACINGS.l}}>
          Wrong verification code, please try again
        </Header>
      )}
      <Buttons
        getVerificationCode={getVerificationCode}
        setLoader={setLoader}
        setIsWrongCode={setIsWrongCode}
      />
    </>
  );
};

export default EmailVerificationForm;
