import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {COLORS, SPACINGS} from '../../../theme';

const containerStyle: StyleProp<ViewStyle> = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: SPACINGS.xl * 0.75,
  marginTop: SPACINGS.s,
  marginBottom: SPACINGS.s,
  borderRadius: SPACINGS.m - 2,
  position: 'relative',
};

const styles = StyleSheet.create({
  primary: {
    ...containerStyle,
    backgroundColor: COLORS.primary,
  },

  secondary: {
    ...containerStyle,
    backgroundColor: COLORS.whiteShade,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: SPACINGS.l,
  },
});

export default styles;
