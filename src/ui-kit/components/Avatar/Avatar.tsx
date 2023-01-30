import React from 'react';
import Box from '../Box/Box';
import Card from '../Card/Card';
import Text from '../Text/Text';

type Props = {};

const Avatar: React.FC<Props> = ({ }) => {
    return (
        <Box>
            <Card variant="roundedAvatar" flex={1}>
                <Text variant="cellText">dadasdasL</Text>
            </Card>
        </Box>
    );
};

export default Avatar;
