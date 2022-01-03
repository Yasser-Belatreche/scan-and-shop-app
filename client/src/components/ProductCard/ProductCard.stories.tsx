import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ProductCard} from './ProductCard';
import {IMAGES} from '../../utils/constants';

const productCardStory = storiesOf('ProductCard', module);

const pictureLink =
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-space-sport-black-nc-1up?wid=940&hei=1112&fmt=png-alpha&.v=1594318693000';

productCardStory.add('Row View', () => (
  <ProductCard
    title="smart apple watch SE"
    company="Ali Express"
    price={120}
    pictureLink={pictureLink}
    rating={4.3}
  />
));

productCardStory.add('Grid View', () => (
  <ProductCard
    title="smart apple watch SE"
    company="Ali Express"
    price={120}
    pictureLink={pictureLink}
    rating={4.3}
    gridView
  />
));
