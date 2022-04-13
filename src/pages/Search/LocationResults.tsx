import React, { useState, useEffect, useRef } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Location'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getLocationsByName } from '../../store/Slices/locationSlice'
import { setParams } from '../../store/Slices/paramsSlice'
import NotFound from './NotFound'

const LocationResults = () => {
    const [list, setList] = useState<Result[]>([])
    const { entities, pages, error } = useSelector((state: RootStateOrAny) => state.locations)
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
        let newPage = data.page + 1
        dispatch(getLocationsByName({name: query, page:newPage}))
        dispatch(setParams({category: 'Location', page:newPage}))
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
            <NotFound />
        }   
        </>

    )
}

export default LocationResults
