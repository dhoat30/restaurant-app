import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import SearchBar from '../Forms/CustomInput/SearchBar';

function Hero({ title, subtitle, content, onChangeText, value }) {
    return (
        <View style={styles.heroSection}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.imageContentWrapper}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
                <Image source={require("../../assets/hero-image.png")} style={styles.image} />
            </View>
            <SearchBar
                onChangeText={onChangeText}
                value={value}
            />
        </View>

    )
}

export default Hero
const styles = StyleSheet.create({

    heroSection: {
        backgroundColor: "#43534D",
        padding: 10,

    },

    title: {
        fontSize: 64,
        color: "#E6CE30",
        fontFamily: "markazi",

    },
    subtitle: {
        fontSize: 40,
        color: "white",
        fontFamily: "markazi",
        marginTop: -16
    },
    content: {
        fontSize: 18,
        color: "white",
        marginRight: 16
    },
    imageContentWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    contentWrapper: {
        flex: 0.6,

    },
    image: {
        width: 100,
        height: 150,
        resizeMode: "cover",
        flex: 0.4
    }

})