import React from 'react';

// components
import Header from '../../../../Header/Header';

interface Props {
  price: number;
}

const Price: React.FC<Props> = ({price}) => {
  return (
    <Header variant="h4" color="secondary" fontWeight="bold">
      ${price}.00
    </Header>
  );
};
export {Price};
