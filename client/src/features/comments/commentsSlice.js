import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./CommentsService";


const commentSlice = createSlice({
    name :"comment",
    initialState :{
        comments : [],
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {},
         extraReducers : builder => {
                builder
                .addCase(getComments.pending, (state, action)=> {
                    state.isLoading = true
                    state.isSuccess = false
                    state.isError = false
                })
                .addCase(getComments.fulfilled, (state, action)=> {
                    state.isLoading = false
                    state.isSuccess = true
                    state.comments = action.payload
                    state.isError = false
                })
                .addCase(getComments.rejected, (state, action)=> {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.comments = action.payload
        
                })
                builder
                .addCase(addComments.pending, (state, action)=> {
                    state.isLoading = true
                    state.isSuccess = false
                    state.isError = false
                })
                .addCase(addComments.fulfilled, (state, action)=> {
                    state.isLoading = false
                    state.isSuccess = true
                    state.comments =[ action.payload ,...state.comments]
                    state.isError = false
                })
                .addCase(addComments.rejected, (state, action)=> {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                })
        
    }

});

// feath comments


export const getComments = createAsyncThunk("FEATH/COMMENTS",async(id, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;
    
    
    try {
        return await commentService.feathComments(token, id )
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }
})
 

// post comments


export const addComments = createAsyncThunk("ADD/COMMENTS",async(formData, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;
    
    
    try {
        return await commentService.createComments(formData, token)
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }
})





export default commentSlice.reducer