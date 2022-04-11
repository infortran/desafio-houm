import { createSlice } from '@reduxjs/toolkit'

const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        data: {
            loading: true,
            results: [],
            error: false,
            hasMore: true
        }
    },
    reducers: {
        setCharacters: (state, { payload }) => {
            state.data = payload
        }
    }
})

export const { setCharacters } = characterSlice.actions

export default characterSlice.reducer