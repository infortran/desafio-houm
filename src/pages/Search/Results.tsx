import React, { useEffect } from 'react'
import { getCharacters } from '../../store/Slices/characterSlice'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import styles from './results.module.css'

const Results = () => {
    //const [list, setList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCharacters())
    }, [])

    const { list } = useSelector((state: RootStateOrAny) => state.characters)

    return (
        <section className={styles.resultsContainer}>
            {
                list.map((e: any) => (
                    <article className={styles.heroCard}>
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

        </section>
    )
}

export default Results
