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
        ...styles.textStyleBase,
        ...style,
      }}
    />
  );
};

export default TextUI;

const styles = StyleSheet.create({
  textStyleBase: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
});
