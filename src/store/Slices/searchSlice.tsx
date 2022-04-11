import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'
import { Character, Result } from '../../interfaces/Character'

interface CharByName {
    page: string,
    name: string
}

interface charState {
    entities?: Result[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentReqId: undefined | string,
    error: null | SerializedError
}

export const getAllCharacters = createAsyncThunk(
    'characters/getCharacters',
    async (page:number, {rejectWithValue}) => {
        try{
            const response = await axios.get<Character>('https://rickandmortyapi.com/api/character',{ params: { page }})
            return response.data.results
        }catch(err){
            if(axios.isAxiosError(err)){
                return rejectWithValue(err.response?.data)
            }
        }
    }
)
export const getCharactersByName = createAsyncThunk(
    'characters/getCharactersByName',
    async (data: CharByName, {rejectWithValue}) => {
        const { page, name } = data
        try{
            const response = await axios.get<Character>('https://rickandmortyapi.com/api/character',{ params: { page , name }})
            return response.data.results
        }catch(err){
            if(axios.isAxiosError(err)){
                return rejectWithValue(err.response?.data)
            }
        }
        
    }
)

const initialState = {
    entities: [],
    loading: 'idle',
    currentReqId: undefined,
    error: null
} as charState

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        // setQuery: (state, {payload}) => {
        //     state.query = payload
        // },
        // setPage: (state, {payload}) => {
        //     state.page = payload
        // }
    },
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
                state.entities = action.payload
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

//export const { setQuery, setPage } = searchSlice.actions

export default searchSlice.reducer