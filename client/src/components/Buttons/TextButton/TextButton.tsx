import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

// styles
import styles from './TextButton.style';
import {COLORS} from '../../../theme';
import {FONTS} from '../../Header/Header.style';

// components
import Header from '../../Header/Header';

interface Props {
  variant: 'primary' | 'secondary';
  testID?: string;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  fontWeight?: keyof typeof FONTS;
  fontColor?: keyof typeof COLORS;
  icon?: ImageSourcePropType;
  iconPlacement?: 'left' | 'center';
  onPress?: (event: GestureResponderEvent) => void;
}

const TextButton: React.FC<Props> = props => {
  let customContainerStyles: StyleProp<any> = {
    ...styles[props.variant],
  };

  if (props.style) {
    customContainerStyles = Object.assign(customContainerStyles, props.style);
  }

  const customTextStyle: StyleProp<TextStyle> = {};

  if (props.fontSize) customTextStyle.fontSize = props.fontSize;
  if (props.fontWeight) customTextStyle.fontFamily = FONTS[props.fontWeight];
  if (props.fontColor) customTextStyle.color = COLORS[props.fontColor];

  return (
    <TouchableHighlight
      testID={props.testID}
      style={customContainerStyles}
      onPress={props.onPress}
      underlayColor={`${customContainerStyles.backgroundColor}cf`}>
      <View style={styles.container}>
        {props.icon && (
          <Image
            source={props.icon}
            style={[
              styles.icon,
              props.iconPlacement === 'left' && {
                position: 'absolute',
                left: 0,
              },
            ]}
          />
        )}

        <Header fontWeight="bold" style={customTextStyle}>
          {props.children}
        </Header>
      </View>
    </TouchableHighlight>
  );
};

export default TextButton;
