import React, { useState, useEffect } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Character'
import { RootStateOrAny, useSelector } from 'react-redux'

const Results = () => {
    const [list, setList] = useState<Result[]>([])
   // const {results} = useSelector((state:RootStateOrAny) => state.characters)
    const { entities } = useSelector((state:RootStateOrAny) => state.search)
    useEffect(() => {
        setList([])
        setList(entities)
    }, [entities])

    return (
        <section className={styles.resultsContainer}>
            {
                list.map((e: Result, i) => (
                    <article key={`${e.name}-${i}`} className={styles.heroCard}>
                        <header className={styles.cardHeader}>
                            <img src={e.image} alt="" />
                            <div className={`${styles.badge}`}>
                                <span className={`${styles[e.status]}`}>{e.status}</span>
                            </div>
                        </header>
                        <section className={styles.cardBody}>
                            <div>
                                <h3>{e.name}</h3>
                                <p>{e.species}</p>
                            </div>

                        </section>
                    </article>
                ))
            }

            

            {/* <article className={styles.heroCard}>
                <header className={styles.cardHeader}>
                    <img src="https://via.placeholder.com/300x300" alt=""/>
                    <div className={`${styles.badge}`}>
                        <span className={`${styles.dead}`}>Status</span>
                    </div>
                </header>
                <section className={styles.cardBody}>
                    <div>
                        <h3>Name</h3>
                        <p>Species</p>
                    </div>
                    
                </section>
            </article> */}
            {/* <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div> */}
        </section>
    )
}

export default Results
