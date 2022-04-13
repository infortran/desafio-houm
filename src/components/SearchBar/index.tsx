import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './styles.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/characterSlice'
import { setParams } from '../../store/Slices/paramsSlice'
import { getLocationsByName } from '../../store/Slices/locationSlice'
import { getEpisodesByName } from '../../store/Slices/episodeSlice'

const SearchBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [inputQuery, setInputQuery] = useState('')
    const categoryRef = useRef()
    const { data } = useSelector((state:RootStateOrAny) => state.params)
    const { query, page, category } = data
    const placeholder = ['Character', 'Episode', 'Location']
    const dispatch = useDispatch()

    const dispatcher = useCallback(()=> {
        query && setInputQuery(query)
        if(category) categoryRef.current = category
        if(pathname === '/search-character'){
            dispatch(setParams({category:'Character', query, page}))
            dispatch(getCharactersByName({page, name:inputQuery}))
        }
        if(pathname === '/search-episode'){
            dispatch(setParams({category:'Episode', query:inputQuery, page}))
            dispatch(getEpisodesByName({page, name:inputQuery}))
        }
        if(pathname === '/search-location'){
            dispatch(setParams({category:'Location', query:inputQuery, page}))
            dispatch(getLocationsByName({page, name:inputQuery}))
        }
    }, [query, pathname, inputQuery, dispatch, category, page])

    useEffect(()=>{
        dispatcher()
    },[dispatcher])
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputQuery(e.currentTarget.value)
        dispatch(setParams({query:e.currentTarget.value, page: 1}))
    }

    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                    <input value={inputQuery} type="text" placeholder={`${category ? `Search a ${category}...` : `Search a Character, Episode or Location`} `} onChange={handleSearch} />
                    {/*<i className="fa fa-list"></i>*/}
                </div>
            </div>
            <div className={styles.tabNavigation}>
                {
                    placeholder.map((tab, i) => (
                        <div key={`${tab}-${i}`} className={`${styles.tabLink} ${categoryRef.current === tab && styles.tabActive}`}
                            onClick={(e) => {
                                if(category !== tab){
                                    const val = e.currentTarget.innerHTML
                                    if(val === 'Character'){
                                        dispatch(getCharactersByName({page: 1, name:inputQuery}))
                                        dispatch(setParams({category:'Character', page: 1, query:inputQuery}))
                                        navigate('/search-character')
                                    }
                                    if(val === 'Episode'){
                                        dispatch(getEpisodesByName({page: 1, name:inputQuery}))
                                        dispatch(setParams({category:'Episode', page: 1, query:inputQuery}))
                                        navigate('/search-episode')
                                    }
                                    if(val === 'Location'){
                                        dispatch(getLocationsByName({page: 1, name:inputQuery}))
                                        dispatch(setParams({category:'Location', page: 1, query:inputQuery}))
                                        navigate('/search-location')
                                    }
                                }
                            }}
                        >{tab}</div>
                    ))
                }
            </div>
            
        </>
    )
}

export default SearchBar
