import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

export interface TextUIProps extends TextProps {
  style?: TextStyle;
}

const TextUI = (props: TextUIProps) => {
  const {style = {}} = props;
  return (
    <Text
      {...props}
      style={{
        ...{fontSize: 16, lineHeight: 24, fontFamily: 'Gill Sans'},
        ...style,
      }}
    />
  );
};

export default TextUI;

const styles = StyleSheet.create({});
