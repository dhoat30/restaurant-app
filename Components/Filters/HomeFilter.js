import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const HomeFilter = ({ onChange, sections, selections }) => {
    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.title}>Order for Delivery</Text>
            <View style={styles.buttonContainer}>
                {sections.map((section, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            onChange(index);
                        }}
                        style={{
                            flex: 1 / sections.length,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 8,
                            backgroundColor: selections[index] ? "#43534D" : '#DFDFDF',
                            borderRadius: 8,
                            marginRight: 8,

                        }}>
                        <View>
                            <Text style={{
                                color: selections[index] ? "white" : 'black',
                                textTransform: 'capitalize',
                                fontSize: 18,
                                fontWeight: '500'
                            }}>
                                {section}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        margin: 10,
        marginBottom: 16,
        marginTop: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',

    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: "row"
    }

});

export default HomeFilter;
