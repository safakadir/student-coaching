import { Ogrenci } from "@/lib/types/ogrenci-types";
import {createDraftSafeSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface OgrenciState {
    currentOgrenci?: Ogrenci
}

const initialState: OgrenciState = {
    currentOgrenci: undefined
}

export const ogrenciSlice = createSlice({
    name: "ogrenci",
    initialState,
    reducers: {
        setOgrenci: (state, action: PayloadAction<Ogrenci>) => {
            state.currentOgrenci = action.payload
        },
        clearOgrenci: (state) => {
            state.currentOgrenci = undefined
        }
    }
})

export const {
    setOgrenci,
    clearOgrenci
} = ogrenciSlice.actions

const selectSelf = (state: RootState) => state
export const ogrenciSelector = createDraftSafeSelector(selectSelf, (state) => state.ogrenci.currentOgrenci)
