import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './results.module.css'
import { Result } from '../../interfaces/Character'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getCharactersByName } from '../../store/Slices/characterSlice'
import { setParams } from '../../store/Slices/paramsSlice'

const CharacterResults = () => {
    const [list, setList] = useState<Result[]>([])
    const { entities, pages } = useSelector((state: RootStateOrAny) => state.characters)
    const { data } = useSelector((state: RootStateOrAny) => state.params)
    const { query, page, category} = data

    const dispatch = useDispatch()

    useEffect(() => {
        if(page === 1){
            setList([])
            console.log('pasa por el primero')
        }
        if(page > 1){
            setList(prev => {
                console.log('los prevs', prev)
                return [...prev, ...entities]
                
            })
            console.log('pasa por el segundo', entities)
        }else{
            setList(entities)
            console.log('pasa por el tercero')
        }
        console.log('use effect character result', data)
    }, [entities])

    const handleNextPage = () => {
        let newPage = page + 1
        console.log('old page', page)
        console.log('new page', newPage)
        console.log('el data query character', query)
        dispatch(getCharactersByName({name: query, page:newPage}))
        dispatch(setParams({category: 'Character', query, page:newPage}))
    }

    return (
        <>
            <section className={styles.resultsContainer}>
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
            </div>
        </>

    )
}

export default CharacterResults
