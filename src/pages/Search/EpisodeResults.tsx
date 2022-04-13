import React, { useState, useEffect } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Episode'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getEpisodesByName } from '../../store/Slices/episodeSlice'
import { setParams } from '../../store/Slices/paramsSlice'
import NotFound from './NotFound'

const EpisodeResults = () => {
    const [list, setList] = useState<Result[]>([])
    const { entities, pages, error } = useSelector((state: RootStateOrAny) => state.episodes)
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
        // eslint-disable-next-line
    }, [entities])

    const handleNextPage = () => {
        let newPage = data.page + 1
        dispatch(getEpisodesByName({name: data.query, page:newPage}))
        dispatch(setParams({category:'Episode', page:newPage}))
    }

    return (
        <>
        {
            !error ?
            <>
            <section className={styles.resultsContainer}>
                {
                    list.map((e: Result, i) => (
                        <article key={`${e.name}-${i}`} className={styles.heroCard}>
                            <header className={styles.cardHeader}>
                                
                                <div className={`${styles.badge}`}>
                                    
                                </div>
                            </header>
                            <section className={styles.cardBody}>
                                <div>
                                    <h3>{e.name}</h3>
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
            :
            <NotFound/>
        }
        </>

    )
}

export default EpisodeResults
