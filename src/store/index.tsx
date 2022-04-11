import { configureStore } from '@reduxjs/toolkit'
import characters from './Slices/characterSlice'
import search from './Slices/searchSlice'

export default configureStore({
    reducer:{
        characters,
        search
    }
})