import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id')

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data);
    };

    useEffect(() => {
        getResult(id)
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{result.name}</Text>
            <FlatList 
                data={result.photos}
                keyExtractor={photo => photo}
                renderItem={({uri: item }) => {
                    return <Image style={styles.image} source={photo} />
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container: {
        marginBottom: 10
    },
    image: {
        height: 200,
        width: 300
    }
})

export default ResultsShowScreen