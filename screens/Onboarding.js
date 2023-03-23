import { StyleSheet, Text, View, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Onboarding() {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [firstNameTouched, setFirstNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)

    //name validation 
    const firstNameIsValid = firstName.trim().length > 1
    const firstNameIsInvalid = !firstNameIsValid && firstNameTouched

    // email validation 
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let emailAddressIsValid = pattern.test(email)
    const emailAddressIsInvalid = !emailAddressIsValid && emailTouched

    const pressHandler = async () => {

        try {
            await AsyncStorage.setItem('userOnBoarded', "true")
            await AsyncStorage.setItem('firstName', JSON.stringify(firstName))
            await AsyncStorage.setItem('email', JSON.stringify(email))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/Logo.png')} />
            </View>
            <View style={styles.formContainer}>
                <View>
                    <Text style={styles.title}>Let us get to know you</Text>
                    <View style={styles.inputField}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            autoComplete='given-name'
                            style={styles.input}
                            onChangeText={text => setFirstName(text)}
                            value={firstName}
                            onBlur={() => setFirstNameTouched(true)}
                        />
                        {firstNameIsInvalid && <Text style={styles.error}>Please enter a valid name</Text>}
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            autoComplete="email"
                            keyboardType="email-address"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            onBlur={() => setEmailTouched(true)}
                        />
                        {emailAddressIsInvalid && <Text style={styles.error}>Please enter a valid email address</Text>}
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={(!firstName && !email) && true}
                    style={styles.button}
                    onPress={pressHandler}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>

        </KeyboardAvoidingView >
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 70,
        backgroundColor: "#EDEFEE"
    },
    image: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        color: "#525E6B",
        marginBottom: 20
    },
    formContainer: {
        paddingTop: 50,
        backgroundColor: "#C6CBD3",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 50,
        flex: 0.7,
        justifyContent: "flex-end"
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: "#525E6B",
    },
    inputField: {
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 40,
        borderColor: '#525E6B',
        borderWidth: 2,
        borderRadius: 8,
    },
    buttonContainer: {
        flex: 0.3,
        backgroundColor: "#EDEFEE",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#C6CBD3",
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 8,
        marginRight: 20,

    },
    buttonText: {
        fontSize: 16,
        color: "#525E6B",

    },
    error: {
        color: "red",
        marginTop: 4
    }
})