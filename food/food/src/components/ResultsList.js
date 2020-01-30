import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import ResultsDetail from './ResultsDetail'

const ResultsList = ({ results }) => {
    return(
        <View>
            <Text>ResultsList</Text>
            <FlatList 
                horizontal={true}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({item}) => {
                    return <ResultsDetail result={item} />
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({})

export default ResultsList