import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { Axios, AxiosError } from 'axios'
import { Character, Result } from '../../interfaces/Character'

interface CharByName {
    page: string,
    name: string
}

interface charState {
    entities?: Result[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
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
    loading: 'idle'
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
        builder.addCase(getCharactersByName.fulfilled, (state, action) => {
            state.entities = action.payload
        })
    }
})

//export const { setQuery, setPage } = searchSlice.actions

export default searchSlice.reducer