import {StyleSheet} from 'react-native';
import {SPACINGS} from '../../theme';

const FONTS = {
  regular: 'Avenir-Regular',
  medium: 'Avenir-Medium',
  semibold: 'Avenir-SemiBold',
  bold: 'Avenir-Bold',
  extraBold: 'Avenir-ExtraBold',
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: FONTS.extraBold,
    fontSize: SPACINGS.larger,
  },

  h2: {
    fontFamily: FONTS.bold,
    fontSize: SPACINGS.large,
  },

  h3: {
    fontFamily: FONTS.medium,
    fontSize: SPACINGS.xxl,
  },

  h4: {
    fontFamily: FONTS.regular,
    fontSize: SPACINGS.xl,
  },

  h5: {
    fontFamily: FONTS.regular,
    fontSize: 16,
  },

  h6: {
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
});

export {FONTS};
export default styles;
