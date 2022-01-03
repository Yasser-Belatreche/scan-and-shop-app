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

  salutation: {
    marginTop: SPACINGS.xl * 1.5,
    marginBottom: SPACINGS.xl,
  },

  or: {
    textAlign: 'center',
    marginBottom: SPACINGS.l,
    marginTop: SPACINGS.l,
  },

  bottomLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: SPACINGS.m,
  },
});

export default styles;
