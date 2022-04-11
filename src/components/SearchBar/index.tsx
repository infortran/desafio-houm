import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import useSearch from '../../Hooks/useSearch'
import { useDispatch } from 'react-redux'
import { setCharacters } from '../../store/Slices/characterSlice'

const SearchBar = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [page, setPage] = useState('')
    const [tabStatus, setTabStatus] = useState('Character')
    const placeholder = ['Character', 'Episode', 'Location']
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log(query)
    //     dispatch(setCharacters({loading, results, error, hasMore}))
    // }, [results])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
        setPage('1') 
    }

    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                    <input value={query} type="text" placeholder="Search a Character..." onChange={handleSearch} />
                    <i className="fa fa-list"></i>
                </div>

                <button onClick={() => {
                    
                }}>
                    <i className="fa fa-search"></i>
                    <span>Search</span>
                </button>
            </div>
            <div className={styles.tabNavigation}>
                {
                    placeholder.map(tab => (
                        <div className={`${styles.tabLink} ${tabStatus === tab && styles.tabActive}`}
                            onClick={(e) => { setTabStatus(e.currentTarget.innerHTML) }}
                        >{tab}</div>
                    ))
                }

                {/* <div className={`${styles.tabLink} ${tab === 'episodes' && styles.tabActive}`}
                    onClick={() => { setTab('episodes') }}
                >Episodes</div>
                <div className={`${styles.tabLink} ${tab === 'locations' && styles.tabActive}`}
                    onClick={() => { setTab('locations') }}
                >Locations</div> */}
            </div>
        </>
    )
}

export default SearchBar
