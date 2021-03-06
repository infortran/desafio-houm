import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as HoumLogo } from '../../assets/images/houm_logo.svg'
import styles from './styles.module.css'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}
                onClick={() => {
                    navigate('/')
                }}
            >
                <HoumLogo />
                <p>Challenge</p>
            </div>
            <div className={styles.githubLink}>
                <a href="https://github.com/infortran/desafio-houm">Link to Github</a>
            </div>
        </nav>
    )
}

export default Navbar
