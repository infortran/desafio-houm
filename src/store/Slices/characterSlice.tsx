import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'
import { Character, Result } from '../../interfaces/Character'

interface CharByName {
    page: number,
    name: string
}

interface charState {
    entities?: Result[],
    pages?:number | undefined,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentReqId: undefined | string,
    error: null | SerializedError
}

export const getCharactersByName = createAsyncThunk(
    'characters/getCharactersByName',
    async (data: CharByName, {rejectWithValue}) => {
        const { page, name } = data
        try{
            console.log('page character', page)
            console.log('query character', name)
            const response = await axios.get<Character>('https://rickandmortyapi.com/api/character',{ params: { page , name }})
            return { results: response.data.results, pages: response.data.info.pages }
        }catch(err){
            if(axios.isAxiosError(err)){
                return rejectWithValue(err.response?.data)
            }
        }
        
    }
)

const initialState = {
    entities: [],
    pages:0,
    loading: 'idle',
    currentReqId: undefined,
    error: null
} as charState

const characterSlice = createSlice({
    name:'characters',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getCharactersByName.pending, (state, action) => {
            if(state.loading === 'idle'){
                state.loading = 'pending'
                state.currentReqId = action.meta.requestId
            }
        })
        .addCase(getCharactersByName.fulfilled, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){ 
                state.loading = 'idle'
                state.entities = action.payload?.results
                state.pages = action.payload?.pages
                state.currentReqId = undefined
            }
        })
        .addCase(getCharactersByName.rejected, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){
                state.loading = 'idle'
                state.error = action.error
                state.currentReqId = undefined
            }
        })
    }
})


export default characterSlice.reducer