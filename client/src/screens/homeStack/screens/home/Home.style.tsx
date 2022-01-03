import {StyleSheet} from 'react-native';
import {COLORS, SPACINGS} from '../../../../theme';

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    padding: SPACINGS.l,
  },

  topLinksContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  scanAnItemContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.darkShade,
    borderRadius: 20,
    padding: SPACINGS.xl,
    display: 'flex',
  },

  manImage: {
    position: 'absolute',
    bottom: 0,
    right: -100,
    width: '150%',
    height: '150%',
  },

  latestVisited: {
    marginTop: 30,
  },
});

export {styles};
