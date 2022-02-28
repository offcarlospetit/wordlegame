import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Colors, TextUI } from '../..';

type StackNames = 'Game' | 'Profile' | 'About';


const iconNameMap: Record<StackNames, string> = {
    'Game': 'grid-outline',
    'Profile': 'person-circle-outline',
    'About': 'information-circle-outline',
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={{ flexDirection: 'row', height: 79 }}>
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
                        accessibilityRole='button'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'flex-start', marginTop: 4, alignItems: 'center' }}
                    >
                        <Icon name={iconNameMap[route.name as StackNames]} color={isFocused ? Colors.black : Colors.silverSand} size={24} />
                        <TextUI style={{ color: isFocused ? Colors.black : Colors.silverSand }}>
                            {label}
                        </TextUI>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar;