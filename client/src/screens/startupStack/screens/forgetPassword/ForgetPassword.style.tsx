import {StyleSheet} from 'react-native';

// theme
import {COLORS, SPACINGS} from '../../../../theme';

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    padding: SPACINGS.l,
  },

  inputContainer: {
    marginTop: SPACINGS.xxl,
    marginBottom: SPACINGS.xxl,
  },
});

export {styles};
