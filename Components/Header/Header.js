import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Header({ showBackButton }) {
    const [initials, setInitials] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const responseFirstName = await AsyncStorage.getItem('firstName')
                const responseLastName = await AsyncStorage.getItem('lastName')
                const firstName = JSON.parse(responseFirstName)
                const lastName = JSON.parse(responseLastName)
                let fullName = firstName + ' ' + lastName
                const initialsData = fullName.match(/\b\w/g) || [];
                setInitials(initialsData.join(''))
            }
            catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return (

        <View style={styles.header}>
            <View style={{ width: 40 }}>
                {showBackButton &&
                    <Pressable style={styles.backButton}>
                        <Svg width="20" height="14" viewBox="0 0 20 14" fill="none" {...showBackButton}>
                            <Path d="M7.57 0.93L1.5 7L7.57 13.07M18.5 7H1.67" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </Pressable>
                }
            </View>
            {/* <Image style={styles.image} source={require('../../assets/Logo.png')} /> */}
            <Image style={styles.image} source={require('../../assets/Logo.png')} />
            <View style={styles.profileBackground}>
                <Text style={styles.profileText}>{initials}</Text>
            </View>

        </View>


    )
}

export default Header
const styles = StyleSheet.create({
    container: {

    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        width: 150,
        height: 80,
        resizeMode: 'contain',
    },
    profileBackground: {
        backgroundColor: "#E6CE30",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    profileText: {
        fontSize: 16

    },
    buttonContainer: {
        flex: 0.3,
        backgroundColor: "#EDEFEE",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    backButton: {
        backgroundColor: "#495E57",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50

    },


})