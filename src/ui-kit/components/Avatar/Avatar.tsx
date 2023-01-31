import React from 'react';
import Box from '../Box/Box';
import Card from '../Card/Card';
import Text from '../Text/Text';
import { Image, ImageStyle, TouchableOpacity } from 'react-native';

type Props = {
    source?: any;
    imageStyle?: ImageStyle;
    onPress?: () => void;
    isSelected?: boolean;
};

const Avatar: React.FC<Props> = ({ source, imageStyle, onPress, isSelected }) => {
    return (
        <Box>
            <TouchableOpacity onPress={() => onPress ? onPress() : null}>
                <Card variant={isSelected ? "roundedAvatarSelected" : "roundedAvatar"} >
                    {
                        source ?
                            <Image resizeMode='cover' source={source} style={[{ width: 55, height: 55 }, imageStyle]} /> :
                            <Text variant="cellText">A</Text>
                    }
                </Card>
            </TouchableOpacity>
        </Box>
    );
};

export default Avatar;
