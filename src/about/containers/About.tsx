import React from 'react';
import { Box, Container, Text } from '../../ui-kit';

type Props = {};

const About: React.FC<Props> = ({ }) => {
  return (
    <Container>
      <Box paddingHorizontal='m' flex={1} justifyContent="center" alignItems="center">
        <Text lineHeight={42} textAlign='center' fontSize={35}>Hi, i´m Carlos and this is a little Game</Text>
        <Text lineHeight={42} fontSize={35}>Made with ❤️</Text>
        <Text lineHeight={42} fontSize={35}>And</Text>
        <Text lineHeight={42} fontSize={35}>🍺</Text>
      </Box>
    </Container>
  );
};

export default About;