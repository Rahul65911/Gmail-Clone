import { createSlice } from '@reduxjs/toolkit'
import useGetAllEmails from '../hooks/useGetAllEmails';

const appSlice = createSlice({
    name: "app",
    initialState: {
        open:false,
        user:null,
        emails:[],
        sentEmails:[],
        searchText:"",
        emailType:0,
    },
    reducers: {
        setOpen:(state, action) => {
            state.open = action.payload
        },
        setAuthUser:(state, action) => {
            state.user = action.payload
        },
        setEmails:(state, action) => {
            state.emails = action.payload
        },
        setSentEmails:(state, action) => {
            state.sentEmails = action.payload
        },
        setSearchText:(state, action) => {
            state.searchText = action.payload
        },
        setEmailType:(state, action) => {
            state.emailType = action.payload
        }
    }
});

export const { setOpen, setAuthUser, setEmails, setSearchText, setEmailType, setSentEmails } = appSlice.actions;
export default appSlice.reducer;