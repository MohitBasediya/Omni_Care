import {createSlice} from '@reduxjs/toolkit';

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
            console.log("user_Data in UserSlice-->",state.user_Data);
            state.status=true;
        }
    }
})
export const {userData} = userSlice.actions;
export default userSlice.reducer;