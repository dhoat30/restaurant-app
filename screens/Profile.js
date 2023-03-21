import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PersonalInfoForm from '../Components/Forms/PersonalInfoForm'
import Header from '../Components/Header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.wrapper}>
                <Header />
                <PersonalInfoForm />
            </View>
        </KeyboardAvoidingView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {

        justifyContent: "space-around",

    }

})

