import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Admin_Data : {},
    navShow:"home",
    status : false
};


const AdminSlice = createSlice({
    name:'AdminSlice',
    initialState,
    reducers:{
     AdminData : (state,action)=>{
            state.navShow = "profile";
            console.log("inside slice : ",action.payload);
            state.Admin_Data = action.payload;
            state.status=true;
        }
    }
})
export const {AdminData} = AdminSlice.actions;

export default AdminSlice.reducer;