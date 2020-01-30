import { useEffect, useState } from 'react'
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([])
    
    const searchApi = async () => {
        const response = await yelp.get('/search', {
            params: {
                term,
                location: 'san jose',
                limit: 50,
            }
        })
        setResults(response.data.business)
    }

    useEffect(() => {
        searchApi('pasta');
    }, [])

    return [searchApi, results]
}