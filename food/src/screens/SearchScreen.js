import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import useResults from '../hooks/useResults'

import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price
        });
    };

    return (
        <View>
            <SearchBar 
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi()}
            />
            <ScrollView>
                <ResultsList title="Cost Effective" results={filterResultsByPrice('$')}/>
                <ResultsList title="Bit Pricier" results={filterResultsByPrice('$$')}/>
                <ResultsList title="Big Spender" results={filterResultsByPrice('$$$')}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SearchScreen