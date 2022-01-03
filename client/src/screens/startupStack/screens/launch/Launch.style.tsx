import {StyleSheet} from 'react-native';
import {SPACINGS} from '../../../../theme';

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'column-reverse',
  },

  gradientContainer: {
    height: '50%',
    flexDirection: 'column-reverse',
  },

  contentContainer: {
    padding: SPACINGS.l,
  },
});

export default styles;
