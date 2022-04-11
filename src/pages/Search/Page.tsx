import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Logo } from '../../assets/images/rick_morty_logo.svg'
import SearchBar from '../../components/SearchBar'
import { getCharactersByName } from '../../store/Slices/searchSlice'
import Results from './Results'
import styles from './styles.module.css'

const Page = () => {
    const { data } = useSelector((state:RootStateOrAny) => state.params)
    const dispatch = useDispatch()

    const handleNextPage = () => {
        let actualPage = data.page
        let actualQuery = data.query
        actualPage = actualPage + 1
        console.log('actuals', actualPage, actualQuery)
        dispatch(getCharactersByName({page: actualPage, name:actualQuery}))
    }
    return (
        <section>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <Logo className={styles.svgRickMorty} />
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar />
                </div>
            </header>
            <div>
                <Results />
            </div>
            
        </section>
    )
}

export default Page
