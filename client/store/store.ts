import {configureStore} from '@reduxjs/toolkit'
import { ogrenciSlice } from './ogrenci-slice'

const store = configureStore({
    reducer: {
        ogrenci: ogrenciSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store
