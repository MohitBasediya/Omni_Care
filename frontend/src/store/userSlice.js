import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { requestedURL } from '../urls.js';

const initialState = {
    user_Data : {},
    navShow:"home",
    status : false
};

const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        userData : (state,action)=>{
            state.navShow = "profile";
            console.log("inside slice : ",action.payload);
            state.user_Data = action.payload;
            state.status=true;
        }
    }
})
export const {userData} = userSlice.actions;
export default userSlice.reducer;