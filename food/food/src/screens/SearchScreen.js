import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import useResults from '../hooks/useResults'

import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price
        })
    }

    return (
        <View>
            <SearchBar 
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi()}
            />
            <Text>We have found {results.length} results</Text>
            <ResultsList results={filterResultsByPrice('$')}/>
            <ResultsList results={filterResultsByPrice('$$')}/>
            <ResultsList results={filterResultsByPrice('$$$')}/>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SearchScreen