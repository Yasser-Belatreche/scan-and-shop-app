import React from 'react';

// types
import {Props} from './AuthOptions.types';

// components
import FacebookAuthButton from './__components__/FacebookAuthButton';
import GoogleAuthButton from './__components__/GoogleAuthButton';

const AuthOptions: React.FC<Props> = props => {
  return (
    <>
      <GoogleAuthButton {...props} />
      <FacebookAuthButton {...props} />
    </>
  );
};

export {AuthOptions};
