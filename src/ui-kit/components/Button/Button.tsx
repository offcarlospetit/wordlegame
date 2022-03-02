import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { BasicShadow, Colors, Scale, TextUI } from '../../index'
export type ButtomType = 'secondary' | 'primary' | 'danger' | 'success' | 'warning'
export type ButtomSize = 'small' | 'medium' | 'large'
interface Props extends TouchableOpacityProps {
    onPress: () => void;
    text: string;
    size?: ButtomSize;
    type?: ButtomType;
}

const Button = (props: Props) => {
    const { onPress, size = "large", type = "primary", text, ...rest } = props
    const returnSize = () => {
        switch (size) {
            case "small":
                return Scale(64);
            case "medium":
                return Scale(32);
            case "large":
                return Scale(16);
            default:
                return Scale(16);
        }
    }
    const returnType = () => {
        switch (type) {
            case "primary":
                return Colors.primaryGreen;
            case "danger":
                return Colors.danger;
            case "success":
                return Colors.success;
            case "warning":
                return Colors.warning;
            default:
                return Colors.silver;
        }
    }
    return (
        <View style={{ ...styles.buttonContainer, ...{ paddingHorizontal: returnSize(), } }}>
            <TouchableOpacity onPress={onPress} {...rest} activeOpacity={0.8}>
                <View style={[{ backgroundColor: returnType() }, styles.buttonTextContainer]}>
                    <TextUI style={styles.text}>{text}</TextUI>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: { paddingVertical: Scale(16) },
    buttonTextContainer: {
        borderRadius: Scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        ...BasicShadow
    },
    text: {
        marginTop: Scale(16),
        marginBottom: (16),
        fontWeight: '600',
        color: Colors.white
    }
})