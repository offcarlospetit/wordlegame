import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Colors from '../../constants/Colors';
export interface PropsContainer extends ViewProps {
  children?: ReactNode;
}

const Container = (props: PropsContainer) => {
  return (
    <View style={[{...styles.container}, props.style]}>{props?.children}</View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
});
