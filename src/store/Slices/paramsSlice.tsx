import { createSlice } from '@reduxjs/toolkit'

const paramsSlice = createSlice({
    name: 'params',
    initialState: {
        data: {
            category:'',
            page: 1,
            query: ''
        }
    },
    reducers: {
        setParams: (state, { payload }) => {
            state.data = payload
        }
    }
})

export const { setParams } = paramsSlice.actions

export default paramsSlice.reducer