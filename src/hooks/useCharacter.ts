import { useState, useEffect } from 'react'
import { Result } from "../interfaces/Character"
import { useAppDispatch } from '../store'
import { getCharactersByName } from '../store/Slices/searchSlice'

const useCharacters = (query:string, page:number) => {
    const [list, setList] = useState<Result[]>([])
    const dispatch = useAppDispatch()

   
}

export default useCharacters