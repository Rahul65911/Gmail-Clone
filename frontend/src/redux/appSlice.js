import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open:false,
    user:null,
    emails:[],
    sentEmails:[],
    searchText:"",
    emailType:0,
};

const appSlice = createSlice({
    name: "app",
    initialState,
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
        },
        resetState: () => initialState,
    }
});

export const { setOpen, setAuthUser, setEmails, setSearchText, setEmailType, setSentEmails, resetState } = appSlice.actions;
export default appSlice.reducer;