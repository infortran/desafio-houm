import React, { useState, useEffect, useRef } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Character'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/characterSlice'
import { setParams } from '../../store/Slices/paramsSlice'
import NotFound from './NotFound'

const CharacterResults = () => {
    const [list, setList] = useState<Result[]>([])
    const { entities, pages, error } = useSelector((state: RootStateOrAny) => state.characters)
    const { data } = useSelector((state: RootStateOrAny) => state.params)
    const { query, page } = data
    const pageRef = useRef(1)
    const dispatch = useDispatch()

    useEffect(() => {
        pageRef.current = page
    }, [page])

    useEffect(() => {
        if (pageRef.current === 1) {
            setList([])
        }
        if (pageRef.current > 1) {
            setList(prev => {
                return [...prev, ...entities]
            })
        } else {
            setList(entities)
        }
    }, [entities])

    const handleNextPage = () => {
        let newPage = page + 1
        dispatch(getCharactersByName({ name: query, page: newPage }))
        dispatch(setParams({ category: 'Character', query, page: newPage }))
    }

    return (
        <>{
            !error ?
                <><section className={styles.resultsContainer}>
                    {
                        list.map((e: Result, i) => (
                            <article key={`${i}`} className={styles.heroCard}>
                                <header className={styles.cardHeader}>
                                    <img src={e.image} alt={e.name} title={e.name} />
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

                                <footer className={styles.cardFooter}>
                                    <hr />
                                    <div className={styles.cardFooterContainer}>
                                        <div>
                                            <i className="fa fa-earth-americas"></i>
                        <p>{e.origin.name}</p>
                                        </div>
                                        <div>
                                            {
                                                e.gender === 'Female' 
                                                ? 
                                                <i className="fa fa-venus"></i>
                                                :
                                                <i className="fa fa-mars"></i>
                                            }
                                            
                                        </div>
                                    </div>

                                </footer>
                            </article>
                        ))
                    }
                </section>
                    <div className={`${styles.btnNextContainer} ${data.page >= pages ? styles.btnNextDisabled : ''}`}>
                        <button className="btn-primary"
                            onClick={handleNextPage}
                        >Cargar mas</button>
                    </div></>
                :
                <NotFound />
        }
        </>

    )
}

export default CharacterResults
