import React from 'react'
import styles from './styles.module.css'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img src="https://c.tenor.com/0enOIWSLpd0AAAAC/rick-sad.gif" alt="404"/>
            <h2>Los sentimos</h2>
            <h3>No hemos encontrado lo que buscas</h3>
            <p>Intenta con otro término de búsqueda</p>
        </div>
    )
}

export default NotFound
