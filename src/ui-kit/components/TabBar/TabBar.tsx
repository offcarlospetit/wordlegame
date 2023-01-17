import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Scale, TextUI } from '../../index';

type StackNames = 'Game' | 'Profile' | 'About' | 'RankStack';

const iconNameMap: Record<StackNames, string> = {
  Game: 'grid-outline',
  Profile: 'person-circle-outline',
  About: 'information-circle-outline',
  RankStack: 'podium-outline',
};

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{ flexDirection: 'row', height: Scale(79), borderTopWidth: Scale(1), borderColor: Colors.silver, backgroundColor: Colors.white }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            //@ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              marginTop: Scale(4),
              alignItems: 'center',
            }}>
            <Ionicons
              name={iconNameMap[route.name as StackNames]}
              color={isFocused ? Colors.black : Colors.silverSand}
              size={24}
            />
            <TextUI
              style={{ color: isFocused ? Colors.black : Colors.silverSand }}>
              {label as string}
            </TextUI>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
