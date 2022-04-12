import React from 'react'
import { useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/rick_morty_logo.svg'
import SearchBar from '../../components/SearchBar'
import CharacterResults from './CharacterResults'
import LocationResults from './LocationResults'
import EpisodeResults from './EpisodeResults'

import styles from './styles.module.css'

const Page = () => {
    const { pathname } = useLocation()

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
                
                {
                    pathname === '/search-character' && <CharacterResults />
                }
                {
                    pathname === '/search-location' && <LocationResults />
                }
                {
                    pathname === '/search-episode' && <EpisodeResults />
                }
            </div>
            
        </section>
    )
}

export default Page
