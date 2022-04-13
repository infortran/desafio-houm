import React, { useState, useEffect } from 'react'
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
        // eslint-disable-next-line
    }, [entities])

    const handleNextPage = () => {
        let newPage = page + 1
        dispatch(getCharactersByName({name: query, page:newPage}))
        dispatch(setParams({category: 'Character', query, page:newPage}))
    }

    return (
        <>{
            !error ?
            <><section className={styles.resultsContainer}>
                {
                    list.map((e: Result, i) => (
                        <article key={`${i}`} className={styles.heroCard}>
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
            </div></> 
            :
            <NotFound />
            }
        </>

    )
}

export default CharacterResults
