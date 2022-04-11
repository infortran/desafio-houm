import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Character'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/searchSlice'
import { setParams } from '../../store/Slices/paramsSlice'

const Results = () => {
    const [list, setList] = useState<Result[]>([])
    const { entities, pages } = useSelector((state: RootStateOrAny) => state.search)
    const { data } = useSelector((state: RootStateOrAny) => state.params)

    const dispatch = useDispatch()

    useEffect(() => {
        if(data.page === 1){
            setList([])
        }
        if(data.page > 1){
            setList(prev => {
                return [...prev, ...entities]
            })
        }else{
            setList(entities)
        }
    }, [entities])

    const handleNextPage = () => {
        let newPage = data.page + 1
        dispatch(getCharactersByName({name: data.query, page:newPage}))
        dispatch(setParams({query:data.query, page:newPage}))
    }

    return (
        <>
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
            </section>
            <div className={`${styles.btnNextContainer} ${data.page >= pages ? styles.btnNextDisabled : ''}`}>
                <button className="btn-primary"
                    onClick={handleNextPage}
                >Cargar mas</button>
            </div>
        </>

    )
}

export default Results
