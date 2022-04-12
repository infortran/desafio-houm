import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'
import { Episode, Result } from '../../interfaces/Episode'

interface EpisodeByName {
    page: number,
    name: string
}

interface episodeState {
    entities?: Result[],
    pages?:number | undefined,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentReqId: undefined | string,
    error: null | SerializedError
}

export const getEpisodesByName = createAsyncThunk(
    'episodes/getEpisodesByName',
    async (data:EpisodeByName, {rejectWithValue}) => {
        const { page, name } = data
        try{
            const response = await axios.get<Episode>('https://rickandmortyapi.com/api/episode',{ params: { page , name }})
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
} as episodeState

const episodeSlice = createSlice({
    name:'episodes',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getEpisodesByName.pending, (state, action) => {
            if(state.loading === 'idle'){
                state.loading = 'pending'
                state.currentReqId = action.meta.requestId
            }
        })
        .addCase(getEpisodesByName.fulfilled, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){ 
                state.loading = 'idle'
                state.entities = action.payload?.results
                state.pages = action.payload?.pages
                state.currentReqId = undefined
            }
        })
        .addCase(getEpisodesByName.rejected, (state, action) => {
            if(state.loading === 'pending' && state.currentReqId === action.meta.requestId){
                state.loading = 'idle'
                state.error = action.error
                state.currentReqId = undefined
            }
        })
    }
})


export default episodeSlice.reducer