import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../Card/Card';
import Box from '../Box/Box';
import { palette } from '../../theme';

type Props = {
    handleNavigation: () => void;
};

const BasicHeader: React.FC<Props> = ({ handleNavigation }) => {
    const { top } = useSafeAreaInsets();

    return (
        <Card variant="headerCard" style={{ paddingTop: top + 10 }} alignSelf="stretch">
            <Box flex={1} paddingHorizontal="s" alignItems="center" flexDirection="row">
                <TouchableOpacity onPress={handleNavigation}>
                    <Icon name={'left'} size={32} color={palette.grayColor} />
                </TouchableOpacity>
            </Box>
        </Card>
    );
};

export default BasicHeader;
