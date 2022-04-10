import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getCharacters = createAsyncThunk(
    'characters/getCharacters',
    async ()=>{
        const response = await axios.get('https://rickandmortyapi.com/api/character')
        console.log(response)
        return response.data.results
    },
)

const characterSlice = createSlice({
    name:'characters',
    initialState:{
        list:[],
        status:''
    },
    reducers:{},
    extraReducers:{
        [getCharacters.fulfilled.toString()] : (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        }
    }
})



export default characterSlice.reducer