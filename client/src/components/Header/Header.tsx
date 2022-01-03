import React from 'react';
import {GestureResponderEvent, StyleProp, Text, TextStyle} from 'react-native';

// styles
import styles, {FONTS} from './Header.style';

// theme
import {COLORS} from '../../theme';

interface Props {
  variant?: keyof typeof styles;
  color?: keyof typeof COLORS;
  fontWeight?: keyof typeof FONTS;
  uppercase?: boolean;
  capitalize?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const Header: React.FC<Props> = ({
  children,
  variant = 'h6',
  capitalize = false,
  uppercase = false,
  color = 'black',
  fontWeight,
  onPress,
  style,
}) => {
  let elementStyles: StyleProp<TextStyle> = {
    ...styles[variant],
    color: COLORS[color],
  };

  if (capitalize) elementStyles.textTransform = 'capitalize';
  if (uppercase) elementStyles.textTransform = 'uppercase';
  if (fontWeight) elementStyles.fontFamily = FONTS[fontWeight];
  if (style) elementStyles = Object.assign(elementStyles, style);

  return (
    <Text onPress={onPress} style={elementStyles}>
      {children}
    </Text>
  );
};

export default Header;
