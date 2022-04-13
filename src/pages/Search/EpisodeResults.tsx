import React, { useState, useEffect, useRef } from 'react'
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
    const { query, page } = data
    const pageRef = useRef(1)

    const dispatch = useDispatch()
    useEffect(() => {
        pageRef.current = page
    }, [page])

    useEffect(() => {
        if(pageRef.current === 1){
            setList([])
        }
        if(pageRef.current > 1){
            setList(prev => {
                return [...prev, ...entities]
            })
        }else{
            setList(entities)
        }
    }, [entities])

    const handleNextPage = () => {
        let newPage = page + 1
        dispatch(getEpisodesByName({name: query, page:newPage}))
        dispatch(setParams({category:'Episode', page:newPage}))
    }

    const handleColor = (e: string) => {
        const season = e.substr(0, 3)
        console.log(season)
        switch (season) {
            case 'S01': return styles.season1;
            
            case 'S02': return styles.season2;
            
            case 'S03': return styles.season3;
            
            case 'S04': return styles.season4;
            
            case 'S05': return styles.season5;
            
            default: return styles.season1;
        }
    }

    return (
        <>
        {
            !error ?
            <>
            <section className={`${styles.resultsContainer} ${styles.resultsContainerLoc}`}>
                {
                    list.map((e: Result, i) => (
                        <article key={`${e.name}-${i}`} className={styles.heroCardEp}>
                            <header className={styles.cardHeader}>
                                <div className={`${styles.randomImg} ${handleColor(e.episode)}`}>
                                    <p>{e.episode}</p>
                    
                                </div>
                            </header>
                            <section className={styles.cardBody}>
                                <div>
                                    <h3 className={styles.episodeH3}>{e.name}</h3>
                                    <p>issued on: {e.air_date}</p>
                                </div>

                            </section>
                        </article>
                    ))
                }
            </section>
            <div className={`${styles.btnNextContainer} ${page >= pages ? styles.btnNextDisabled : ''}`}>
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
