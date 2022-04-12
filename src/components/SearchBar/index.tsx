import React, { useState, useEffect } from 'react'
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
    const [initPage, setInitPage] = useState(1)
    const [initCategory, setInitCategory] = useState('')
    const { data } = useSelector((state:RootStateOrAny) => state.params)
    const { query, page, category } = data
    const placeholder = ['Character', 'Episode', 'Location']
    const dispatch = useDispatch()

    useEffect(()=> {
        query && setInputQuery(query)
        page && setInitPage(page)
        if(pathname === '/search-character'){
            console.log('input query del params en search', inputQuery, page)
            dispatch(setParams({category:'Character', query, page}))
            dispatch(getCharactersByName({page, name:inputQuery}))
        }
        if(pathname === '/search-episode'){
            dispatch(setParams({category:'Episode', query:inputQuery, page: initPage}))
            dispatch(getEpisodesByName({page, name:inputQuery}))
        }
        if(pathname === '/search-location'){
            dispatch(setParams({category:'Location', query:inputQuery, page: initPage}))
            dispatch(getLocationsByName({page, name:inputQuery}))
        }
    }, [query, pathname, inputQuery, category])
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputQuery(e.currentTarget.value)
        dispatch(setParams({query:e.currentTarget.value, page: 1}))
        console.log('data del handle search', data)
    }

    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                    <input value={inputQuery} type="text" placeholder={`${category ? `Search a ${category}...` : `Search a Character, Episode or Location`} `} onChange={handleSearch} />
                    <i className="fa fa-list"></i>
                </div>
            </div>
            <div className={styles.tabNavigation}>
                {
                    placeholder.map((tab, i) => (
                        <div key={`${tab}-${i}`} className={`${styles.tabLink} ${category === tab && styles.tabActive}`}
                            onClick={(e) => {
                                if(category !== tab){
                                    const val = e.currentTarget.innerHTML
                                    if(val === 'Character'){
                                        console.log('input query en boton categoria', inputQuery)
                                        dispatch(getCharactersByName({page, name:inputQuery}))
                                        dispatch(setParams({category:'Character', page: 1, query:inputQuery}))
                                        navigate('/search-character')
                                    }
                                    if(val === 'Episode'){
                                        dispatch(setParams({category:'Episode', page: 1, query:inputQuery}))
                                        navigate('/search-episode')
                                    }
                                    if(val === 'Location'){
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
