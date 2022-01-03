import {StyleSheet} from 'react-native';
import {COLORS, SPACINGS} from '../../theme';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    borderColor: COLORS.greyLighter,
    borderWidth: 1,
    width: '100%',
    height: 'auto',
    minHeight: 100,
    maxHeight: 130,
    display: 'flex',
    flexDirection: 'row',
    padding: SPACINGS.m,
    marginBottom: SPACINGS.s,
    marginTop: SPACINGS.s,
  },

  gridViewCardContainer: {
    maxWidth: 200,
    minHeight: 200,
    maxHeight: 250,
    flexDirection: 'column',
  },

  imageContainer: {
    backgroundColor: COLORS.whiteShade,
    borderRadius: 5,
    width: 100 - SPACINGS.m * 2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACINGS.s,
  },

  gridViewImageContainer: {
    width: '100%',
    height: '50%',
    maxHeight: 100,
    marginRight: 0,
  },

  image: {
    height: '80%',
    maxHeight: 80,
    width: '100%',
  },

  detailsContainer: {
    width: '70%',
    height: '100%',
    marginLeft: SPACINGS.s,
  },

  gridViewDetailsContainer: {
    width: '100%',
    height: 'auto',
    marginLeft: 0,
    marginTop: SPACINGS.m,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  point: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.greyDeeper,
    marginLeft: SPACINGS.m,
    marginRight: SPACINGS.m,
  },

  companyRatingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACINGS.s - 2,
    marginBottom: SPACINGS.s - 2,
  },
});

export {styles};
