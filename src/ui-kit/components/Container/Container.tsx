import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors'
type Props = {
    children: ReactElement;
}

const Container = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.silver,
        paddingHorizontal: 16,
    }
})