import React from 'react'
import { ReactComponent as Logo } from '../../assets/images/rick_morty_logo.svg'
import SearchBar from '../../components/SearchBar'
import Results from './Results'
import styles from './styles.module.css'

const Page = () => {
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
