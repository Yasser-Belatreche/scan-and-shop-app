import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Image,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';

// icons
import {ICONS} from '../../utils/constants';

// styles
import {COLORS} from '../../theme';
import styles from './Input.style';

// components
import Header from '../Header/Header';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  type?: KeyboardTypeOptions;
  maxLength?: number;
  error?: string;
  align?: 'center' | 'left' | 'right';
  focused?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  setInputValues: React.Dispatch<React.SetStateAction<any>>;
}

type InputRef = React.LegacyRef<TextInput> | undefined;

const Input: React.FC<Props> = props => {
  const input = useRef<TextInput>();

  const handleTextChange: (text: string) => void = t => {
    props.setInputValues((values: any) => ({...values, [props.name]: t}));
  };

  useEffect(() => {
    if (props.focused) input.current?.focus();
    else input.current?.blur();
  }, [props.focused]);

  return (
    <View style={[styles.container, props.containerStyle]} testID="container">
      <Header style={styles.label} fontWeight="medium" capitalize>
        {props.label}
      </Header>

      <View style={styles.inputBoxContainer}>
        {props.name.toLocaleLowerCase().includes('password') ? (
          <PasswordInput {...props} handleTextChange={handleTextChange} />
        ) : (
          <TextInput
            style={[styles.input, props.inputStyle]}
            placeholderTextColor={COLORS.greyDeep}
            placeholder={props.placeholder}
            keyboardType={props.type}
            maxLength={props.maxLength}
            textAlign={props.align}
            onChangeText={handleTextChange}
            ref={input as InputRef}
          />
        )}
      </View>

      {props.error && (
        <Header uppercase color="error" style={{fontSize: 10}}>
          {props.error}
        </Header>
      )}
    </View>
  );
};

interface PasswordProps extends Props {
  handleTextChange: (text: string) => void;
}

const PasswordInput: React.FC<PasswordProps> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={COLORS.greyDeep}
        placeholder={props.placeholder}
        keyboardType={props.type}
        maxLength={props.maxLength}
        textAlign={props.align}
        onChangeText={props.handleTextChange}
        secureTextEntry={!showPassword}
      />
      <View onTouchStart={() => setShowPassword(!showPassword)}>
        <Image
          style={styles.icon}
          source={showPassword ? ICONS.showPassword : ICONS.hidePassword}
        />
      </View>
    </>
  );
};

export default Input;
