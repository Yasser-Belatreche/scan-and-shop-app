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

  inputsContainer: {
    marginTop: SPACINGS.xxl,
    marginBottom: SPACINGS.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    width: '22%',
  },
});

export default styles;
