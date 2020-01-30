import React from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'

const ResultsDetail = ({ result }) => {
    return(
        <View style={styles.container}>
            <Text>{result.name}</Text>
            <Image style={styles.image} source={{ uri: result.image_url }} />
            <Text>{result.rating} Stars, {result.review_count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 4
    }
})

export default ResultsDetail