import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import { Searchbar as Search } from "react-native-paper";

function SearchBar({ onChangeText, value }) {
    return (
        <View>
            <Search
                placeholder="Search"
                value={value}
                onChangeText={onChangeText}
                style={styles.searchBar}
                inputStyle={{ color: "black" }}
                elevation={1}

            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#D9D9D9",

    },
    searchBar: {
        marginTop: 10,
        backgroundColor: "#D9D9D9",
        shadowRadius: 0,
        shadowOpacity: 0,
        borderRadius: 8,
        marginBottom: 10
    },
})