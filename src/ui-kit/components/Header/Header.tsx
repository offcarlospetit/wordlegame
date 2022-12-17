import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../utils/Scale';

type Props = {};

const Header: React.FC<Props> = ({}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        top: 0,
        height: top * 2,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <View
        style={{
          marginTop: top,
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: SCREEN_WIDTH * 0.8,
          }}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 32,
              fontWeight: '900',
            }}>
            Wordle Game
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={'reload1'} size={18} color={Colors.black} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
