import React from 'react';

// components
import Header from '../../../../Header/Header';

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({title}) => {
  return (
    <Header fontWeight="semibold" variant="h5" capitalize>
      {title}
    </Header>
  );
};

export {Title};
