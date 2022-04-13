import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'
import { Location, Result } from '../../interfaces/Location'

interface LocationByName {
    page: number,
    name: string
}

interface locationState {
    entities?: Result[],
    pages?:number | undefined,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentReqId: undefined | string,
    error: null | SerializedError
}


export const getLocationsByName = createAsyncThunk(
    'locations/getLocationsByName',
    async (data: LocationByName, {rejectWithValue}) => {
        const { page, name } = data
        try{
            const response = await axios.get<Location>('https://rickandmortyapi.com/api/location',{ params: { page , name }})
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
} as locationState

const locationSlice = createSlice({
    name:'locations',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getLocationsByName.pending, (state, action) => {
            if(state.loading === 'idle'){
                state.loading = 'pending'
                state.currentReqId = action.meta.requestId
            }
        })
        .addCase(getLocationsByName.fulfilled, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){ 
                state.loading = 'idle'
                state.entities = action.payload?.results
                state.pages = action.payload?.pages
                state.error = null
                state.currentReqId = undefined
            }
        })
        .addCase(getLocationsByName.rejected, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){
                state.loading = 'idle'
                state.error = action.error
                state.currentReqId = undefined
            }
        })
    }
})


export default locationSlice.reducer