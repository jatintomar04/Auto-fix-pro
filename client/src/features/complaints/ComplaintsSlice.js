import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import complaintsService from "./complaintService";

const complaintSlice = createSlice({
    name : 'compalit',
    initialState:{
    allComplaints :[],
    singleComplaints :{},
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ""

    },
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getComplaints.pending , (state , action)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })

        builder.addCase(getComplaints.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.allComplaints = action.payload
        })
        builder.addCase(getComplaints.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.allComplaints = action.payload
        })
        builder.addCase(getComplaint.pending , (state , action)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })

        builder.addCase(getComplaint.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.singleComplaints = action.payload
        })
        builder.addCase(getComplaint.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.singleComplaints = action.payload
        })
        builder.addCase(closeComplaint.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.singleComplaints = action.payload
        })
        builder.addCase(closeComplaint.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.singleComplaints = action.payload
        })
      
            builder.addCase(getAllComplaints.pending , (state , action)=>{
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
    
            builder.addCase(getAllComplaints.fulfilled , (state , action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.allComplaints = action.payload
            })
            builder.addCase(getAllComplaints.rejected , (state , action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.allComplaints = action.payload
            })
    },
})


export default complaintSlice.reducer

// add complaint 
export const raiseComplaint = createAsyncThunk("RAISE/COMPLAINTS",async(formData, thunkAPI) => {
    console.log(formData)
    
    let token = thunkAPI.getState().auth.user.token;
    
    
    try {
        return await complaintsService.AddComplaint(formData, token)
        
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
})



// fatch all complaints 
 export const getComplaints = createAsyncThunk("FEATH/COMPLAINTS",async(_, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;
    
    
    try {
        return await complaintsService.fetchComplaints(token)
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }
})

    // fatch  complaint 
 export const getComplaint = createAsyncThunk("FEATH/COMPLAINT",async(id, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;    
    try {
        return await complaintsService.fetchComplaint(id , token)
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }



 })
   // update  complaint 
   export const closeComplaint = createAsyncThunk("UPDATE/COMPLAINT",async(id, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;    
    try {
       
        return await complaintsService.updateComplaint(id , token)
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }



 })

//  all users admin complaints 

 export const getAllComplaints = createAsyncThunk("FEATH/ALL_COMPLAINTS",async(_, thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token;
   
    
    try {
        return await complaintsService.fetchAllComplaint(token)
        
    } catch (error) {
        const message = error.ressponse.data.message;
        return thunkAPI.rejectWithValue(message)
    }
})

