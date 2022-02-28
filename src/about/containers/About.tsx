import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container, TextUI } from '../../ui-kit'

type Props = {}

const About = (props: Props) => {
    return (
        <Container>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextUI>Hi, i´m Carlos and this is a little NotWordle Game</TextUI>
                <TextUI>Made with ❤️</TextUI>
                <TextUI>And</TextUI>
                <TextUI>🍺</TextUI>
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({})

export default About
