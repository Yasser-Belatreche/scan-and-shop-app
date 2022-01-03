import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, SPACINGS} from '../../../../theme';

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    display: 'flex',
  },

  cameraContainer: {
    width: '100%',
    flex: 1,
  },

  actionButtons: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  allPicsButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.greyDeep,
    overflow: 'hidden',
  },

  takePicButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: SPACINGS.m,
    borderWidth: 0.6,
    borderColor: COLORS.greyDeeper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  takePicButton: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },

  flipCameraButtonContainer: {
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  returnButtonContainer: {
    width: 42,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 10,
    top: 20,
    left: 20,
    backgroundColor: '#040b141a',
    zIndex: 2,
  },

  closeButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 25,
    right: 25,
    zIndex: 2,
  },

  scanRectangle: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    top: '15%',
    right: '15%',
    borderRadius: 50,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  corner: {
    width: 40,
    height: 40,
  },

  scanBar: {
    position: 'absolute',
    borderTopColor: COLORS.whiteShade,
    borderTopWidth: 2,
    width: '96%',
    left: '2%',
    height: '60%',
    zIndex: 2,
  },

  scanShadow: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 3,
  },

  resultContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 4,
    width: '100%',
    height: 'auto',
    minHeight: Dimensions.get('screen').height / 3,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: SPACINGS.xl,
  },
});

export {styles};
