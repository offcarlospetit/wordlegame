import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SocialIcon, SocialMediaType } from '@rneui/themed';

type Props = {
    onPress: () => void;
    type: SocialMediaType | 'apple';
    title?: string;
};

const SocialButton: React.FC<Props> = ({ onPress, type = "google", title }) => {
    return (
        <SocialIcon
            button
            light
            Component={TouchableOpacity}
            raised={false}
            title={title}
            fontStyle={{ color: 'black' }}
            style={{ width: 300 }}
            //@ts-ignore
            type={type}
            onPress={onPress}
        />
    );
};

export default SocialButton;