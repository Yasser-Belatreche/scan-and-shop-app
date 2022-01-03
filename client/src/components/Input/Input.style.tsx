import {StyleSheet} from 'react-native';

// theme
import {COLORS, SPACINGS} from '../../theme';
import HEADERS, {FONTS} from '../Header/Header.style';

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACINGS.l,
    width: '100%',
  },

  label: {
    marginBottom: SPACINGS.s * 0.5,
  },

  inputBoxContainer: {
    width: '100%',
    paddingLeft: SPACINGS.m,
    paddingRight: SPACINGS.m,
    backgroundColor: COLORS.shade,
    borderRadius: SPACINGS.m - 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    ...HEADERS.h6,
    fontFamily: FONTS.medium,
    flex: 1,
  },

  icon: {
    width: 24,
    height: 24,
  },
});

export default styles;
