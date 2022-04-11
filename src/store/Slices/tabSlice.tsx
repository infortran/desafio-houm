import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name:'tabs',
    initialState:{
        tab:'characters'
    },
    reducers:{
        setTab:(state, {payload}) => {
            state.tab = payload
        }
    }
})

export const { setTab } = tabSlice.actions

export default tabSlice.reducer