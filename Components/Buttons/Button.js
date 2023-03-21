import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Image, Pressable } from 'react-native'

const Button = ({ text, mode }) => {
    return (
        <Pressable style={
            {
                backgroundColor: mode === "contained" ? "#43534D" : "#fff",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: mode === "contained" ? "#43534D" : "#43534D",
                marginRight: 16
            }
        }>
            <Text
                style={{ color: mode === "contained" ? "#fff" : "#43534D", }}
            >{text}</Text>
        </Pressable>
    )
}

export default Button