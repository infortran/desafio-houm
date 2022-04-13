import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Location'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getLocationsByName } from '../../store/Slices/locationSlice'
import { setParams } from '../../store/Slices/paramsSlice'
import NotFound from './NotFound'

const LocationResults = () => {
    const [list, setList] = useState<Result[]>([])
    const [colors, setColors] = useState<string[]>([])
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
    const handleColor = useCallback(() => {
        let colorsArr: string[] = []
        for (let i = 0; i < pages * 25; i++){
            let color = `#${Math.floor(Math.random()*16777215).toString(16)}`
            colorsArr.push(color)
        }
        setColors(colorsArr)
    }, [pages])

    useEffect(() => {
        handleColor()
    }, [handleColor])
    
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
                                
                                <div className={`${styles.randomImg}`} style={{
                                    background:colors[i], 
                                    color:'white'}}>

                                    <div className={styles.dimension}>{e.dimension}</div>
                                    <i className="fa fa-earth-americas"></i>
                                    <div>{e.residents.length}</div>
                                </div>
                            </header>
                            <section className={styles.cardBody}>
                                <div>
                                    <h3 className={styles.episodeH3}>{e.name}</h3>
                                <p>{e.type}</p>
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
