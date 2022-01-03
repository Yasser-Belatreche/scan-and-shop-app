import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, FlatList} from 'react-native';

// styles
import {styles} from '../../../../Scan.style';

// components
import Header from '../../../../../../../../components/Header/Header';
import {ProductCard} from '../../../../../../../../components/ProductCard/ProductCard';

interface Props {}

const ResultContainer: React.FC<Props> = () => {
  const screenHeight = Dimensions.get('screen').height;

  const topValue = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.timing(topValue, {
      toValue: screenHeight / 3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.resultContainer,
        top: topValue,
      }}>
      <Header variant="h4" fontWeight="bold" capitalize>
        search result
      </Header>
      <FlatList
        onRefresh={() => console.log('refrech')}
        refreshing={false}
        data={[
          {
            title: 'smart apple watch SE',
            company: 'Ali Express',
            price: 120,
            pictureLink:
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-space-sport-black-nc-1up?wid=940&hei=1112&fmt=png-alpha&.v=1594318693000',
            rating: 4.3,
          },
          {
            title: 'smart apple watch SE',
            company: 'Wish',
            price: 120,
            pictureLink:
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-space-sport-black-nc-1up?wid=940&hei=1112&fmt=png-alpha&.v=1594318693000',
            rating: 4.3,
          },
          {
            title: 'smart apple watch SE',
            company: 'Ali Express',
            price: 120,
            pictureLink:
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-space-sport-black-nc-1up?wid=940&hei=1112&fmt=png-alpha&.v=1594318693000',
            rating: 4.3,
          },
          {
            title: 'smart apple watch SE',
            company: 'Ali Express',
            price: 120,
            pictureLink:
              'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-space-sport-black-nc-1up?wid=940&hei=1112&fmt=png-alpha&.v=1594318693000',
            rating: 4.3,
          },
        ]}
        scrollEnabled
        renderItem={({item}) => <ProductCard {...(item as any)} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </Animated.View>
  );
};

export {ResultContainer};
