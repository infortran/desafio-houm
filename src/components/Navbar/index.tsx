import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HoumLogo } from '../../assets/images/houm_logo.svg'
import styles from './styles.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <p>Desafío</p>
                <HoumLogo />
            </div>
            <div className={styles.githubLink}>
                <a href="/">Link to Github</a>
            </div>
        </nav>
    )
}

export default Navbar
