import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from '../../../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.greyLighter,
  },

  iconContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: '60%',
  },

  floten: {
    width: 70,
    height: 70,
    borderRadius: 35,
    elevation: 10,
    shadowColor: COLORS.greyLight,
  },

  right: {
    right: 20,
    bottom: 20,
    position: 'absolute',
  },

  left: {
    left: 20,
    bottom: 20,
    position: 'absolute',
  },

  center: {
    position: 'absolute',
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {styles};
