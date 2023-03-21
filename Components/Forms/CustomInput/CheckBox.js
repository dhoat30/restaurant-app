import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'
function CheckBox({ label, selected, onPress }) {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 4,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? "#43534D" : "white",
                borderWidth: selected ? 0 : 1,
                borderColor: "#43534D"
            }}>
                {selected
                    &&
                    <Svg
                        width="15" height="54" viewBox="0 0 71 54" fill="white">
                        <Path d="M23 42.68L6.32001 26L0.640015 31.64L23 54L71 5.99998L65.36 0.359985L23 42.68Z" fill="white" />
                    </Svg>
                }

            </View>
            <Text style={{ marginLeft: 8 }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CheckBox
const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
    },

})