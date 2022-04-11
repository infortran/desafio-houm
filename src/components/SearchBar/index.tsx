import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
//import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/searchSlice'
import { setParams } from '../../store/Slices/paramsSlice'

const SearchBar = () => {
    //const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [tabStatus, setTabStatus] = useState('Character')
    const placeholder = ['Character', 'Episode', 'Location']
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log(query)
    //     dispatch(setCharacters({loading, results, error, hasMore}))
    // }, [results])

    useEffect(()=> {
        dispatch(getCharactersByName({page, name:query}))
        dispatch(setParams({ page, query })) 
    }, [query, page])
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
        setPage(1)
    }

    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                    <input value={query} type="text" placeholder="Search a Character..." onChange={handleSearch} />
                    <i className="fa fa-list"></i>
                </div>
            </div>
            <div className={styles.tabNavigation}>
                {
                    placeholder.map((tab, i) => (
                        <div key={i} className={`${styles.tabLink} ${tabStatus === tab && styles.tabActive}`}
                            onClick={(e) => { setTabStatus(e.currentTarget.innerHTML) }}
                        >{tab}</div>
                    ))
                }
            </div>
            
        </>
    )
}

export default SearchBar
