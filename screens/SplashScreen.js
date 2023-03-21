import { View, Text, StyleSheet } from "react-native"

function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})