import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import params from './Slices/paramsSlice'
import characters from './Slices/characterSlice'
import episodes from './Slices/episodeSlice'
import locations from './Slices/locationSlice'

export const store = configureStore({
    reducer:{
        params,
        characters,
        episodes,
        locations
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 