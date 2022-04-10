import React from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="Rick, Human, Earth" />
                    <i className="fa fa-list"></i>
                </div>
                
                <button onClick={()=>{
                    navigate('/search')
                }}>
                    <i className="fa fa-search"></i>
                    <span>Search</span>
                </button>
            </div>
            <div className={styles.tabNavigation}>
                <div className={`${styles.tabLink} ${styles.tabActive}`}>Characters</div>
                <div className={styles.tabLink}>Episodes</div>
                <div className={styles.tabLink}>Locations</div>
            </div>
        </>
    )
}

export default SearchBar
