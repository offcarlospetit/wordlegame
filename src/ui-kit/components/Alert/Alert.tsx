import React from 'react';
import Box from '../Box/Box';
import Card from '../Card/Card';
import Text from '../Text/Text';
import Button from '../Button/Buttons';

type Props = {
    title?: string;
    body?: string;
    primaryButtonLabel?: string;
    primaryButtonOnPress?: () => void;
    secondaryButtonLabel?: string;
    secondaryButtonOnPress?: () => void;
};

const Alert: React.FC<Props> = ({ body, title, primaryButtonLabel, primaryButtonOnPress, secondaryButtonLabel, secondaryButtonOnPress }) => {
    return (
        <Box position="absolute" backgroundColor="transparentGray" top={0} width="100%" height="100%">
            <Box flex={1} paddingHorizontal="m" justifyContent="center" >
                <Card variant="alertVariant" backgroundColor="Emmerald">
                    <Box flex={1}>
                        <Box flex={1}>
                            <Text variant="alertTitle" textAlign="center">
                                {title}
                            </Text>
                        </Box>
                        <Box flex={1}>
                            <Text variant="alertBody" textAlign="center">
                                {body}
                            </Text>
                        </Box>
                    </Box>
                    <Box flexDirection="row">
                        {secondaryButtonLabel && secondaryButtonOnPress &&
                            <Box paddingHorizontal="s" flex={1}>
                                <Button label={secondaryButtonLabel} variant="danger" onPress={secondaryButtonOnPress} />
                            </Box>
                        }
                        {
                            primaryButtonLabel && primaryButtonOnPress &&
                            <Box paddingHorizontal="s" flex={1}>
                                <Button label={primaryButtonLabel} variant="primary" onPress={primaryButtonOnPress} />
                            </Box>
                        }
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default Alert;
