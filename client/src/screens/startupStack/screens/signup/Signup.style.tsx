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
    marginTop: SPACINGS.l,
    marginBottom: SPACINGS.l,
  },

  authLoginButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.greyDeep,
    borderWidth: 0.6,
    marginTop: SPACINGS.s,
    marginBottom: SPACINGS.s,
  },

  or: {
    textAlign: 'center',
    marginBottom: SPACINGS.m,
    marginTop: SPACINGS.m,
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
