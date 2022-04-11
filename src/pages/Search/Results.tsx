import React, { useState, useEffect } from 'react'
import styles from './results.module.css'
import { Character, Result } from '../../interfaces/Character'
import useSearch from '../../Hooks/useSearch'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/searchSlice'

const Results = () => {
    const [list, setList] = useState<Result[]>([])
   // const {results} = useSelector((state:RootStateOrAny) => state.characters)
    const { entities } = useSelector((state:RootStateOrAny) => state.search)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getCharactersByName({page:'1', name:'sanchez'}))
    }, [])

    return (
        <section className={styles.resultsContainer}>
            {
                entities.map((e: Result) => (
                    <article key={e.name} className={styles.heroCard}>
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
