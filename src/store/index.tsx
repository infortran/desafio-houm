import { configureStore } from '@reduxjs/toolkit'
import characters from './Slices/characterSlice'

export default configureStore({
    reducer:{
        characters
    }
})