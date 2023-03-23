import { StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable, KeyboardAvoidingView, FlatList } from 'react-native';

const FlatLists = ({ menuData }) => {
    const Item = ({ title, description, price, image }) => (
        <View style={styles.item}>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <Image
                style={styles.image}
                source={{
                    uri: image
                }}
            />
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={menuData}
                renderItem={({ item }) => <Item title={item.title} description={item.description} price={item.price} image={item.image} />}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}
export default FlatLists

// write your code here
const styles = StyleSheet.create({
    container: {

        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "lightgrey",
    },
    item: {
        flexDirection: "row",
        borderTopWidth: 1,

        borderColor: "lightgrey",
        padding: 16,
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: "center"
    },
    contentWrapper: {
        flex: 0.7,
        marginRight: 8
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#6A6965",
        marginTop: 8,
        marginBottom: 8
    },
    price: {
        fontSize: 16,
        color: "#6A6965",
        fontWeight: "600"
    },
    image: {
        flex: 0.3,
        width: 100,
        height: 100,
        resizeMode: "cover",
    }
})