import axios, { Canceler } from 'axios'
import { useState, useEffect } from 'react'
import { Character, Result } from '../interfaces/Character'

const useSearch = (searchType: string, query?: string, page?: string) => {
    const [error, setError] = useState(true)
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState<Result[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(()=>{
        setResults([])
    },[query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel: Canceler
        axios.get<Character>(
            `https://rickandmortyapi.com/api/${searchType}${query ? `/${query}`: ''}`,
            {
                params: page ? { page, name: query } : {name: query},
                cancelToken: new axios.CancelToken(c => cancel = c)
            }
        ).then(res => {
            let response = res.data.results
            response.forEach(e => {
                setResults(prevResults => {
                    return [...prevResults, e]
                })
            })
            setHasMore(response.length > 0)
            setLoading(false)
            console.log('res', results)
        }).catch(error => {
            if (axios.isCancel(error)) return
            setError(true)
        })

        return () => cancel()
    }, [searchType, query, page])
    return { loading, error, results, hasMore }
}

export default useSearch