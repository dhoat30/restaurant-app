import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Image, Pressable } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper';
import Button from '../Buttons/Button';
import SecondaryButton from '../Buttons/SecondaryButton';
import CheckBox from './CustomInput/CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from "react-native-mask-text";
function PersonalInfoForm() {
    const [notification, setNotification] = useState({
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })
    useEffect(() => {
        (async () => {
            try {
                // input fields data 
                const responseFirstName = await AsyncStorage.getItem('firstName')
                const responseEmail = await AsyncStorage.getItem('email')
                const responseLastName = await AsyncStorage.getItem('lastName')
                const responsePhone = await AsyncStorage.getItem('phone')
                const firstName = JSON.parse(responseFirstName)
                const lastName = JSON.parse(responseLastName)
                const phone = JSON.parse(responsePhone)
                const email = JSON.parse(responseEmail)
                setFormData({ ...formData, firstName: firstName, email: email, lastName: lastName, phone: phone })

                // checkbox data
                const responseOrderStatuses = await AsyncStorage.getItem('orderStatuses')
                const responsePasswordChanges = await AsyncStorage.getItem('passwordChanges')
                const responseSpecialOffers = await AsyncStorage.getItem('specialOffers')
                const responseNewsletter = await AsyncStorage.getItem('newsletter')
                const orderStatuses = JSON.parse(responseOrderStatuses)
                const passwordChanges = JSON.parse(responsePasswordChanges)
                const specialOffers = JSON.parse(responseSpecialOffers)
                const newsletter = JSON.parse(responseNewsletter)
                setNotification({ ...notification, orderStatuses: orderStatuses, passwordChanges: passwordChanges, specialOffers: specialOffers, newsletter: newsletter })

            } catch (error) {
                console.log(error)
            }
        })();
    }, [])
    const saveHandler = async () => {
        try {
            console.log(formData)
            console.log(notification)
            await AsyncStorage.setItem('firstName', JSON.stringify(formData.firstName))
            await AsyncStorage.setItem('lastName', JSON.stringify(formData.lastName))
            await AsyncStorage.setItem('phone', JSON.stringify(formData.phone))
            await AsyncStorage.setItem('email', JSON.stringify(formData.email))
            await AsyncStorage.setItem('orderStatuses', JSON.stringify(notification.orderStatuses))
            await AsyncStorage.setItem('passwordChanges', JSON.stringify(notification.passwordChanges))
            await AsyncStorage.setItem('specialOffers', JSON.stringify(notification.specialOffers))
            await AsyncStorage.setItem('newsletter', JSON.stringify(notification.newsletter))
        }
        catch (error) {
            console.log(error)
        }
    }
    return (

        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Personal Info Form</Text>

            </View>
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>Avatar</Text>
                    <Image style={styles.avatarImage} source={require('../../assets/Profile.png')} />
                </View>
                <View style={styles.avatarButtons}>
                    <Button text="Change" mode="contained" />
                    <Button text="Remove" mode="outlined" />
                </View>
            </View>
            <TextInput
                style={styles.input}
                label="First name"
                mode="outlined"
                value={formData.firstName}
                onChangeText={text => setFormData({ ...formData, firstName: text })}
            />
            <TextInput
                style={styles.input}
                label="Last name"
                mode="outlined"
                value={formData.lastName}
                onChangeText={text => setFormData({ ...formData, lastName: text })}
            />
            <TextInput
                style={styles.input}
                label="Email"
                value={formData.email}
                keyboardType="email-address"
                mode="outlined"
                onChangeText={text => setFormData({ ...formData, email: text })}
            />
            <TextInput
                style={styles.input}
                label="Phone number"
                mode="outlined"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={text => setFormData({ ...formData, phone: text })}
            // render={props =>
            //     <MaskedTextInput
            //         mask="+1 000 000 00 00"
            //         onChangeText={(text, rawText) => {
            //             console.log(text);
            //             console.log(rawText);

            //         }}
            //     />
            // }
            />


            <View style={styles.checkboxContainer}>
                <Text style={styles.title}>Email Notifications</Text>
                <CheckBox label="Order statuses" selected={notification.orderStatuses} onPress={() => setNotification({ ...notification, orderStatuses: !notification.orderStatuses })} />
                <CheckBox label="Password changes" selected={notification.passwordChanges} onPress={() => setNotification({ ...notification, passwordChanges: !notification.passwordChanges })} />
                <CheckBox label="Special offers" selected={notification.specialOffers} onPress={() => setNotification({ ...notification, specialOffers: !notification.specialOffers })} />
                <CheckBox label="Newsletter" selected={notification.newsletter} onPress={() => setNotification({ ...notification, newsletter: !notification.newsletter })} />
            </View>



            <SecondaryButton
                text="Save changes"
                mode="contained"
                onPress={saveHandler}
            />

            <View style={styles.bottomButtons}>
                <Button text="Discard changes" mode="outlined" />
                <Button text="Log out" mode="contained" />
            </View>
        </ScrollView>


    )
}

export default PersonalInfoForm
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 8,
        margin: 10,
        marginTop: 6,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white",
    },
    avatarContainer: {
        marginTop: 10,
        flexDirection: "row",
    },
    avatarText: {
        color: "grey",
        fontWeight: 600,
        marginBottom: 4
    },
    avatarButtons: {
        marginLeft: 24,
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-around",

        flex: 1,
    },
    avatar: {

    },
    avatarImage: {
        width: 70,
        height: 70,
    },
    wrapper: {

        backgroundColor: "red",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",

    },

    input: {
        marginTop: 16,
        height: 40,
        justifyContent: "flex-start",

    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    radio: {
        backgroundColor: "red",
        borderWidth: 1,
    },
    checkboxContainer: {
        marginTop: 24,
        marginBottom: 24
    },
    bottomButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        marginBottom: 32
    }
}) 