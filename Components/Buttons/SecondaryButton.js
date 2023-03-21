import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Image, Pressable } from 'react-native'

const SecondaryButton = ({ text, mode, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={
                {
                    backgroundColor: mode === "contained" ? "#E6CE30" : "black",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 16,
                    paddingRight: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: mode === "contained" ? "#E6CE30" : "#E6CE30",
                    marginRight: 16
                }
            }>
            <Text
                style={{ color: mode === "contained" ? "black" : "#E6CE30", textAlign: "center" }}>{text}</Text>
        </Pressable>
    )
}

export default SecondaryButton