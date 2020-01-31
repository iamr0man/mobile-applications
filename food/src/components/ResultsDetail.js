import React from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'

const ResultsDetail = ({ result }) => {
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: result.image_url }} />
            <Text style={styles.name}>{result.name}</Text>
            <Text>{result.rating} Stars, {result.review_count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginHorizontal: 15,
        marginBottom: 5
    },
    name: {
        fontWeight: 600,
        fontSize: 16
    }
})

export default ResultsDetail