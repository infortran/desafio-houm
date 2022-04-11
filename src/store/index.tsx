import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import params from './Slices/paramsSlice'
import search from './Slices/searchSlice'

export const store = configureStore({
    reducer:{
        params,
        search
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 