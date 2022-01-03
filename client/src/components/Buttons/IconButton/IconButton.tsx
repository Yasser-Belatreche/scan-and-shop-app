import React, {useEffect} from 'react';
import {
  TouchableHighlight,
  Image,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  TextStyle,
  View,
  Text,
} from 'react-native';

// styles
import {styles} from './IconButton.style';

// theme
import {COLORS} from '../../../theme';

// icons
import {ICONS} from '../../../utils/constants';

interface Props {
  icon: ImageSourcePropType;
  size?: number;
  testID?: string;
  floten?: boolean;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: keyof typeof COLORS;
  flotenPositioning?: 'center' | 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void;
}

const IconButton: React.FC<Props> = props => {
  let underlayColorProp = `${COLORS.white}cf`;
  let customStyleButton: StyleProp<any> = {...styles.buttonContainer};

  if (props.style)
    customStyleButton = Object.assign(customStyleButton, props.style);

  if (props.backgroundColor) {
    customStyleButton.backgroundColor = COLORS[props.backgroundColor];
    customStyleButton.borderWidth = 0;
    underlayColorProp = `${COLORS[props.backgroundColor]}cf`;
  }

  if (props.size) {
    customStyleButton.width = props.size;
    customStyleButton.height = props.size;
    customStyleButton.borderRadius = props.size / 2;
  }

  if (props.floten) {
    customStyleButton = {
      ...customStyleButton,
      ...styles.floten,
      ...styles[props.flotenPositioning || 'right'],
    };
  }

  return (
    <TouchableHighlight
      style={customStyleButton}
      testID={props.testID}
      onPress={props.onPress}
      underlayColor={underlayColorProp}>
      <View style={styles.iconContainer}>
        <Image
          source={props.icon}
          style={[styles.icon, props.floten && {width: '40%'}]}
          resizeMode="contain"
        />
      </View>
    </TouchableHighlight>
  );
};

export default IconButton;
