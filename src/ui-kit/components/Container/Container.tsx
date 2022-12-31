import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Scale from '../../utils/Scale';
import Colors from '../../constants/Colors';
import Box from '../Box/Box';
export interface PropsContainer extends ViewProps {
  children?: ReactNode;
}

const Container = (props: PropsContainer) => {
  return (
    <Box style={[{ ...styles.container }, props.style]}>{props?.children}</Box>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
