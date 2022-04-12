import React from 'react'
import { ReactComponent as Logo } from '../../assets/images/rick_morty_logo.svg'
import SearchBar from '../../components/SearchBar'
import styles from './styles.module.css'

const Page = () => {
    return (
        <section>
            <header className={styles.header}>
                <Logo className={styles.svgRickMorty} />
            </header>
            <div className={styles.searchContainer}>
                <SearchBar />
            </div>
            <div style={{
                height:'180px'
            }}></div>
            
        </section>
    )
}

export default Page
